import React, { useEffect, useState } from 'react'
import './Suppliers.css';
import axios from 'axios';

const Suppliers = () => {
  const [addEditModel, setAddEditModel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [editSupplierId, setEditSupplierId] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/supplier", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        });
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error("Error fetching supplier:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    fetchSuppliers();
  }, []); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSupplierId) {
        // Edit supplier
        const response = await axios.put(`http://localhost:3000/api/supplier/${editSupplierId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        });
        if (response.data.success) {
          alert("Supplier updated successfully");
          setAddEditModel(null);
          setFormData({ name: "", email: "", number: "", address: "" });
          setEditSupplierId(null);
          fetchSuppliers();
        } else {
          alert("Error updating the Supplier. Please try again");
        }
      } else {
        // Add supplier
        const response = await axios.post("http://localhost:3000/api/supplier/add", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        });
        if (response.data.success) {
          alert("Supplier added successfully");
          setAddEditModel(null);
          setFormData({ name: "", email: "", number: "", address: "" });
          fetchSuppliers();
        } else {
          alert("Error adding the Supplier. Please try again");
        }
      }
    } catch {
      alert("Error saving supplier, Please try again");
    }
  }

  const handleEdit = (supplier) => {
    setEditSupplierId(supplier._id);
    setFormData({
      name: supplier.name,
      email: supplier.email,
      number: supplier.number,
      address: supplier.address,
    });
    setAddEditModel(1);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/supplier/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        });
        if (response.data.success) {
          alert("Supplier deleted successfully");
          fetchSuppliers();
        } else {
          alert("Error deleting supplier. Please try again");
        }
      } catch {
        alert("Error deleting supplier. Please try again");
      }
    }
  };

  const handleCancel = () => {
    setAddEditModel(null);
    setFormData({ name: "", email: "", number: "", address: "" });
    setEditSupplierId(null);
  };

  return (
    <div className="suppliers-container">
      <h1 className="suppliers-title">Supplier Management</h1>
      <div className="suppliers-actions">
        <input className="suppliers-search" type="text" placeholder="Search" />
        <button className="suppliers-add-btn" onClick={() => setAddEditModel(1)}>Add Supplier</button>
      </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Name</th>
                <th>Supplier Email</th>
                <th>Supplier Phone Number</th>
                <th>Supplier Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={supplier._id}>
                  <td>{index + 1}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.number}</td>
                  <td>{supplier.address}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(supplier)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(supplier._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      {addEditModel && (
        <div className="supplier-modal-overlay">
          <div className="supplier-modal">
            <h1>{editSupplierId ? "Edit Supplier" : "Add Supplier"}</h1>
            <button className="close-btn" onClick={handleCancel} type="button">×</button>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Supplier Name" name='name' value={formData.name} onChange={handleChange} />
              <input type="email" placeholder="Supplier Email" name='email' value={formData.email} onChange={handleChange} />
              <input type="number" placeholder="Supplier Number" name='number' value={formData.number} onChange={handleChange} />
              <input type="text" placeholder="Supplier Address" name='address' value={formData.address} onChange={handleChange} />
              <button type="submit">{editSupplierId ? "Save Changes" : "Add Supplier"}</button>
              {editSupplierId && (
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

export default Suppliers