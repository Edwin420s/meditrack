// client/src/components/ui/Input.jsx

import React from 'react';

const Input = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
      {...props}
    />
  );
};

export default Input;
