import React, { useState, useEffect } from 'react';
import { getCategories, addCategory } from '../api/Api';

const CategoryManagement = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory({ name: categoryName });
      alert('Category added successfully!');
      setCategoryName(''); // Clear the input after adding
      fetchCategories(); // Refresh the category list after adding
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

      <form onSubmit={handleAddCategory}>
        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Add Category
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Existing Categories</h3>
        <ul className="list-disc list-inside">
          {categories.map((category) => (
            <li key={category.id} className="text-gray-700">
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManagement;
