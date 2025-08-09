import axios from 'axios'
import React, { useState } from 'react'
import { data } from 'react-router'

const Categories = () => {
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios.post("http://localhost:3000/api/category/add", {categoryName, categoryDescription}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      }
    );
    if (response.data.success) {
      alert("Category added successfully");
      setCategoryName("");
      setCategoryDescription("");
    }else {
      console.error("Error adding the Category:", data);
      alert("Error adding the Category. Please try again")
    }


  }


  return (
    <div className="categories-container">
      <h1 className="categories-title">Category Management</h1>
      <div className="categories-content">
        <div className="add-category-section">
          <h2 className="add-category-title">Add Category</h2>
          <form className="add-category-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" className="input" placeholder="Category Name" onChange={(e) => setCategoryName(e.target.value)} />

            </div>
            <div className="form-group">
              <input type="text" className="input" placeholder="Category Description" name="Category Description" onChange={(e) => setCategoryDescription(e.target.value)}   />
            </div>
            <button type="submit" className="add-category-btn">Add Category</button>
          </form>
        </div>
        <div className="category-list-section">
          {/* Aquí irá la lista de categorías */}
        </div>
      </div>
    </div>
  )
}

export default Categories