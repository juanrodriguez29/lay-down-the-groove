import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

export function Navbar() {

  const [ menuOpen, setMenuOpen ] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-red-950 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <img src="Alternate_Logo_No_Text.png" alt="Lay Down The Groove" className="h-20 invert" />
        <ul className=" hidden md:flex space-x-4 text-white  tracking-widest">
          <li><a href="#releases" className="hover:text-gray-400">Releases</a></li>
          <li><a href="#artists" className="hover:text-gray-400">Artists</a></li>
          <li><a href="#events" className="hover:text-gray-400">Events</a></li>
          <li><a href="#about" className="hover:text-gray-400">About</a></li>
        </ul>
        <button className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}  
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-red-950 flex flex-col text-white tracking-widest space-y-4  pb-6 px-8 w-1/3 absolute right-0 top-full border-l border-red-800">
          <a href="#releases" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Releases</a>
          <a href="#artists" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Artists</a>
          <a href="#events" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#about" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>About</a>
        </div>
      )}
    </nav>
  );
} 