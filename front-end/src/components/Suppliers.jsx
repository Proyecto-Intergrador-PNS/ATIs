import React, { useState } from 'react'
import './Suppliers.css';

const Suppliers = () => {
  const [addEditModel, setAddEditModel] = useState(null);

  return (
    <div className="suppliers-container">
      <h1 className="suppliers-title">Supplier Management</h1>
      <div className="suppliers-actions">
        <input className="suppliers-search" type="text" placeholder="Search" />
        <button className="suppliers-add-btn" onClick={() => setAddEditModel(1)}>Add Supplier</button>
      </div>

      {addEditModel && (
        <div className="supplier-modal-overlay">
          <div className="supplier-modal">
            <h1>Add Supplier</h1>
            <button className="close-btn" onClick={() => setAddEditModel(null)} type="button">×</button>
            <form>
              <input type="text" placeholder="Supplier Name" />
              <input type="email" placeholder="Supplier Email" />
              <input type="number" placeholder="Supplier Number" />
              <input type="text" placeholder="Supplier Address" />
              <button type="submit">Add Supplier</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Suppliers