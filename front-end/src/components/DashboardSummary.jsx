import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './DashboardSummary.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const DashboardSummary = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('pos-token');
        const [prodRes, supRes, catRes, ordRes, salRes] = await Promise.all([
          fetch(`${API_URL}/product`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/supplier`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/category`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/sales`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        const [prod, sup, cat, ord, sal] = await Promise.all([
          prodRes.json(), supRes.json(), catRes.json(), ordRes.json(), salRes.json()
        ]);
        setProducts(prod.products || []);
        setSuppliers(sup.suppliers || []);
        setCategories(cat.categories || []);
        setOrders(ord.orders || []);
        setSales(sal.sales || []);
      } catch {
        // Manejo de error opcional
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  // Ganancias por ventas
  const totalSales = sales.reduce((acc, s) => acc + (s.total || 0), 0);
  // Pérdidas por compras
  const totalOrders = orders.reduce((acc, o) => acc + ((o.price || 0) * (o.quantity || 0)), 0);

  return (
    <div className="dashboard-summary-container">
      <h1>Dashboard</h1>
      {loading ? <div>Cargando...</div> : (
        <>
          <div className="dashboard-summary-user">
            <strong>User:</strong> {user?.name} ({user?.email})
          </div>
          <div className="dashboard-summary-cards">
            <div className="dashboard-summary-card">
              <h2>Products</h2>
              <div className="dashboard-summary-count">{products.length}</div>
            </div>
            <div className="dashboard-summary-card">
              <h2>Suppliers</h2>
              <div className="dashboard-summary-count">{suppliers.length}</div>
            </div>
            <div className="dashboard-summary-card">
              <h2>Categories</h2>
              <div className="dashboard-summary-count">{categories.length}</div>
            </div>
            <div className="dashboard-summary-card">
              <h2>Purchase orders</h2>
              <div className="dashboard-summary-count">{orders.length}</div>
            </div>
            <div className="dashboard-summary-card">
              <h2>Sales</h2>
              <div className="dashboard-summary-count">{sales.length}</div>
            </div>
          </div>
          <div className="dashboard-summary-finance">
            <div className="dashboard-summary-gain">
              <strong>Seles Earnings:</strong> ${totalSales}
            </div>
            <div className="dashboard-summary-loss">
              <strong>Purchase Loses:</strong> ${totalOrders}
            </div>
            <div className="dashboard-summary-balance">
              <strong>Balance:</strong> ${totalSales - totalOrders}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSummary;
