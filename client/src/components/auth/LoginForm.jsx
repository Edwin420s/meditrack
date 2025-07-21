import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import '../../styles/AuthForms.css'; // Ensure this path is correct

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });

    // TODO: Replace with actual login logic
    // Example: await loginUser(email, password)
    // On success: navigate('/dashboard');
  };

  return (
    <div className="auth-form-container bg-background text-text-primary shadow-md rounded-lg p-6 max-w-md mx-auto">
      <div className="logo-header text-center mb-4">
        <h1 className="text-3xl font-bold text-primary-dark">MediTrack</h1>
        <div className="auth-switch text-sm mt-1 text-text-secondary">
          <span className="mr-1">Login</span> |{' '}
          <Link to="/register" className="ml-1 text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center mb-6 text-primary-dark">
        Login to your account
      </h2>

      <form onSubmit={handleSubmit} className="auth-form space-y-4">
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

        <div className="form-group">
          <label htmlFor="password" className="block text-sm font-medium text-primary-dark mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <Button type="submit" className="auth-button w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-md">
          Login
        </Button>
      </form>

      <p className="auth-link-text text-center text-sm mt-4 text-text-secondary">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
