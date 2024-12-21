import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/UpdateProfile.css";

function UpdateProfile({ employees, setEmployees }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    profilePic: "",
  });

  useEffect(() => {
    if (state && state.employee) {
      const { name, amount, profilePic } = state.employee;
      setFormData({
        name,
        salary: amount.replace("$", "").replace(",", ""),
        profilePic,
      });
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({ ...prevData, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      ...state.employee,
      name: formData.name,
      amount: `$${parseFloat(formData.salary).toLocaleString()}`,
      profilePic: formData.profilePic,
    };

    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );

    setEmployees(updatedEmployees);
    navigate("/");

    alert("Profile updated successfully!");
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form className="update-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            name="salary"
            id="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="preview-image">
          {formData.profilePic && (
            <img src={formData.profilePic} alt="Profile Preview" />
          )}
        </div>
        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
