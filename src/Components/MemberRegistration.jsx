import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/lable';

function MemberRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    medicalIssue: 'No',
    medicalDetails: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedicalIssueChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      medicalIssue: value,
      medicalDetails: value === 'Yes' ? formData.medicalDetails : '',
    });
  };

  const handleCloseMedicalDetails = () => {
    setFormData({ ...formData, medicalIssue: 'No', medicalDetails: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setStatus('Form submitted successfully!');
    setFormData({ name: '', email: '', phone: '', msg: '', purpose: '', medicalIssue: 'No', medicalDetails: '' });
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Become a Member</h2>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Full Name</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="bg-gray-700" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="bg-gray-700" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="phone">Phone</Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(123) 456-7890" className="bg-gray-700" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="purpose">Purpose of Joining</Label>
            <select name="purpose" id="purpose" value={formData.purpose} onChange={handleChange} className="w-full p-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Select Purpose</option>
              <option value="Fitness">Fitness</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Building">Muscle Building</option>
              <option value="General Well-being">General Well-being</option>
            </select>
          </div>
          <div className="mb-4">
            <Label>Do you have any medical issue?</Label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="medicalIssue" value="No" checked={formData.medicalIssue === 'No'} onChange={handleMedicalIssueChange} className="mr-2" /> No
              </label>
              <label className="flex items-center">
                <input type="radio" name="medicalIssue" value="Yes" checked={formData.medicalIssue === 'Yes'} onChange={handleMedicalIssueChange} className="mr-2" /> Yes
              </label>
            </div>
          </div>
          {formData.medicalIssue === 'Yes' && (
            <div className="mb-4 relative">
              <Label htmlFor="medicalDetails">What is your medical issue?</Label>
              <textarea id="medicalDetails" name="medicalDetails" value={formData.medicalDetails} onChange={handleChange} className="w-full p-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Describe your medical condition..." required></textarea>
              <button type="button" onClick={handleCloseMedicalDetails} className="absolute top-0 right-0 text-red-500 text-lg font-bold">✖</button>
            </div>
          )}
          
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Register</Button>
        </form>
        {status && <p className="mt-4 text-center text-white">{status}</p>}
      </div>
    </section>
  );
}

export default MemberRegistration;
