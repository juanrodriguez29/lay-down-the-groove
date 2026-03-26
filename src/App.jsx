import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Releases } from './components/Releases';
import { Artists } from './components/Artists';
import { Events } from './components/Events';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';

function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Releases />
      <Artists />
      <Events />
      <About />
      <Footer />
    </div>
  )
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<div>Admin page comming soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}
