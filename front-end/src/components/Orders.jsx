
import React, { useEffect, useState } from 'react';
import './Orders.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buyModal, setBuyModal] = useState(null); // productId
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  // Venta
  const [saleModal, setSaleModal] = useState(false);
  const [saleProducts, setSaleProducts] = useState([]); // [{product, quantity}]
  const [sales, setSales] = useState([]);
  const [invoiceModal, setInvoiceModal] = useState(null); // venta seleccionada
  // Renderiza la factura de una venta
  const renderInvoice = (sale) => (
    <div className="orders-modal-overlay">
      <div className="orders-modal" style={{minWidth:'400px', maxWidth:'600px'}}>
  <h2 className="orders-invoice-title" style={{textAlign:'center'}}>Sales Invoice</h2>
        <div style={{marginBottom:'1rem'}}>
          <strong>Date:</strong> {new Date(sale.createdAt).toLocaleString()}<br/>
          <strong>Seller:</strong> {sale.user?.name || sale.user?.email}
        </div>
        <table style={{width:'100%', marginBottom:'1rem'}}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {sale.products.map((p, idx) => (
              <tr key={p.product?._id || idx}>
                <td>{p.product?.name}</td>
                <td>{p.quantity}</td>
                <td>${p.price?.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                <td>${(p.price * p.quantity).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{textAlign:'right', fontWeight:'bold', fontSize:'1.2rem'}}>Total: ${sale.total?.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
        <button onClick={() => setInvoiceModal(null)} style={{marginTop:'1rem'}}>Close</button>
      </div>
    </div>
  );

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/product`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('pos-token')}` }
      });
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('pos-token')}` }
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (e) {
      console.error('Error fetching orders:', e);
    }
  };

  // Fetch ventas
  const fetchSales = async () => {
    try {
      const res = await fetch(`${API_URL}/sales`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('pos-token')}` }
      });
      const data = await res.json();
      if (data.success) setSales(data.sales);
    } catch (e) {
      console.error('Error fetching sales:', e);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchSales();
  }, []);
  // Abrir modal de venta
  const openSaleModal = () => {
    setSaleProducts(products.map(p => ({ product: p._id, quantity: 0, name: p.name, max: p.stock })));
    setSaleModal(true);
  };

  // Cambiar cantidad de producto en venta
  const handleSaleChange = (idx, value) => {
    setSaleProducts(saleProducts.map((item, i) => i === idx ? { ...item, quantity: Math.max(0, Number(value)) } : item));
  };

  // Calcular total de la venta
  const saleTotal = saleProducts.reduce((acc, item) => {
    const prod = products.find(p => p._id === item.product);
    return acc + (prod && item.quantity > 0 ? prod.price * item.quantity : 0);
  }, 0);

  // Registrar venta
  const handleSale = async () => {
    setLoading(true);
    setMessage('');
    const selected = saleProducts.filter(item => item.quantity > 0);
    if (selected.length === 0) {
      setMessage('Select atleast one product');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pos-token')}`
        },
        body: JSON.stringify({ products: selected.map(({ product, quantity }) => ({ product, quantity })) })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Sale was made successfuly');
        setSaleModal(false);
        fetchProducts();
        fetchSales();
      } else {
        setMessage(data.message || 'Cant register the sele');
      }
    } catch {
      setMessage('Cant register the sele');
    }
    setLoading(false);
  };

  // Comprar producto
  const handleBuy = async (productId) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pos-token')}`
        },
        body: JSON.stringify({ productId, quantity: Number(quantity) })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Stock Updated');
        setBuyModal(null);
        setQuantity(1);
        fetchProducts();
        fetchOrders();
      } else {
        setMessage(data.message || 'Error buying products');
      }
    } catch {
      setMessage('Error buying products');
    }
    setLoading(false);
  };

  return (
    <div className="orders-container">
  <h1 className="orders-title-xl">Orders and Product Purchases</h1>
  {message && <div className="orders-message">{message}</div>}
  <h2 className="orders-title-lg">Available Products</h2>
  <button style={{marginBottom:'1rem'}} onClick={openSaleModal}>Register Sale</button>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p._id}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>{p.category?.categoryName}</td>
              <td>{p.supplier?.name}</td>
              <td>${p.price?.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => { setBuyModal(p._id); setQuantity(1); }}>Buy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {saleModal && (
        <div className="orders-modal-overlay">
          <div className="orders-modal">
            <h3>Register Product Sale</h3>
            <table style={{width:'100%'}}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Quantity to sell</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {saleProducts.map((item, idx) => (
                  <tr key={item.product}>
                    <td>{item.name}</td>
                    <td>{item.max}</td>
                    <td>
                      <input type="number" min="0" max={item.max} value={item.quantity} onChange={e => handleSaleChange(idx, Math.min(item.max, e.target.value))} />
                    </td>
                    <td>${products.find(p => p._id === item.product)?.price?.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    <td>${((products.find(p => p._id === item.product)?.price || 0) * item.quantity).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:'1rem', fontWeight:'bold'}}>Total: ${saleTotal.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
            <button onClick={handleSale} disabled={loading}>Confirm Sale</button>
            <button onClick={() => setSaleModal(false)} disabled={loading}>Cancel</button>
          </div>
        </div>
      )}
      {buyModal && (
        <div className="orders-modal-overlay">
          <div className="orders-modal">
            <h3>Buy product</h3>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
            <button onClick={() => handleBuy(buyModal)} disabled={loading}>Confirm purchase</button>
            <button onClick={() => setBuyModal(null)} disabled={loading}>Cancel</button>
          </div>
        </div>
      )}
  <h2 className="orders-title-lg">Purchase Order History</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o._id}>
              <td>{i + 1}</td>
              <td>{o.product?.name}</td>
              <td>{o.quantity}</td>
              <td>${o.price?.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
              <td>{o.user?.name || o.user?.email}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

  <h2 className="orders-title-lg">Sales History</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Products</th>
            <th>Total</th>
            <th>User</th>
            <th>Date</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, i) => (
            <tr key={s._id}>
              <td>{i + 1}</td>
              <td>
                {s.products.map((p, idx) => (
                  <div key={p.product?._id || idx}>
                    {p.product?.name} x{p.quantity} (${p.price?.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})} c/u)
                  </div>
                ))}
              </td>
              <td>${s.total?.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
              <td>{s.user?.name || s.user?.email}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
              <td><button onClick={() => setInvoiceModal(s)}>View invoice</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {invoiceModal && renderInvoice(invoiceModal)}
    </div>
  );
};

export default Orders;
