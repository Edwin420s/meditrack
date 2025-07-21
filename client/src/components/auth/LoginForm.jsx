// client/src/components/auth/LoginForm.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import '../../styles/AuthForms.css'; // Make sure this path is correct

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });

    // TODO: Replace with actual login logic
    // Example: await loginUser(email, password)
    // On success:
    // navigate('/dashboard');
  };

  return (
    <div className="auth-form-container">
      <div className="logo-header">
        <h1>MediTrack</h1>
        <div className="auth-switch">
          <span>Login</span>
          <Link to="/register">Register</Link>
        </div>
      </div>

      <h2>Login to your account</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <Button type="submit" className="auth-button">
          Login
        </Button>
      </form>

      <p className="auth-link-text">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
