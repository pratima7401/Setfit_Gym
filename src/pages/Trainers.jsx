import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

function TrainerModal({ trainer, onClose }) {
  const modalRef = useRef(null);

  // Close modal when clicking outside
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
            src={`http://localhost/gym_api/uploads/${trainer.image}`}
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
            {trainer.certifications.split(",").map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // Fetch trainers from API
  useEffect(() => {
    fetch("http://localhost/gym_api/trainers.php?action=get")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTrainers(data.trainers);
        }
      })
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

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
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => setSelectedTrainer(trainer)}
          >
            <img
              src={`http://localhost/gym_api/uploads/${trainer.image}`}
              alt={trainer.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-purple-400">{trainer.name}</h2>
              <p className="text-white font-semibold">{trainer.specialty}</p>
              <p className="text-white font-semibold">{trainer.certifications}</p>
              <p className="text-gray-300 mt-1">{trainer.experience} years of experience</p>
            </div>
          </div>
        ))}
      </div>

      {selectedTrainer && (
        <TrainerModal
          trainer={selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
        />
      )}
    </div>
  );
}

export default Trainers;
