import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const Profile = () => {
		const { login } = useAuth();
	const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	// Cargar datos actuales del perfil
	useEffect(() => {
		const fetchProfile = async () => {
			setLoading(true);
			setError('');
			try {
				const res = await fetch(`${API_URL}/profile`, {
					headers: { 'Authorization': `Bearer ${localStorage.getItem('pos-token')}` }
				});
				const data = await res.json();
				if (data.success) {
					setForm({ name: data.user.name || '', email: data.user.email || '', address: data.user.address || '', password: '' });
				} else {
					setError(data.message || 'Error loading profile');
				}
					} catch {
						setError('Error loading profile');
					}
			setLoading(false);
		};
		fetchProfile();
	}, []);

	// Manejar cambios en el formulario
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Manejar envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');
		try {
			const res = await fetch(`${API_URL}/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('pos-token')}`
				},
				body: JSON.stringify({
					name: form.name,
					email: form.email,
					address: form.address,
					password: form.password ? form.password : undefined
				})
			});
			const data = await res.json();
			if (data.success) {
				setSuccess('Perfil actualizado correctamente');
				setForm(f => ({ ...f, password: '' }));
				// Actualizar usuario en contexto y localStorage
				login(data.user, localStorage.getItem('pos-token'));
			} else {
				setError(data.message || 'Error al actualizar');
			}
			} catch {
				setError('Error al actualizar');
			}
		setLoading(false);
	};

	return (
		<div className="profile-container">
			<h2>Mi Perfil</h2>
			{error && <div className="profile-error">{error}</div>}
			{success && <div className="profile-success">{success}</div>}
			<form className="profile-form" onSubmit={handleSubmit}>
				<label>Nombre:
					<input type="text" name="name" value={form.name} onChange={handleChange} required />
				</label>
				<label>Email:
					<input type="email" name="email" value={form.email} onChange={handleChange} required />
				</label>
				<label>Dirección:
					<input type="text" name="address" value={form.address} onChange={handleChange} />
				</label>
				<label>Nueva contraseña:
					<input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Dejar en blanco para no cambiar" />
				</label>
				<button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar cambios'}</button>
			</form>
		</div>
	);
};

export default Profile;
