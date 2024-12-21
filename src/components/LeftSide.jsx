import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Styles/LeftSide.css";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LeftSide = () => {
  const events = useSelector((state) => state.events); // Access events from Redux

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Hours",
        data: [6, 8, 8, 10, 10],
        fill: false,
        borderColor: "#007bff",
        tension: 0.1,
      },
    ],
  };

  // Countdown Hook
  const useCountdownStatus = (eventDate) => {
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

  return (
    <div className="user-stats-container">
      <h1 className="greeting">Good Morning</h1>

      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        <ul>
          {events.map((event, index) => {
            const countdown = useCountdownStatus(event.date);
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

      <div className="profile-card">
        <div className="profile-info">
          <div className="experience-badge">4+ years experience</div>
          <h3>Chris Jonathan</h3>
          <p>General Manager</p>
        </div>
        <div className="profile-actions">
          <button className="call-btn">
            <FaPhoneAlt />
          </button>
          <button className="email-btn">
            <IoMdMail />
          </button>
        </div>
      </div>

      <div className="work-stats">
        <div className="work-header">
          <h3>Average work time</h3>
          <span className="work-increase">+0.5%</span>
        </div>
        <h1>46 hours</h1>
        <div className="chart-container">
          <Line data={data} />
        </div>
        <p className="extra-info">Total work hours include extra hours</p>
      </div>
    </div>
  );
};

export default LeftSide;
