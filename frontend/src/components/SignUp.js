import React, { useState } from 'react';
import { signUpUser } from '../api/Api'; 
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin checkbox
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call API to SignUp the user
      await signUpUser({ email, password, is_admin: isAdmin }); // Pass isAdmin
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">SignUp</h2>
      {error && <p className="text-red-600">{error}</p>}
      
      <form onSubmit={handleSignUp}>
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

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mr-2"
            />
            Create as Admin
          </label>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white rounded-lg"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
