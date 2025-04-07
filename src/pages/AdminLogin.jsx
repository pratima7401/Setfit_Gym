//page/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Label } from '../Components/ui/lable';

function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost/gym_api/admin_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const text = await response.text(); // Read as text first
      console.log("Raw Response:", text);
  
      const result = JSON.parse(text); // Try parsing JSON
      console.log("Parsed JSON:", result);
  
      if (result.success) {
        localStorage.setItem('adminToken', result.token);
        navigate('/admin-dashboard');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError('Login failed. Please try again.');
    }
  };
  
  
  

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="w-full" />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full" />
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Login</Button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
