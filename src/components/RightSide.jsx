import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/RightSide.css";
import { FaPlusSquare } from "react-icons/fa";

const RightSide = ({ employees, setEmployees }) => {
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    const newEmployee = {
      id: employees.length + 1,
      name: "New Employee",
      amount: "$4000",
      date: "18-06-24",
      profilePic: "https://wallpaperset.com/w/full/0/d/5/183330.jpg",
      status: "Done",
    };
    setEmployees([...employees, newEmployee]);
  };

  const handleChangeUserDetails = () => {
    if (employees.length > 0) {
      // Get the last employee ID dynamically
      const lastEmployeeId = employees[employees.length - 1].id;
      navigate(`/documents/${lastEmployeeId}`); // Navigate to `documents/:id`
    } else {
      alert("No employees available to update!");
    }
  };

  return (
    <div className="salaries-container">
      <div className="add-employee" onClick={handleAddEmployee}>
        <p>
          <FaPlusSquare /> Add Employee
        </p>
      </div>
      <h3>Payout Monthly</h3>
      <h2>Salaries and Incentives</h2>
      <button className="add-employee"  onClick={handleChangeUserDetails}>Change the User Details</button>

      <div className="employee-list">
        {employees.map((employee) => (
          <div className="employee-item" key={employee.id}>
            <div className="employee-details">
              <div
                className="avatar"
                style={{ backgroundImage: `url(${employee.profilePic})` }}
              ></div>
              <div className="employee-info">
                <p className="name">{employee.name}</p>
                <p className="amount">{employee.amount}</p>
                <p className="date">{employee.date}</p>
              </div>
            </div>
            <div className={`status ${employee.status.toLowerCase()}`}>
              {employee.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSide;
