import User from '../models/User.js';
import bcrypt from 'bcrypt';

/**
 * @file UserController.js
 * @description Controlador para la gestión de usuarios (CRUD).
 */

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // No enviar el password
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, address, role });
    await user.save();
    res.status(201).json({ success: true, message: 'User created', user: { id: user._id, name, email, address, role } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
};

// Editar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, address, role } = req.body;
    const updateData = { name, email, address, role };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User updated', user: { id: user._id, name: user.name, email: user.email, address: user.address, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user' });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
};

export { getUsers, createUser, updateUser, deleteUser };
