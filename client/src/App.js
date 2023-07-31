import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminScreen from './components/AdminScreen.js';
import ClientScreen from './components/ClientScreen.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ClientScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
