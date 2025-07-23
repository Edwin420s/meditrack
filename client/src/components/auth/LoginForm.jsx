// client/src/components/auth/LoginForm.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import '../../styles/AuthForms.css'; // Make sure this path is correct

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with real authentication logic
    console.log('Login submitted:', { email, password });

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      // navigate('/dashboard'); // Uncomment this when dashboard route is ready
    }, 1500);
  };

  return (
    <div className="auth-form-container bg-background text-text-primary shadow-md rounded-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="logo-header text-center mb-4">
        <h1 className="text-3xl font-bold text-primary-dark">MediTrack</h1>
        <div className="auth-switch text-sm mt-1 text-text-secondary">
          <span className="mr-1">Login</span> |{' '}
          <Link to="/register" className="ml-1 text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>

      {/* Subheading */}
      <h2 className="text-xl font-semibold text-center mb-6 text-primary-dark">
        Login to your account
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="auth-form space-y-4">
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-primary-dark mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field with Toggle */}
        <div className="form-group relative">
          <label htmlFor="password" className="block text-sm font-medium text-primary-dark mb-1">
            Password
          </label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="auth-button w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      {/* Footer Signup Link */}
      <p className="auth-link-text text-center text-sm mt-4 text-text-secondary">
        Don’t have an account?{' '}
        <Link to="/register" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
