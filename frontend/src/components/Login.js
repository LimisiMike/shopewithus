import React, { useState } from 'react';
import { loginUser } from '../api/Api'; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ email, password });
      
      // Ensure userData contains a role property
      if (userData.is_admin) { // Assuming is_admin is a boolean in your userData
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/client/dashboard'); // Redirect to client dashboard
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.detail || 'Invalid email or password.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
