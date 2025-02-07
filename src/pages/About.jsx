import React from 'react';
import { useNavigate } from "react-router-dom";
import facilities from "../assets/facilities.jpg";
import { Button } from "../Components/ui/button";
import { motion } from "framer-motion"; // Import Framer Motion

function About() {
  const navigate = useNavigate(); // Initialize navigate

  // Function to navigate to Trainers page
  const handleExploreTrainers = () => {
    navigate("/trainers"); // Navigate to the Trainers page
  };

  return (
    <motion.section
      className="text-gray-600 body-font"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto flex px-5 py-16 md:flex-row flex-col items-center">
        {/* Content Section */}
        <motion.div
          className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-10 md:mb-0 items-center text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="title-font sm:text-4xl text-4xl mb-5 font-medium text-purple-600">
            About Us
            <br className="lg:inline-block" />
            <span className="lg:inline-block sm:text-xl text-gray-300 ">
              Elevate Your Fitness Journey
            </span>
          </h2>
          <p className="mb-8 leading-relaxed text-gray-300">
            SET-FIT has been a leading name in fitness, committed to providing
            the highest standard of fitness and wellness services. With a team
            of certified trainers specializing in functional training, cardio,
            and yoga, we ensure personalized guidance for every member.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded animate-bounce mt-4"
              onClick={handleExploreTrainers}
            >
              Explore our Trainers
            </Button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            className="object-cover object-center rounded"
            alt="Gym facilities"
            src={facilities}
          />
        </motion.div>
      </div>

      {/* Photo Gallery Section */}
      
    </motion.section>
  );
}

export default About;