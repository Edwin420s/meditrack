import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        axios.defaults.headers.common['x-auth-token'] = token;
        const res = await axios.get('/api/auth/user');
        setUser(res.data);
      } catch (err) {
        console.error('[AuthContext] Failed to load user:', err);
        localStorage.removeItem('token');
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      setUser(res.data.user);
      navigate(res.data.user.role === 'doctor' ? '/doctor' : '/');
    } catch (err) {
      console.error('[AuthContext] Login failed:', err);
      throw err;
    }
  };

  const register = async (name, email, password, role, phone) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, role, phone });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      setUser(res.data.user);
      navigate(res.data.user.role === 'doctor' ? '/doctor' : '/');
    } catch (err) {
      console.error('[AuthContext] Registration failed:', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access to context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
