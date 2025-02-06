import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className=" container bg-gray-800 py-5"> {/* Reduced padding to make height smaller */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">About SET-FIT</h3>
            <p className="text-gray-400">
              SET-FIT is your ultimate fitness destination, offering state-of-the-art equipment and expert guidance to help you achieve your fitness goals.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/classes" className="text-gray-400 hover:text-purple-400 transition-colors">Classes</Link></li>
              <li><Link to="/plans" className="text-gray-400 hover:text-purple-400 transition-colors">Membership Plans</Link></li>
              <li><Link to="/trainers" className="text-gray-400 hover:text-purple-400 transition-colors">Trainers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-6 w-8 mr-2" />
                Shahu Colony Lane Number 3A, near Cummins College Road,Karve Nagar, Pune 411038
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                info@setfit.com
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                +91 9130192067
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/setfithealth_club?igsh=MXBuYnByd2VvOHBsNg==" className="text-gray-400 hover:text-pink-400 transition-colors" target='_blank'>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-gray-700 text-center text-gray-400"> {/* Adjusted spacing to match reduced height */}
          <p>&copy; {new Date().getFullYear()} SET-FIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
