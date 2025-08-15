import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { data } from 'react-router';

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);


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
      };
    };


  useEffect(() => {
    fetchCategories();
  }, []); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editCategory) {
      const response = await axios.put(`http://localhost:3000/api/category/${editCategory}`, {categoryName, categoryDescription}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      }
    );
    if (response.data.success) {
      setEditCategory(null);
      alert("Category Updated successfully");
      fetchCategories(); // Refresh the category list after adding a new category
    }else {
      console.error("Error editing the Category:", data);
      alert("Error editing the Category. Please try again")
    }
    } else {
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
      fetchCategories(); // Refresh the category list after adding a new category
    }else {
      console.error("Error adding the Category:", data);
      alert("Error adding the Category. Please try again")
    }
  }

  };




  const handleEdit = async (category) => {
    setEditCategory(category._id);
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
  };

  const handleCancel = async () => {
    setEditCategory(null);
    setCategoryName("");
    setCategoryDescription("");
  }

  if (loading) {
    return <div>Loading...</div>;}


  return (
    <div className="categories-container">
      <h1 className="categories-title">Category Management</h1>
      <div className="categories-content">
        <div className="add-category-section">
          <h2 className="add-category-title">{editCategory ? "Edit Category" : "Add Category"}</h2>
          <form className="add-category-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" className="input" value={categoryName} placeholder="Category Name" onChange={(e) => setCategoryName(e.target.value)} />

            </div>
            <div className="form-group">
              <input type="text" className="input" value={categoryDescription} placeholder="Category Description" name="Category Description" onChange={(e) => setCategoryDescription(e.target.value)}   />
            </div>
          <div>
            <button type="submit" className="add-category-btn">{editCategory ? "Save Changes" : "Add Category"}</button>
            {
              editCategory && (
                <button type='button' className='w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600' onClick={handleCancel}>
                  Cancel
                </button>
              )
            }
          </div>   
          </form>
        </div>
        <div className="category-list-section">
          <div className="category-table-container">
            <table className="category-table">
              <thead>
                <tr className="category-table-header-row">
                  <th className="category-table-header">ID</th>
                  <th className="category-table-header">Name</th>
                  <th className="category-table-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index} className="category-table-row">
                    <td className="category-table-cell">{index + 1}</td>
                    <td className="category-table-cell">{category.categoryName}</td>
                    <td className="category-table-cell">
                      <button className="category-edit-btn" onClick={() => handleEdit(category)}>Edit</button>
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