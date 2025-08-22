import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Crear una nueva orden y aumentar el stock del producto
export const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Datos inválidos' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    // Registrar la orden
    const order = new Order({
      product: productId,
      quantity,
      price: product.price,
      user: userId
    });
    await order.save();
    // Actualizar el stock del producto
    product.stock += quantity;
    await product.save();
    return res.status(201).json({ success: true, message: 'Orden registrada y stock actualizado', order });
  } catch (error) {
    console.error('Error creando orden:', error);
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

// Listar todas las órdenes
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('product')
      .populate('user', 'name email');
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error obteniendo órdenes:', error);
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};
