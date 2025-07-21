// client/src/components/ui/Input.jsx

import React from 'react';
import './Input.css'; // Ensure your styles define .form-input appropriately

const Input = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;
