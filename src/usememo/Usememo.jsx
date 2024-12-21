import React, { useState, useMemo } from "react";
import CalendarView from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../pages/Calendar.css";

const Usememo = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Memoized event list for rendering
  const memoizedEventsList = useMemo(() => {
    return events.map((event, index) => (
      <li key={index}>
        <strong>{event.name}</strong> -{" "}
        {new Date(event.date).toDateString()}
      </li>
    ));
  }, [events]);

  // Function to highlight event dates on the calendar
  const highlightEventDates = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    return events.some((event) => event.date === formattedDate)
      ? "highlighted-date"
      : null;
  };

  // Memoized tile class name function
  const memoizedTileClassName = useMemo(() => highlightEventDates, [events]);

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

  // Memoized tile content function
  const memoizedTileContent = useMemo(() => renderTileContent, [events]);

  // Handle date selection
  const handleDateClick = (date) => {
    const localDate = date.toLocaleDateString("en-CA");
    const currentDate = new Date().toLocaleDateString("en-CA");

    if (localDate < currentDate) {
      alert("You cannot add an event to previous dates.");
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

    // Add the event to local state
    setEvents([...events, { date: localDate, name: eventName }]);
    setEventName("");
    setShowPopup(false);
    alert("Event added successfully!");
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Event Countdown Calendar</h1>

      {/* Calendar view */}
      <div className="calendar-view">
        <CalendarView
          className="react-calendar"
          onClickDay={handleDateClick} 
          tileClassName={memoizedTileClassName}
          tileContent={memoizedTileContent} 
          minDate={new Date()} // Disable previous dates
        />
      </div>

      {/* Events list */}
      <div className="events-list">
        <h2>Upcoming Events</h2>
        <ul>{memoizedEventsList}</ul>
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

export default Usememo;
