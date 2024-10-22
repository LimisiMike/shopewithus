import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Set headers and base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login user
export const loginUser = async ({ email, password}) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};

// Register new user
export const signUpUser = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  };

// Get products
export const getProducts = async () => {
  const response = await axiosInstance.get('/prod/all_products');
  return response.data;
};

// Get a single product by ID
export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/prod/products_id/${id}`);
  return response.data;
};

// Get orders
export const getOrders = async () => {
  const response = await axiosInstance.get('/orders'); // Make sure this endpoint is defined on the backend
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const response = await axiosInstance.post('/auth/logout'); // Corrected endpoint
  return response.data;
};

// Fetch user data (for Navbar or other components that need user info)
export const getUserData = async () => {
  const response = await axiosInstance.get('/user');
  return response.data;
};

// Get categories
export const getCategories = async () => {
  const response = await axiosInstance.get('/cat/all_categories');
  return response.data;
};

// Add category
export const addCategory = async (category) => {
  const response = await axiosInstance.post('/cat/add_category', category);
  return response.data;
};

// Get payments
export const getPayments = async () => {
  const response = await axiosInstance.get('/payments'); // Adjust endpoint according to the backend
  return response.data;
};

// Add product
export const addProduct = async (product) => {
  const response = await axiosInstance.post('/prod/add_products', product); // Corrected endpoint
  return response.data;
};

// Get users
export const getUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

// Update user status
export const updateUserStatus = async (userId, status) => {
  const response = await axiosInstance.patch(`/users/${userId}`, { status });
  return response.data;
};
