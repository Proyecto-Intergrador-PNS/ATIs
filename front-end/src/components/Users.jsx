
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/users`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'customer' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data.users);
    } catch {
      setError('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, { headers: { Authorization: `Bearer ${token}` } });
        setSuccess('User updated');
      } else {
        await axios.post(API_URL, form, { headers: { Authorization: `Bearer ${token}` } });
        setSuccess('User created');
      }
      setForm({ name: '', email: '', password: '', address: '', role: 'customer' });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving user');
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: '', address: user.address, role: user.role });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess('User deleted');
      fetchUsers();
    } catch {
      setError('Error deleting user');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      {error && <div className="user-error">{error}</div>}
      {success && <div className="user-success">{success}</div>}
      <form onSubmit={handleSubmit} className="user-form bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required type="email" disabled={!!editingId} />
          <input name="password" value={form.password} onChange={handleChange} placeholder={editingId ? "Nueva contraseña (opcional)" : "Contraseña"} type="password" required={!editingId} />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Dirección" />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="customer">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'} usuario</button>
        {editingId && <button type="button" style={{background:'none',color:'#374151'}} onClick={() => { setEditingId(null); setForm({ name: '', email: '', password: '', address: '', role: 'customer' }); }}>Cancelar</button>}
      </form>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role === 'admin' ? 'Administrador' : 'Cliente'}</td>
              <td className="user-actions">
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
