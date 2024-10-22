import React, { useState, useEffect } from 'react';
import { getOrders } from '../api/Api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // Add filter state

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.status === filter; // Adjust filtering logic as needed
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">Filter by Status</label>
        <select value={filter} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-lg">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          {/* Add more statuses as needed */}
        </select>
      </div>

      <ul className="list-disc list-inside">
        {filteredOrders.map((order) => (
          <li key={order.id} className="text-gray-700">
            Order ID: {order.id}, Status: {order.status}, Date: {new Date(order.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
