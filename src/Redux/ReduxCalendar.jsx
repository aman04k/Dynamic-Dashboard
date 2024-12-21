import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import { addEvent } from "../Redux/EventSlice";
import "../pages/Calendar.css";
import { useNavigate } from "react-router-dom";

const ReduxCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [eventName, setEventName] = useState("");
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  // Handle date selection
  const handleDateClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for comparison

    if (date < today) {
      // alert("You cannot add an event on a past date.");
      return; 
    }

    setSelectedDate(date);
    setShowPopup(true); 
  };

  // Add an event to the list with validation
  const handleAddEvent = () => {
    if (!eventName) {
      alert("Please enter an event name.");
      return;
    }

    const localDate = selectedDate.toLocaleDateString("en-CA"); 
    const currentDate = new Date().toLocaleDateString("en-CA");

    // Validation: Only allow events for today or future dates
    if (localDate < currentDate) {
      alert("Events cannot be added to past dates.");
      return;
    }

    // Dispatch the event to the Redux store
    dispatch(addEvent({ date: localDate, name: eventName }));
    setEventName("");
    // Close the popup after adding the event
    setShowPopup(false); 
    alert("Event added successfully!");
    navigate("/")
  };

  // Function to highlight event dates on the calendar
  const highlightEventDates = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA"); 
    return events.some((event) => event.date === formattedDate)
      ? "highlighted-date"
      : null;
  };

  // Function to display event names on the calendar
  const renderTileContent = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    const event = events.find((event) => event.date === formattedDate);
    return event ? (
      <div className="event-indicator">
        <span className="event-name">{event.name}</span>
      </div>
    ) : null;
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Event Countdown Calendar</h1>

      {/* Calendar view */}
      <div className="calendar-view">
        <CalendarView
          className="react-calendar"
          onClickDay={handleDateClick} 
          tileClassName={highlightEventDates}
          tileContent={renderTileContent} 
          tileDisabled={({ date }) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            return date < today;
          }}
        />
      </div>

      {/* Events list */}
      <div className="events-list">
        <h2>Upcoming Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.name}</strong> -{" "}
              {new Date(event.date).toDateString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Popup for adding an event */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Add Event</h2>
            <p>Selected Date: {selectedDate.toDateString()}</p>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="name-input"
            />
            <div className="popup-actions">
              <button onClick={handleAddEvent} className="add-event-btn">
                Add Event
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReduxCalendar;
