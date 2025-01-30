import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Trainers from './pages/Trainers';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import OurSpeciality from './pages/OurSpecial';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App bg-gray-900 text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/classes" element={<Layout><Classes /></Layout>} />
          <Route path="/speciality" element={<Layout><OurSpeciality /></Layout>} />
          <Route path="/trainers" element={<Layout><Trainers /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
