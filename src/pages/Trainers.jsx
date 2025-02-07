import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

import Female1 from "../assets/fe_trainer1.jpg";
import Female2 from "../assets/fe_trainer2.jpg";
import male1 from "../assets/m_trainer1.jpg";
import male2 from "../assets/m_trainer2.jpg";
import male3 from "../assets/m_trainer3.jpg";

const trainers = [
  {
    name: "John Doe",
    image: male1,
    specialty: "Strength Training",
    experience: "4 years",
    certifications: [
      "NASM Certified Personal Trainer",
      "CrossFit Level 2 Trainer",
    ],
  },
  {
    name: "Jane Smith",
    image: male2,
    specialty: "Cardio and HIIT",
    experience: "3 years",
    certifications: [
      "ACE Certified Personal Trainer",
      "TRX Suspension Training Certified",
    ],
  },
  {
    name: "Mike Johnson",
    image: male3,
    specialty: "Strength Training",
    experience: "4 years",
    certifications: [
      "ACE Certified Personal Trainer",
      "TRX Suspension Training Certified",
    ],
  },
  {
    name: "Emily Brown",
    image: Female1,
    specialty: "Zumba Trainer",
    experience: "2 years",
    certifications: [
      "Precision Nutrition Level 2 Certified",
      "NASM Weight Loss Specialist",
    ],
  },
  {
    name: "Sarah Wilson",
    image: Female2,
    specialty: "Yoga and Flexibility",
    experience: "5 years",
    certifications: [
      "RYT 200 Certified Yoga Instructor",
      "NASM Certified Personal Trainer",
    ],
  },
];

function TrainerModal({ trainer, onClose }) {
  const modalRef = useRef(null);

  // Close the modal when clicking outside of it
  const closeModal = (e) => {
    if (!modalRef.current || modalRef.current.contains(e.target)) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={closeModal}
    >
      <div
        ref={modalRef}
        className="bg-gray-900 rounded-lg max-w-lg w-full p-6 relative shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-48 h-48 object-cover rounded-full border-4 border-purple-500"
          />
          <h2 className="text-3xl font-bold text-white mt-4">{trainer.name}</h2>
          <p className="text-purple-400 font-semibold mt-1">
            {trainer.specialty}
          </p>
          <p className="text-gray-300 mt-2">{trainer.experience} of experience</p>

          <h3 className="text-xl font-semibold text-white mt-4">
            Certifications:
          </h3>
          <ul className="list-disc list-inside text-gray-400 mt-2">
            {trainer.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    if (selectedTrainer) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedTrainer]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Our Trainers
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {trainers.map((trainer, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => setSelectedTrainer(trainer)}
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-white">{trainer.name}</h2>
              <p className="text-purple-400 font-semibold">{trainer.specialty}</p>
              <p className="text-gray-300 mt-1">{trainer.experience} of experience</p>
            </div>
          </div>
        ))}
      </div>

      {selectedTrainer && (
        <TrainerModal trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />
      )}
    </div>
  );
}

export default Trainers;
