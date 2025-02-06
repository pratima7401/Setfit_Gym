import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Monthly Plan",
    premiumLabel: "✨ Starter",
    price: "₹1800",
    duration: "1 Month",
    features: ["Access to gym equipment", "Locker room access", "Free weights area"],
  },
  {
    name: "Quarterly Plan",
    premiumLabel: "🏆 Silver",
    price: "₹3800",
    duration: "3 Months",
    features: ["All Monthly features", "Group fitness classes"],
  },
  {
    name: "Termly Plan",
    premiumLabel: "🥉 Bronze",
    price: "₹5500",
    duration: "6 Months",
    features: ["All Quarterly features", "Personal trainer (2 sessions/month)"],
  },
  {
    name: "Annual Plan",
    premiumLabel: "👑 Golden",
    price: "₹8000",
    duration: "12 Months",
    features: ["All Termly features", "Unlimited personal training", "Nutrition consultation"],
  },
];

function MembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const phoneNumber = "+919130192067"; // Replace with your actual contact number

  const handlePlanClick = (index) => {
    setSelectedPlan(index);
    setShowModal(true);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber.replace("+", "")}`, "_blank");
    setShowModal(false);
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
    setShowModal(false);
  };

  return (
    <section className="container py-16 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-extrabold mb-12 text-center text-white animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Explore Membership Plans
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-[#1a202c] w-80 rounded-lg p-6 cursor-pointer hover:shadow-xl flex flex-col justify-between"
            >
              {selectedPlan === index && (
                <motion.div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-black text-lg font-bold py-1 px-3 rounded-full shadow-md animate-bounce"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {plan.premiumLabel}
                </motion.div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-4xl font-bold mb-4 text-white">
                  {plan.price} <span className="text-sm text-gray-200">/{plan.duration}</span>
                </p>
              </div>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2 flex items-center text-white">
                    <Check className="h-5 w-5 text-green-300 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => handlePlanClick(index)}
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center w-96"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-4 text-gray-700">Choose how you'd like to get in touch:</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleWhatsAppClick}
                aria-label="Contact via WhatsApp"
              >
                WhatsApp
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCallClick}
                aria-label="Call now"
              >
                Call Now
              </button>
            </div>
            <button
              className="mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default MembershipPlans;
