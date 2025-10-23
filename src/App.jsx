// import { useState } from "react";
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtisanGenerator from "./components/ArtisanGenerator";
import Sidebar from "./components/Sidebar";
import CrudGenerator from "./components/CrudGenerator";
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="main-grid">
        <Sidebar />
        <div className="content flex-fill p-4">
          <Routes>
            <Route path="/artisan-generator" element={<ArtisanGenerator />} />
            <Route path="/crud-generator" element={<CrudGenerator />} />
            <Route path="/" element={<Home />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
