import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwt.decode(token);
    return decoded?.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children, persist = true }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setToken = useCallback((token) => {
    if (persist) {
      localStorage.setItem('token', token);
    }
    api.defaults.headers.common['x-auth-token'] = token;
  }, [persist]);

  const removeToken = useCallback(() => {
    if (persist) {
      localStorage.removeItem('token');
    }
    delete api.defaults.headers.common['x-auth-token'];
  }, [persist]);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || !isTokenValid(token)) {
      setLoading(false);
      return;
    }

    try {
      setToken(token);
      const res = await api.get('/api/auth/user');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load user:', err);
      removeToken();
    } finally {
      setLoading(false);
    }
  }, [setToken, removeToken]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token');
      if (token && !isTokenValid(token)) {
        logout();
      }
    };

    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      if (res.data?.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data.user;
      }
      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Login error:', err);
      removeToken();
      throw err.response?.data?.message || 'Login failed';
    }
  };

  const register = async (name, email, password, role, phone) => {
    try {
      const res = await api.post('/api/auth/register', {
        name,
        email,
        password,
        role,
        phone,
      });
      if (res.data?.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data.user;
      }
      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Registration error:', err);
      removeToken();
      throw err.response?.data?.message || 'Registration failed';
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/api/auth/user');
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error('Failed to refresh user:', err);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
