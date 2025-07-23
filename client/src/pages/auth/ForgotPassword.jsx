// client/src/pages/auth/ForgotPassword.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '../../components/ui';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    console.log('Password reset requested for:', email);
    setMessage(`If an account exists for ${email}, you will receive a password reset link.`);
  };

  return (
    <div className="max-w-md w-full mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-center text-[#0e1b0e] mb-6">
        Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#0e1b0e] mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>

        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-[#61e961] text-[#0e1b0e] hover:bg-[#50d150] transition-colors"
        >
          Send Reset Link
        </Button>

        <p className="text-center text-sm text-[#509550] pt-2">
          Remember your password?{' '}
          <Link to="/login" className="underline hover:text-[#2d7a2d]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
