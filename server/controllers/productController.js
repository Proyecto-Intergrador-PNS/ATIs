import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Supplier from '../models/Supplier.js';

const addProduct = async (req, res) => {
  try {
    const { name, category, supplier, price, stock } = req.body;
    // Optionally validate category and supplier exist
    const categoryExists = await Category.findById(category);
    const supplierExists = await Supplier.findById(supplier);
    if (!categoryExists || !supplierExists) {
      return res.status(400).json({ success: false, message: 'Invalid category or supplier' });
    }
    const newProduct = new Product({ name, category, supplier, price, stock });
    await newProduct.save();
    return res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('supplier');
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, supplier, price, stock } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    await Product.findByIdAndUpdate(id, { name, category, supplier, price, stock });
    return res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export { addProduct, getProducts, updateProduct, deleteProduct };
