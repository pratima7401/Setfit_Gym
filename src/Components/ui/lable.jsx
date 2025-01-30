import React from 'react';

export function Label({ children, className, ...props }) {
  return (
    <label
      className={`block mb-2 text-sm font-medium text-gray-300 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

