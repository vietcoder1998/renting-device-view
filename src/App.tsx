import React from "react";
import "./App.css";
import { AppContext } from ".";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  const appContext = React.useContext(AppContext);
  const socket = appContext.socket;

  React.useEffect(() => {
    // Set up socket event listeners
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("error", (reason: Error) => {
      alert("Socket connected error " + reason);
    });

    // Cleanup when the component is unmounted
    return () => {
      socket.off("connect");
      socket.off("error");
    };
  }, [socket]);

  return (
    <Router> {/* Wrap the Routes in a Router component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
