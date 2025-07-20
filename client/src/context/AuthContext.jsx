import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

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
        api.defaults.headers.common['x-auth-token'] = token;
        const res = await api.get('/auth/user');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to load user:', err);
        localStorage.removeItem('token');
        delete api.defaults.headers.common['x-auth-token'];
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['x-auth-token'] = token;
      setUser(user);

      navigate(user.role === 'doctor' ? '/doctor' : '/');
      return user;
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      throw err;
    }
  };

  const register = async (name, email, password, role, phone) => {
    try {
      const res = await api.post('/auth/register', { name, email, password, role, phone });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['x-auth-token'] = token;
      setUser(user);

      navigate(user.role === 'doctor' ? '/doctor' : '/');
      return user;
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['x-auth-token'];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
