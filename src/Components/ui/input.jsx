import React from 'react';

export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full p-2 rounded border border-gray-600 bg-gray-700 text-white ${className}`}
      {...props}
    />
  );
}

