import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

// Registrar una venta de varios productos
export const createSale = async (req, res) => {
  try {
    const { products } = req.body; // [{ product, quantity }]
    const userId = req.user._id;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: 'Datos inválidos' });
    }
    let total = 0;
    const saleProducts = [];
    // Validar stock y calcular total
    for (const item of products) {
      const prod = await Product.findById(item.product);
      if (!prod) {
        return res.status(404).json({ success: false, message: `Producto no encontrado: ${item.product}` });
      }
      if (prod.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Stock insuficiente para ${prod.name}` });
      }
      saleProducts.push({ product: prod._id, quantity: item.quantity, price: prod.price });
      total += prod.price * item.quantity;
    }
    // Reducir stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }
    // Registrar venta
    const sale = new Sale({ products: saleProducts, total, user: userId });
    await sale.save();
    return res.status(201).json({ success: true, message: 'Venta registrada', sale });
  } catch (error) {
    console.error('Error creando venta:', error);
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

// Listar ventas
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('products.product')
      .populate('user', 'name email');
    return res.status(200).json({ success: true, sales });
  } catch (error) {
    console.error('Error obteniendo ventas:', error);
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};
