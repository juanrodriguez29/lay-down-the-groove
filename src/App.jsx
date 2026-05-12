import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Marquee } from './components/Marquee';
import { Hero } from './components/Hero';
import { Releases } from './components/Releases';
import { Artists } from './components/Artists';
import { Events } from './components/Events';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { ArtistPage } from './pages/ArtistPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="pt-20">
        <Marquee items={[
          'New release out now',
          'LDG012 Unearthed Archives 2016 - 2020 available on Bandcamp',
        ]} />
        <Hero />
        <Releases />
        <Artists />
        <Events />
        <About />
        <Footer />
      </div>
    </div>
  )
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>} />
        <Route path="/artists/:id" element={<ArtistPage />} />
      </Routes>
    </BrowserRouter>
  )
}
