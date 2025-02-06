import React from 'react';
import { motion } from "framer-motion";
import YogaImage from "../assets/yoga.jpg";
import ZumbaImage from "../assets/zumba.jpg";
import FunctionalImage from "../assets/functional.jpg";
import BollywoodImage from "../assets/bollywood.jpg";
import CardioImage from "../assets/cardio.jpg";
import ABS from "../assets/ABS.jpg";
import { useState } from "react";

const classes = [
  {
    name: "Yoga",
    description: "Improves flexibility, strength, and mental well-being.",
    image: YogaImage,
    day: "Monday",
    time: "6:00 AM - 7:00 AM",
  },
  {
    name: "Zumba",
    description: "A fun way to burn calories and improve cardiovascular health.",
    image: ZumbaImage,
    day: "Tuesday",
    time: "6:00 PM - 7:00 PM",
  },
  {
    name: "Bollywood Dance",
    description: "Boosts endurance and burns calories through dance.",
    image: BollywoodImage,
    day: "Wednesday",
    time: "7:00 PM - 8:00 PM",
  },
  {
    name: "Functional Training",
    description: "Builds strength, coordination, and relieves stress.",
    image: FunctionalImage,
    day: "Thursday",
    time: "6:30 PM - 7:30 PM",
  },
  {
    name: "Cardio",
    description: "Combines strength and conditioning for overall fitness.",
    image: CardioImage,
    day: "Friday",
    time: "8:00 AM - 9:00 AM",
  },
  {
    name: "ABS",
    description: "Core-focused exercises for improved strength and posture.",
    image: ABS,
    day: "Daily",
    time: "8:00 AM - 9:00 AM",
  },
];

function ClassCard({ cls, openModal }) {
  return (
    <motion.div
      className="bg-gray-900 shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg overflow-hidden cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onClick={() => openModal(cls)}
    >
      {/* Image Section */}
      <div className="relative h-60">
        <img
          src={cls.image}
          alt={cls.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        {/* <p className="absolute bottom-2 left-2 bg-purple-600 text-white text-sm px-2 py-1 rounded">
          {cls.name}
        </p> */}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="text-xl font-bold text-purple-400">{cls.name}</p>
        <p className="text-gray-300 text-sm mt-2">{cls.description}</p>
        <div className="mt-4 text-gray-400 text-sm">
          <p>
            <span className="font-bold text-purple-300">Day:</span> {cls.day}
          </p>
          <p>
            <span className="font-bold text-purple-300">Time:</span> {cls.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Classes() {
  const [selectedClass, setSelectedClass] = useState(null);

  const openModal = (cls) => {
    setSelectedClass(cls);
  };

  const closeModal = () => {
    setSelectedClass(null);
  };

  return (
    <section className="container py-12 px-12 bg-gray-800 max-w-10xl bg-gradient-to-r from-teal-800 to-purple-600">
      <div className="container mx-auto px-8 py-8 max-w-5xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-50">
          Rhythm & Flow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {classes.map((cls, index) => (
            <ClassCard key={index} cls={cls} openModal={openModal} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-gray-200 rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={closeModal}
            >
              ✖
            </button>
            <img
              src={selectedClass.image}
              alt={selectedClass.name}
              className="w-full h-45 object-cover rounded"
            />
            <h3 className="text-2xl font-bold mt-4">{selectedClass.name}</h3>
            <p className="text-gray-400 mt-2">{selectedClass.description}</p>
            <div className="mt-4">
              <p>
                <span className="font-bold text-purple-300">Day:</span>{" "}
                {selectedClass.day}
              </p>
              <p>
                <span className="font-bold text-purple-300">Time:</span>{" "}
                {selectedClass.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>

  );
}

export default Classes;
