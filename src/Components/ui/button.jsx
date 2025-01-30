
import React from 'react';
export function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 py-2 rounded font-semibold text-white transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

