import React, { useState } from "react"; // Import React and useState hook
import { Button } from "./ui/button"; // Import Button component
import MemberRegistration from "./MemberRegistration";

// Import background video
import gymVideo from "../assets/HeroVideo.mp4"; // Add a high-quality gym video

const Hero = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  return (
    <section className="relative w-full h-[90vh] flex flex-col items-center justify-center overflow-hidden text-white">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={gymVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 py-12">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 text-shadow">
          NOTHING IS OVER{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
            UNTIL YOU STOP TRYING
          </span>
        </h1>
        <p className="text-sm md:text-lg lg:text-2xl text-slate-200 mb-6">
          Turn Your Fat into Fit
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-teal-500 to-purple-600 hover:bg-gradient-to-l text-white font-bold py-3 px-6 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
          onClick={() => setShowModal(true)} // Open modal on button click
        >
          Join Now
        </Button>
      </div>

      {/* Modal for Registration */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/3 relative">
            <button
              onClick={() => setShowModal(false)} // Close modal on button click
              className="absolute top-2 right-2 text-2xl font-bold text-purple-400 hover:text-purple-300"
            >
              X
            </button>
            <MemberRegistration /> {/* Registration form component */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
