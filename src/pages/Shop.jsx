import React from 'react';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import supp1 from '../assets/supp1.jpg';
import supp2 from '../assets/supp2.jpg';
import supp3 from '../assets/supp3.jpg';
import supp4 from '../assets/supp4.jpg';
import supp5 from '../assets/supp5.jpg';

const products = [
  { id: 1, name: 'Pre-Workout Formula1', price: 785, image: supp1, description: 'Boosts energy and endurance for workouts.' },
  { id: 2, name: 'Whey Protein Isolate', price: 1500, image: supp2, description: 'Premium whey protein isolate, 5lbs, 30g protein per serving.' },
  { id: 3, name: 'Resistance Bands Set', price: 550, image: supp3, description: 'Set of 5 resistance bands with different tension levels.' },
  { id: 4, name: 'Pre-Workout Formula', price: 260, image: supp4, description: 'High-performance pre-workout supplement, 30 servings.' },
  { id: 5, name: 'Pre-Workout Formula', price: 399, image: supp5, description: 'High-performance pre-workout supplement, 30 servings.' },
];

function Shop() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    const message = encodeURIComponent(`Hello, I'm interested in purchasing ${product.name} for ₹${product.price.toLocaleString('en-IN')}.`);
    window.open(`https://wa.me/9130192067?text=${message}`, '_blank');
  };

  return (
    <div className=" container bg-gray-900 min-h-screen">
      <div className="sticky top-0 z-40 bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white">Supplements Shop</h1>
            {/* <div className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full px-2 py-1 text-xs">{cartItems.length}</span>
            </div> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <span className="text-purple-500 font-bold">₹{product.price.toLocaleString('en-IN')}</span>

                </div>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
