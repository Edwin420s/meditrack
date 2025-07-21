import React from 'react';

export default function Badge({ children, status }) {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    served: 'bg-green-100 text-green-800',
    default: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      statusClasses[status] || statusClasses.default
    }`}>
      {children}
    </span>
  );
}