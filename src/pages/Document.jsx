import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/Document.css";

const Document = ({ employees, setEmployees }) => {
  const { id } = useParams(); // Get the employee ID from the URL parameter
  const navigate = useNavigate();

  // Find the employee by ID
  const employee = employees.find((emp) => emp.id === Number(id));

  const [name, setName] = useState(employee?.name || "");
  const [amount, setAmount] = useState(employee?.amount || "");
  const [profilePic, setProfilePic] = useState(employee?.profilePic || "");

  useEffect(() => {
    if (!employee) {
      alert(`No employee found with ID: ${id}`);
      navigate("/"); // Redirect back to the dashboard if no employee found
    }
  }, [employee, navigate, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      ...employee,
      name,
      amount,
      profilePic,
    };

    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === employee.id ? updatedEmployee : emp
      )
    );

    navigate("/");
  };

  return (
    <div className="document-container">
      <h2 className="document-title">Update Employee Details</h2>
      {employee && (
        <form onSubmit={handleUpdate} className="document-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">Salary:</label>
            <input
              type="text"
              id="amount"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePic" className="form-label">Profile Picture:</label>
            <input
              type="file"
              id="profilePic"
              className="form-input"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {profilePic && (
            <div className="form-group">
              <p>Preview:</p>
              <img
                src={profilePic}
                alt="Profile Preview"
                className="profile-preview"
              />
            </div>
          )}

          <button type="submit" className="submit-button">Update Employee</button>
        </form>
      )}
    </div>
  );
};

export default Document;
