import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProfile from "./components/UpdateProfile";
import Calendar from "./pages/Calendar";
import { EventProvider } from "./context/EventContext";
import Usememo from "./usememo/Usememo";
import ReduxCalendar from "./Redux/ReduxCalendar";
import store from "./Redux/Store";
import { Provider } from "react-redux";
import Document from "./pages/Document";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      amount: "$5000",
      date: "15-06-24",
      status: "Waiting",
      profilePic:
        "https://i.pinimg.com/736x/d7/0b/e4/d70be4a7c02b733e57a6bac0a5133134.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      amount: "$4500",
      date: "16-06-24",
      status: "Failed",
      profilePic: "https://wallpapercave.com/wp/wp4338806.jpg",
    },
  ]);

  return (
    <Provider store={store}>
      <EventProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard employees={employees} setEmployees={setEmployees} />
              }
            />
            <Route
              path="/update-profile"
              element={
                <UpdateProfile
                  employees={employees}
                  setEmployees={setEmployees}
                />
              }
            />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/Usememo" element={<Usememo />} />
            <Route path="/ReduxCalendar" element={<ReduxCalendar />} />
            {/* <Route path="/documents" element={< Document/>} /> */}

            <Route
              path="/documents/:id"
              element={
                <Document employees={employees} setEmployees={setEmployees} />
              }
            />
          </Routes>
        </BrowserRouter>
      </EventProvider>
    </Provider>
  );
}

export default App;
