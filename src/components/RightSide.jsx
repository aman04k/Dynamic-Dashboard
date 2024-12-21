import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/RightSide.css";
import { FaPlusSquare } from "react-icons/fa";

const RightSide = ({ employees, setEmployees }) => {
  const navigate = useNavigate();

  const handleUpdateClick = (employee) => {
    navigate("/update-profile", { state: { employee } });
  };

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


  return (
    <div className="salaries-container">
      <div className="add-employee" onClick={handleAddEmployee}>
        <p>
          <FaPlusSquare /> Add Employee
        </p>
      </div>
      <h3>Payout Monthly</h3>
      <h2>Salaries and Incentives</h2>

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
              <button
                className="update-status"
                onClick={() => handleUpdateClick(employee)}
              >
                Update
              </button>
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
