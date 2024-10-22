import React, { useState, useEffect } from 'react';
import { getPayments } from '../api/Api';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Payments</h2>

      <ul className="list-disc list-inside">
        {payments.map((payment) => (
          <li key={payment.id} className="text-gray-700">
            Payment ID: {payment.id}, Status: {payment.status}, Amount: ${payment.amount}, Date: {new Date(payment.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
