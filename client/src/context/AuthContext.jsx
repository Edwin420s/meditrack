import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api'; // axios instance with baseURL

const AuthContext = createContext();

// ✅ Check if the token is valid
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
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

  // ✅ Set token in storage and axios headers
  const setToken = useCallback(
    (token) => {
      if (persist) {
        localStorage.setItem('token', token);
      }
      api.defaults.headers.common['x-auth-token'] = token;
    },
    [persist]
  );

  // ✅ Remove token from storage and axios headers
  const removeToken = useCallback(() => {
    if (persist) {
      localStorage.removeItem('token');
    }
    delete api.defaults.headers.common['x-auth-token'];
  }, [persist]);

  // ✅ Logout function
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

  // ✅ Load user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // ✅ Auto logout if token expires
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token && !isTokenValid(token)) {
        logout();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [logout]);

  // ✅ Register function
  const register = async (formData) => {
    try {
      setError(null);
      const res = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.token) {
        setToken(res.data.token);
        setUser(res.data.user);

        const role = res.data.user?.role;
        if (role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }

        return res.data;
      }

      throw new Error(res.data.message || 'Registration failed');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMsg);
      removeToken();
      throw new Error(errorMsg);
    }
  };

  // ✅ Login function
  const login = async (formData) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', formData);

      if (res.data.success && res.data.token) {
        setToken(res.data.token);
        setUser(res.data.user);

        const role = res.data.user?.role;
        if (role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }

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

  // ✅ Refresh user manually
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

// ✅ Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
