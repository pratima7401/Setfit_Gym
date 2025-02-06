import React from 'react';
import {useState} from 'react';
import { X } from 'lucide-react';

import Female1 from '../assets/fe_trainer1.jpg';
import Female2 from '../assets/fe_trainer2.jpg';
import male1 from '../assets/m_trainer1.jpg';
import male2 from '../assets/m_trainer2.jpg';
import male3 from '../assets/m_trainer3.jpg';



const trainers = [
  {
    name: 'John Doe',
    image: male1,
    specialty: 'Strength Training',
    experience: '4 years',
    certifications: ['NASM Certified Personal Trainer', 'CrossFit Level 2 Trainer']
  },
  {
    name: 'Jane Smith',
    image: male2,
    specialty: 'Cardio and HIIT',
    experience: '3 years',
    certifications: ['ACE Certified Personal Trainer', 'TRX Suspension Training Certified']
  },
  {
    name: 'Mike Johnson',
    image: male3,
    specialty: 'Strength Training',
    experience: '4 years',
    certifications: ['ACE Certified Personal Trainer', 'TRX Suspension Training Certified']
  },
  {
    name: 'Emily Brown',
    image: Female1,
    specialty: 'Zumba Trainer',
    experience: '2 years',
    certifications: ['Precision Nutrition Level 2 Certified', 'NASM Weight Loss Specialist']
  },
  {
    name: 'Sarah Wilson',
    image: Female2,
    specialty: 'Yoga and Flexibility',
    experience: '5 years',
    certifications: ['RYT 200 Certified Yoga Instructor', 'NASM Certified Personal Trainer']
  }
  
];

function TrainerModal({ trainer, onClose }) {
  return (
    <div className="container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row">
          <img src={trainer.image} alt={trainer.name} className="w-full md:w-1/3 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
          <div>
            <h2 className="text-3xl font-bold mb-2">{trainer.name}</h2>
            <p className="text-purple-500 font-semibold mb-2">{trainer.specialty}</p>
            <p className="text-gray-400 mb-4">{trainer.experience} of experience</p>
            <h3 className="text-xl font-semibold mb-2">Certifications:</h3>
            <ul className="list-disc list-inside text-gray-400 mb-4">

              {trainer.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul> 
          </div>
        </div>
      </div>
    </div>
  );
}

function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const openModal = (trainer) => {
    setSelectedTrainer(trainer);
  };

  const closeModal = () => {
    setSelectedTrainer(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Trainers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {trainers.map((trainer, index) => (
          <div 
            key={index} 
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => openModal(trainer)}
          >
            <img src={trainer.image} alt={trainer.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{trainer.name}</h2>
              <p className="text-purple-500 font-semibold mb-2">{trainer.specialty}</p>
              <p className="text-gray-400">{trainer.experience} of experience</p>
              <p className="text-gray-400">{trainer.certifications}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedTrainer && (
        <TrainerModal trainer={selectedTrainer} onClose={closeModal} />
      )}
    </div>
  );
}

export default Trainers;
