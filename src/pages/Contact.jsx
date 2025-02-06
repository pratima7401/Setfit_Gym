import React from 'react';

// Form Component
const ContactForm = () => (
  <div className="container w-1/2 bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-4xl font-bold mb-8 text-center text-black">
  Enquiry Here
</h1>
    <form>
      <input
        type="text"
        placeholder="Enter your full name"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black"
        required
      />
      <input
        type="email"
        placeholder="Enter your email address"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black"
        required
      />
      <input
        type="tel"
        placeholder="Enter your phone number"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black"
        required
      />
      <textarea
        placeholder="Enter your message"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black"
        rows="4"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
      >
        Send Message
      </button>
    </form>
  </div>
);

// Contact Details Component
const ContactDetails = () => (
  <div className="container w-1/2 p-6 bg-gray-200">
   <h1 className="text-4xl font-bold mb-8 text-center text-black">
  Contact Us 
</h1>

    <div className="text-lg text-gray-600">
      <p className="mb-4">
        <strong>Operating Hours:</strong> <br />
        Monday to Saturday: 6:00am to 10:00pm <br />
        Peak Hours: 7:00am to 09:00pm & 6:00pm to 8:00pm <br />
        Sunday: Holiday
      </p>
      <p className="mb-4">
        <strong>Address:</strong> <br />
        Shahu Colony Lane Number 3A, near Cummins College Road, above Vidya Girls
        PG, Karve Nagar, Pune 411038
      </p>
      <p className="mb-4">
        <strong>Telephone:</strong> <br />
        +91 9130192067
      </p>
      <p className="mb-4">
        <strong>Location:</strong> <br />
        <a
          href="https://www.google.com/maps/place/SET-FIT+HEALTH+CLUB/@18.4863998,73.8146633,826m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bc2bf480d4a270b:0x1d9c8fe7b965d44e!8m2!3d18.4863998!4d73.8172382!16s%2Fg%2F11vrzgwhww?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View on Google Maps
        </a>
      </p>
      <div className="mt-6">
        <iframe
          title="Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.9624609727457!2d73.81466331502365!3d18.486399825310825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf480d4a270b%3A0x1d9c8fe7b965d44e!2sSET-FIT%20HEALTH%20CLUB!5e0!3m2!1sen!2sin!4v1679042728531!5m2!1sen!2sin"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
);

// Main Contact Component
const Contact = () => (
  <div className="flex justify-between p-8 bg-gray-700">
    <ContactForm />
    <ContactDetails />
  </div>
);

export default Contact;
