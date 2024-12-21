import React, { useEffect, useState } from "react";
import "../Styles/CenterSide.css";
import MatchGraph from "../components/MatchGraph.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useEvent } from "../context/EventContext";
import { RiAdminLine } from "react-icons/ri";
import "../Styles/TeamTracker.css";

const TeamTracker = () => {
  const totalMembers = 120;
  const teamData = [
    { role: "Designer", count: 48, color: "#5DB075" },
    { role: "Developer", count: 27, color: "#3D75B0" },
    { role: "Project manager", count: 18, color: "#B0B0B0" },
  ];

  const totalCount = teamData.reduce((acc, data) => acc + data.count, 0);
  let currentAngle = 0;

  return (
    <div className="team-tracker-container">
      <header className="team-tracker-header">
        <span>Total employees</span>
        <button className="team-tracker-btn">
          <FaArrowRight />
        </button>
      </header>

      <h2 className="team-tracker-title">Track your team</h2>

      <div className="team-tracker-chart">
        <div className="team-tracker-arc">
          {teamData.map((data, index) => {
            const percentage = (data.count / totalCount) * 100;
            const angle = (percentage / 100) * 360;

            const segmentStyle = {
              backgroundColor: data.color,
              transform: `rotate(${currentAngle}deg)`,
              zIndex: teamData.length - index,
              clipPath: "polygon(50% 50%, 0 0, 100% 0)",
              transformOrigin: "100% 50%",
            };

            currentAngle += angle;

            return (
              <div
                key={index}
                className="team-tracker-arc-segment"
                style={segmentStyle}
              ></div>
            );
          })}
        </div>
        <div className="team-tracker-center">
          <p className="team-tracker-total">{totalMembers}</p>
          <span className="team-tracker-label">Total members</span>
        </div>
      </div>

      <ul className="team-tracker-legend">
        {teamData.map((data, index) => (
          <li key={index} className="team-tracker-legend-item">
            <span
              className="team-tracker-legend-color"
              style={{ backgroundColor: data.color }}
            ></span>
            {data.role} - {data.count} members
          </li>
        ))}
      </ul>
    </div>
  );
};

const useCountdown = (eventDate) => {
  const [timeLeft, setTimeLeft] = useState("");

  const calculateCountdown = () => {
    const now = new Date();
    const targetDate = new Date(eventDate);
    const difference = targetDate - now;

    if (difference <= 0) {
      setTimeLeft("Event has passed");
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft(
      `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left`
    );
  };

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(() => calculateCountdown(), 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  return timeLeft;
};

const CenterSide = () => {
  const { events } = useEvent();

  return (
    <div className="center-side">
      <div className="hours-chart">
        <div className="chart-container-center">
          <div className="upcoming-events">
            <h3>Upcoming Events</h3>
            <ul>
              {events.map((event, index) => {
                const countdown = useCountdown(event.date);
                return (
                  <li key={index} className="event-item">
                    <strong>{event.name}</strong> -{" "}
                    {new Date(event.date).toDateString()}
                    <div className="countdown">{countdown}</div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="avg-hours">
            <div className="avg-hours-header">
              <h1>46.5</h1>
              <span className="percentage">+0.5%</span>
            </div>
            <p>avg hours / week</p>
          </div>
          <div className="hours-dots">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="dot"></div>
            ))}
          </div>
        </div>
        <div className="extra-info">
          <div className="team-info">
            <div className="team-percentage">
              <div className="admin-icon">
                <RiAdminLine />
              </div>
              <h2>2.3%</h2>
            </div>
            <div className="team-type">
              <span>
                <b>80%</b> Onsite team
              </span>
              <span>
                <b>20%</b> Remote team
              </span>
            </div>
          </div>
          
        </div>
    
        
      </div>
      

      <div className="grafh-container">
        <TeamTracker />
        <div className="hiring-statistics">
          <h3>Talent recruitment</h3>
          <div className="talent-profiles">
            <img
              src="https://th.bing.com/th/id/OIP.PpYMOa5o6qERDYS_c1avxgHaEK?rs=1&pid=ImgDetMain"
              alt="image"
            />
            <img
              src="https://img.onmanorama.com/content/dam/mm/en/web-stories/sports/images/2023/5/24/msd3.jpg"
              alt="image"
            />
            <button className="join-call-btn">Join Call</button>
          </div>
          <div className="talent-summary">
            <p>T20 Talent</p>
            <p>80 Talent</p>
          </div>
          <MatchGraph />
        </div>
      </div>

      {/* <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        <ul>
          {events.map((event, index) => {
            const countdown = useCountdown(event.date);
            return (
              <li key={index} className="event-item">
                <strong>{event.name}</strong> -{" "}
                {new Date(event.date).toDateString()}
                <div className="countdown">{countdown}</div>
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default CenterSide;
