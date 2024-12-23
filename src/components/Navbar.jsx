import React, { useState } from "react";
import "../Styles/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { IoMdNotifications, IoMdMail, IoMdFlower, IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();  
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (item) => {
    setActiveItem(item);
  };

  // Update activeItem based on the current location
  React.useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveItem("Dashboard");
    } else if (path === "/calendar") {
      setActiveItem("Calendar");
    } else if (path === "/Usememo") {
      setActiveItem("Projects");
    } else if (path === "/ReduxCalendar") {
      setActiveItem("Team");
    } else if (path === "/documents") {
      setActiveItem("Documents");
    }
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <IoMdFlower />
        </div>
        <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          <li
            className={activeItem === "Dashboard" ? "active" : ""}
            onClick={() => handleClick("Dashboard")}
          >
            <Link to="/">Dashboard</Link>
          </li>
          <li
            className={activeItem === "Calendar" ? "active" : ""}
            onClick={() => handleClick("Calendar")}
          >
            <Link to="/calendar">Calendar</Link>
          </li>
          <li
            className={activeItem === "Projects" ? "active" : ""}
            onClick={() => handleClick("Projects")}
          >
            <Link to="/Usememo">Projects</Link>
          </li>
          <li
            className={activeItem === "Team" ? "active" : ""}
            onClick={() => handleClick("Team")}
          >
            <Link to="/ReduxCalendar">Team</Link>
          </li>
          <li
            className={activeItem === "Documents" ? "active" : ""}
            onClick={() => handleClick("Documents")}
          >
            <Link to="/documents">Documents</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <input type="text" placeholder="Search ..." className="search-bar" />
        
        <div className="icon"><IoMdMail /></div>
        <div className="icon"><IoMdNotifications /></div>
        <div className="nav-profile">
          <img src="https://i.pinimg.com/736x/d7/0b/e4/d70be4a7c02b733e57a6bac0a5133134.jpg" alt="Profile" />
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <IoMdMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
