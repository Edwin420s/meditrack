// client/src/context/AuthContext.jsx
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode'; // ✅ FIXED: use named import

const AuthContext = createContext();

// ✅ Utility: Check if token is valid
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token); // ✅ FIXED: use jwtDecode here
    return decoded?.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children, persist = true }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Set token in localStorage and Axios
  const setToken = useCallback(
    (token) => {
      if (persist) {
        localStorage.setItem('token', token);
      }
      api.defaults.headers.common['x-auth-token'] = token;
    },
    [persist]
  );

  // ✅ Remove token from storage and Axios
  const removeToken = useCallback(() => {
    if (persist) {
      localStorage.removeItem('token');
    }
    delete api.defaults.headers.common['x-auth-token'];
  }, [persist]);

  // ✅ Logout
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    navigate('/login');
  }, [removeToken, navigate]);

  // ✅ Load user if token is valid
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || !isTokenValid(token)) {
      setLoading(false);
      return;
    }

    try {
      setToken(token);
      const res = await api.get('/auth/user');
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        removeToken();
      }
    } catch (err) {
      console.error('❌ Failed to load user:', err);
      removeToken();
    } finally {
      setLoading(false);
    }
  }, [setToken, removeToken]);

  // ⏳ Load on component mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // 🔄 Auto logout on token expiry every 60s
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token && !isTokenValid(token)) {
        logout();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [logout]);

  // ✅ Register
  const register = async (formData) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        navigate('/dashboard');
      }

      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setError(errorMsg);
      console.error('Registration error:', err.response?.data || err.message);
      removeToken();
      throw new Error(errorMsg);
    }
  };

  // ✅ Login
  const login = async (formData) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', formData);

      if (res.data.success && res.data.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        navigate('/dashboard');
        return res.data;
      }

      throw new Error(res.data.message || 'Login failed');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMsg);
      removeToken();
      throw new Error(errorMsg);
    }
  };

  // 🔁 Manual user refresh
  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/user');
      if (res.data.success) {
        setUser(res.data.user);
        return res.data.user;
      }
      throw new Error(res.data.message || 'Failed to refresh user');
    } catch (err) {
      console.error('🔁 Failed to refresh user:', err);
      logout();
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
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

// ✅ Custom hook for consuming context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
