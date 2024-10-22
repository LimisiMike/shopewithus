import React, { useState, useEffect } from 'react'
import { getProducts } from '../api/Api'
import { Link } from 'react-router-dom'

const ProductListing = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({ category: '', price: '', search: '' })
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchProducts()
    }, [filters, page])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const data = await getProducts({ ...filters, page })
            setProducts(data)
        } catch (error) {
            console.error('Error loading Products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    if (loading) return <p>Loading products...</p>

    return (
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Products</h1>
    
          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search by name"
              value={filters.search}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="1">Electronics</option>
              <option value="2">Books</option>
              <option value="2">Clothing, Shoes, Jewelry & Watches</option>
              <option value="2">Office and School Supplies</option>
              <option value="2">Computers</option>
              <option value="2">Food & Grocery</option>
              <option value="2">Accessories</option>
              <option value="2">Furniture</option>
              <option value="2">Automotive</option>

              {/* Add more categories as needed */}
            </select>
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Any Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
    
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
    
          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="mx-4">Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      );
}

export default ProductListing
