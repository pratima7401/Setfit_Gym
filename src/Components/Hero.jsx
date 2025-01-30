import React, { useState } from 'react';
import { Button } from './ui/button';
import MemberRegistration from './MemberRegistration';
import img1 from "../assets/image14_11zon.jpg"; // Background image

function Hero() {
  const [showModal, setShowModal] = useState(false);

  const handleGetStartedClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "cover",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>

      <div className="relative z-10 flex justify-center items-center h-full text-center text-white px-8">
        {/* Left Side Content */}
        <div className="max-w-3xl">
          <span className="block mb-4 text-xs text-indigo-500 font-medium uppercase">
            Better every day
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            NOTHING IS OVER,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              UNTIL YOU STOP TRYING!
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-6">
            Join Set-Fit and start your fitness journey today!
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/3 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl font-bold text-purple-400 hover:text-purple-300"
            >
              X
            </button>
            <MemberRegistration />
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
