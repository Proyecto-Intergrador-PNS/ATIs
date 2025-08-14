import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { data } from 'react-router'

const Categories = () => {
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/category", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        });
        console.log(response.data.categories);
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); 


  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios.post("http://localhost:3000/api/category/add", {categoryName, categoryDescription}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      }
    );
    if (response.data.success) {
      setCategoryName("");
      setCategoryDescription("");
      alert("Category added successfully");
    }else {
      console.error("Error adding the Category:", data);
      alert("Error adding the Category. Please try again")
    }


  }

  if (loading) {
    return <div>Loading...</div>;}


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
          <div className="category-table-container">
            <table className="category-table">
              <thead>
                <tr className="category-table-header-row">
                  <th className="category-table-header">Category Name</th>
                  <th className="category-table-header">Category Description</th>
                  <th className="category-table-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className="category-table-row">
                    <td className="category-table-cell">{category.categoryName}</td>
                    <td className="category-table-cell">{category.categoryDescription}</td>
                    <td className="category-table-cell">
                      <button className="category-edit-btn">Edit</button>
                      <button className="category-delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories