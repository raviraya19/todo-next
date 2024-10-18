import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </HashRouter>
  );
};

export default App;
