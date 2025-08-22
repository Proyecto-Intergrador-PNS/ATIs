
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Obtener perfil del usuario autenticado
export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // No enviar la contraseña
    const { _id, name, email, address, role } = user;
    return res.status(200).json({ success: true, user: { id: _id, name, email, address, role } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Actualizar perfil del usuario autenticado
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, address, password } = req.body;
    const updateData = { name, email, address };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { _id, role } = updatedUser;
    return res.status(200).json({ success: true, user: { id: _id, name: updatedUser.name, email: updatedUser.email, address: updatedUser.address, role } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
