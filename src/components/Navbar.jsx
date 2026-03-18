import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-red-950 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#hero">
          <img src="Alternate_Logo_No_Text.png" alt="Lay Down The Groove" className="h-20 invert" />
        </a>
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
        <div
          className="font-bebas md:hidden bg-black/90 fixed inset-0 z-50 flex flex-col text-white text-4xl tracking-widest items-center justify-center gap-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false)
          }}
        >
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white">
            <X size={24} />
          </button>
          <img src="/Alternate_Logo_No_Text.png" alt="LDG" className="h-16 w-auto invert mb-8" />
          <a href="#releases" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Releases</a>
          <a href="#artists" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Artists</a>
          <a href="#events" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#about" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>About</a>
        </div>
      )}
    </nav>
  );
} 