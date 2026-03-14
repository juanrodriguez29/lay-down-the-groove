import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero} from './components/Hero';
import { Releases } from './components/Releases';
import { Artists } from './components/Artists';
import { Events } from './components/Events';
import { About } from './components/About'; 
import { Footer } from './components/Footer';

export default function App() {
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
}
