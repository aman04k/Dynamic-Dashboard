import React from "react";
import "../Styles/Dashboard.css";
import LeftSide from "../components/LeftSide.jsx";
import CenterSide from "../components/CenterSide.jsx";
import RightSide from "../components/RightSide.jsx";

const Dashboard = ({ employees, setEmployees }) => {
  return (
    <div className="dashboard">
      <div className="leftSide">
        <LeftSide />
      </div>
      <div className="centerSide">
        <CenterSide />
      </div>
      <div className="rightSide">
        {/* //add the usememo countdown here */}

        <RightSide employees={employees} setEmployees={setEmployees} />
      </div>
    </div>
  );
};

export default Dashboard;
