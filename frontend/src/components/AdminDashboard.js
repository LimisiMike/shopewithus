import React, { useState } from 'react';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import Orders from './Orders';
import Payments from './Payments';
import Users from './Users';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'orders':
        return <Orders />;
      case 'payments':
        return <Payments />;
      case 'users':
        return <Users />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-6 text-2xl font-bold">Admin Dashboard</div>
        <nav className="mt-10">
          <button
            onClick={() => setActiveTab('products')}
            className={`block w-full text-left p-3 ${activeTab === 'products' ? 'bg-gray-700' : ''}`}
          >
            Product Management
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`block w-full text-left p-3 ${activeTab === 'categories' ? 'bg-gray-700' : ''}`}
          >
            Category Management
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`block w-full text-left p-3 ${activeTab === 'orders' ? 'bg-gray-700' : ''}`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`block w-full text-left p-3 ${activeTab === 'payments' ? 'bg-gray-700' : ''}`}
          >
            Payments
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`block w-full text-left p-3 ${activeTab === 'users' ? 'bg-gray-700' : ''}`}
          >
            User Management
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
