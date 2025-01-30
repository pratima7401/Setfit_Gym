import React from 'react';
import Header from './Header';
import Footer from './Footer';

// Layout component to provide consistent structure across pages
function Layout({ children }) {
  return (
    // Main container with dark theme
    <div className="flex flex-col min-h-screen bg-black-900 text-white">
      {/* Header component for navigation */}
      <Header />
      {/* Main content area */}
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default Layout;

