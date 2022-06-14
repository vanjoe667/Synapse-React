import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bridge from './pages/Bridge';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/bridge" element={<Bridge/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
