import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero} from './components/Hero';
import { Releases } from './components/Releases';
import { Artists } from './components/Artists';
import { Events } from './components/Events';

export default function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Releases />
      <Artists />
      <Events />
    </div>
  )
}
