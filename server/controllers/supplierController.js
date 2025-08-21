const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, number, address } = req.body;
    const updated = await Supplier.findByIdAndUpdate(
      id,
      { name, email, number, address },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    return res.status(200).json({ success: true, message: 'Supplier updated successfully' });
  } catch (error) {
    console.error('Error updating supplier', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Supplier.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    return res.status(200).json({ success: true, message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
import Supplier from '../models/Supplier.js';


const addSupplier = async (req, res) => {
  try {
    const { name, email, number, address } = req.body;


    const existingSupplier = await Supplier.findOne({ name });
    if (existingSupplier) {
      return res.status(400).json({ success: false, message: 'Supplier already exists' });
    }

    const newSupplier = new Supplier({
      name,
      email,
      number,
      address
    });

    await newSupplier.save();
    return res.status(201).json({ success: true, message: 'Supplier added successfully' });

  } catch (error) {
    console.error('Error adding supplier', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json({ success: true, suppliers });
  } catch (error) {
    console.error("Error fetching Supplier", error);
    return res.status(500).json({ success: false, message: 'Server Error getting Supplier' });
  }
}

export { addSupplier, getSuppliers, updateSupplier, deleteSupplier };