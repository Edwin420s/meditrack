// client/src/context/AuthContext.jsx

import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import api from '../services/api';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

// Helper: Validate JWT expiry
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwt.decode(token);
    return decoded?.exp > Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

export const AuthProvider = ({ children, persist = true }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set token into localStorage and Axios headers
  const setToken = useCallback((token) => {
    if (persist) {
      localStorage.setItem('token', token);
    }
    api.defaults.headers.common['x-auth-token'] = token;
  }, [persist]);

  // Remove token from storage and headers
  const removeToken = useCallback(() => {
    if (persist) {
      localStorage.removeItem('token');
    }
    delete api.defaults.headers.common['x-auth-token'];
  }, [persist]);

  // Load user if token exists and is valid
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
      console.error('❌ Failed to load user:', err);
      removeToken();
    } finally {
      setLoading(false);
    }
  }, [setToken, removeToken]);

  // Check token expiry every 60s and logout if expired
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token');
      if (token && !isTokenValid(token)) {
        logout();
      }
    };
    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [removeToken]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Login
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
      console.error('🔐 Login failed:', err);
      removeToken();
      throw err.response?.data?.message || 'Login failed';
    }
  };

  // Register
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
      console.error('📝 Registration failed:', err);
      removeToken();
      throw err.response?.data?.message || 'Registration failed';
    }
  };

  // Logout
  const logout = () => {
    removeToken();
    setUser(null);
  };

  // Refresh user (e.g. after an update)
  const refreshUser = async () => {
    try {
      const res = await api.get('/api/auth/user');
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error('🔁 Failed to refresh user:', err);
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

// Hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
