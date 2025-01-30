import React from 'react';
import { motion } from "framer-motion";
import cricket from '../assets/CricketT.jpg';
import trekk from '../assets/trekking.jpg';
import strength from '../assets/strength.jpg';
import reel from '../assets/reel.jpg';
import gallery1 from "../assets/equipment_11zon.jpg";
import gallery2 from "../assets/image3_11zon.jpg";
import gallery3 from "../assets/image4_11zon.jpg";
import gallery4 from "../assets/image12_11zon.jpg";
import gallery5 from "../assets/image13_11zon.jpg";
import gallery6 from "../assets/image14_11zon.jpg";
import gallery7 from "../assets/image16_11zon.jpg";
import gallery8 from "../assets/image19_11zon.jpg";
import gallery9 from "../assets/image21_11zon.jpg";
import gallery10 from "../assets/image6_11zon.jpg";

function OurSpeciality() {

  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery10];

  const events = [
    {
      id: 1,
      title: 'Cricket Tournament',
      description:
        'Join our exciting cricket tournament and compete against teams from around the city!',
      image: cricket,
    },
    {
      id: 2,
      title: 'Trekking Adventure',
      description:
        'Embark on a thrilling trekking journey through beautiful mountains and scenic trails.',
      image: trekk,
    },
    {
      id: 3,
      title: 'Reel Making Competition',
      description:
        'Showcase your creativity by participating in our reel-making competition!',
      image: reel,
    },
    {
      id: 4,
      title: 'Strength Challenge',
      description:
        'Compete in our strength challenge and win exciting prizes!',
      image: strength,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-purple-500 mb-8">
        Special Groove
      </h2>
      <p className="text-center text-gray-300 mb-12">
        Discover the special events and activities that make our gym unique! Be
        part of the excitement and stay motivated with our exclusive programs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="bg-gray-800 rounded-lg shadow-lg p-6 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <motion.img
              src={event.image}
              alt={event.title}
              className="rounded-lg mb-4 w-full h-48 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: "easeInOut",
              }}
            />
            <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-400 mb-4">{event.description}</p>
            {/* {event.video && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              >
                <iframe
                  className="w-full h-48 rounded-lg"
                  src={event.video}
                  title={event.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            )} */}
            {/* <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
              Learn More
            </button> */}

          </motion.div>
        ))}
      </div>
      <div>
      <motion.div
        className="container mx-auto py-8"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-center text-3xl font-semibold text-gray-200 mb-8">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
}

export default OurSpeciality;
