import React from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import TransformationImage1 from '../assets/Trans1.jpg';
import TransformationImage2 from '../assets/Trans2.jpg';
import TransformationImage3 from '../assets/Trans3.jpg';
import '../styles/TransformationPlans.css';

const TransformationPlan = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const phoneNumber = '+919876543210'; // Replace with actual phone number

  const plans = [
    {
      name: 'Basic Plan',
      premiumLabel: '✨ Starter',
      price: '₹3,999/month',
      duration: '30 Days',
      features: [
        'All Advanced features',
        'Personal trainer sessions',
        'Nutrition guidance',
      ],
      image: TransformationImage1,
    },
    {
      name: 'Advanced Plan',
      premiumLabel: '🏆 Advanced',
      price: '₹5,999/month',
      duration: '60 Days',
      features: [
        'All Advanced features',
        'Personal trainer sessions',
        'Nutrition guidance',
      ],
      image: TransformationImage2,
    },
    {
      name: 'Elite Plan',
      premiumLabel: '👑 Elite',
      price: '₹8,999/month',
      duration: '90 Days',
      features: [
        'All Advanced features',
        'Personal trainer sessions',
        'Nutrition guidance',
      ],
      image: TransformationImage3,
    },
  ];

  const handlePlanClick = (index) => {
    setSelectedPlan(index);
    setShowModal(true);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${9130192067}`, '_blank');
    setShowModal(false);
  };

  const handleCallClick = () => {
    window.location.href = `tel:${9130192067}`;
    setShowModal(false);
  };

  return (
    <section className="transformation-plan-container bg-purple-900 py-12 px-6 text-white min-h-screen">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-white">
        Explore Transformation Plans
      </h2>
      <div className="plan-list flex flex-wrap justify-center gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`plan-card rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 ${
              activeIndex === index ? 'scale-105 bg-purple-700' : 'bg-purple-800'
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            {/* Plan Image */}
            <img src={plan.image} alt={plan.name} className="plan-image w-full h-80 object-cover" />

            {/* Plan Content */}
            <div className="plan-content bg-gray-800 p-6 flex flex-col justify-between">
              {/* Plan Info */}
              <div className="plan-info mb-4">
                <h3 className="plan-name text-2xl font-semibold mb-2 text-purple-100">{plan.name}</h3>
                <p className="plan-price text-xl font-bold text-purple-600">
                  {plan.price}{' '}
                  <span className="plan-duration text-sm font-normal text-white">/{plan.duration}</span>
                </p>
                <ul className="plan-features mt-4 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="plan-feature flex items-center text-gray-400">
                      <Check className="plan-feature-icon w-5 h-5 mr-2 text-purple-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Choose Plan Button */}
              <Button
                className="plan-button mt-4 text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
                onClick={() => handlePlanClick(index)}
              >
                Choose Plan
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for WhatsApp & Call Options */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center w-96"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-4 text-gray-700">Choose how you'd like to get in touch:</p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleWhatsAppClick}
              >
                WhatsApp
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCallClick}
              >
                Call Now
              </Button>
            </div>
            <Button
              className="mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default TransformationPlan;
