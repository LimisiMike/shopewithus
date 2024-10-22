import React, { useState, useEffect } from 'react';
import { getProducts, getOrders } from '../api/Api'; // Import API functions
import { ShoppingCartIcon } from '@heroicons/react/outline'

const ClientDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      const ordersData = await getOrders();
      setProducts(productsData);
      setOrders(ordersData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <ShoppingCartIcon className="h-6 w-6 text-indigo-600" />
          <span className="ml-2 text-lg font-semibold">Cart: {cart.length} items</span>
        </div>
        <button className="bg-indigo-600 text-white py-2 px-4 rounded">
          Checkout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          <ul>
            {orders.length > 0 ? (
              orders.map((order) => (
                <li key={order.id} className="border-b py-2">
                  <div className="flex justify-between">
                    <span>Order #{order.id}</span>
                    <span>{order.status}</span>
                  </div>
                  <div className="text-gray-600">Total: ${order.total}</div>
                </li>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
