import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/Api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {product ? (
        <div className="p-6 border border-gray-200 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-2">Price: ${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
          <button className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600">
            Add to Cart
          </button>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;
