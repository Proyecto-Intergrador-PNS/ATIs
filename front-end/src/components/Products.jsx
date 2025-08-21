import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [addEditModal, setAddEditModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    supplier: '',
    price: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/product', {
        headers: { Authorization: `Bearer ${localStorage.getItem('pos-token')}` },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/category', {
        headers: { Authorization: `Bearer ${localStorage.getItem('pos-token')}` },
      });
      setCategories(response.data.categories);
    } catch {
      setCategories([]);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/supplier', {
        headers: { Authorization: `Bearer ${localStorage.getItem('pos-token')}` },
      });
      setSuppliers(response.data.suppliers);
    } catch {
      setSuppliers([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProductId) {
        const response = await axios.put(`http://localhost:3000/api/product/${editProductId}`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('pos-token')}` } }
        );
        if (response.data.success) {
          alert('Product updated successfully');
          setAddEditModal(null);
          setFormData({ name: '', category: '', supplier: '', price: '', stock: '' });
          setEditProductId(null);
          fetchProducts();
        } else {
          alert('Error updating the Product. Please try again');
        }
      } else {
        const response = await axios.post('http://localhost:3000/api/product/add',
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('pos-token')}` } }
        );
        if (response.data.success) {
          alert('Product added successfully');
          setAddEditModal(null);
          setFormData({ name: '', category: '', supplier: '', price: '', stock: '' });
          fetchProducts();
        } else {
          alert('Error adding the Product. Please try again');
        }
      }
    } catch {
      alert('Error saving product, Please try again');
    }
  };

  const handleEdit = (product) => {
    setEditProductId(product._id);
    setFormData({
      name: product.name,
      category: product.category?._id || '',
      supplier: product.supplier?._id || '',
      price: product.price,
      stock: product.stock
    });
    setAddEditModal(1);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/product/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('pos-token')}` } }
        );
        if (response.data.success) {
          alert('Product deleted successfully');
          fetchProducts();
        } else {
          alert('Error deleting product. Please try again');
        }
      } catch {
        alert('Error deleting product. Please try again');
      }
    }
  };

  const handleCancel = () => {
    setAddEditModal(null);
    setFormData({ name: '', category: '', supplier: '', price: '', stock: '' });
    setEditProductId(null);
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Product Management</h1>
      <div className="products-actions">
        <input className="products-search" type="text" placeholder="Search" />
        <button className="products-add-btn" onClick={() => setAddEditModal(1)}>Add Product</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.category?.categoryName || ''}</td>
                <td>{product.supplier?.name || ''}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {addEditModal && (
        <div className="product-modal-overlay">
          <div className="product-modal">
            <h1>{editProductId ? 'Edit Product' : 'Add Product'}</h1>
            <button className="close-btn" onClick={handleCancel} type="button">×</button>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Product Name" name="name" value={formData.name} onChange={handleChange} />
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                ))}
              </select>
              <select name="supplier" value={formData.supplier} onChange={handleChange}>
                <option value="">Select Supplier</option>
                {suppliers.map((sup) => (
                  <option key={sup._id} value={sup._id}>{sup.name}</option>
                ))}
              </select>
              <input type="number" placeholder="Price" name="price" value={formData.price} onChange={handleChange} />
              <input type="number" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} />
              <button type="submit">{editProductId ? 'Save Changes' : 'Add Product'}</button>
              {editProductId && (
                <button type="button" className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
