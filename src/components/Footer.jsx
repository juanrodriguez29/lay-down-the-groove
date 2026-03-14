import { SiSoundcloud, SiBandcamp, SiInstagram } from 'react-icons/si';

export function Footer() {

  return (
    <footer className="bg-red-950 px-4">
  <div className="container mx-auto flex flex-col items-center gap-8 py-12">
    
    {/* Social icons */}
    <div className="flex gap-6">
      <a href="https://instagram.com/laydownthegroove" target="_blank" rel="noopener noreferrer"
        className="text-white hover:text-gray-400 transition-colors">
        <SiInstagram size={20} />
      </a>
      <a href="https://soundcloud.com/lay-down-the-groove" target="_blank" rel="noopener noreferrer"
        className="text-white hover:text-gray-400 transition-colors">
        <SiSoundcloud size={20} />
      </a>
      <a href="https://laydownthegroove.bandcamp.com" target="_blank" rel="noopener noreferrer"
        className="text-white hover:text-gray-400 transition-colors">
        <SiBandcamp size={20} />
      </a>
    </div>

    {/* Subscribe */}
    <div className="flex items-center gap-2">
      <label className="text-white text-xs tracking-widest">Subscribe:</label>
      <input type="email" placeholder="Enter your email" className="px-4 py-1 text-xs bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none" />
      <button className="px-4 py-1 text-xs uppercase tracking-widest bg-white text-red-950 hover:bg-gray-200 transition-colors">Subscribe</button>
    </div>

    {/* Copyright */}
    <p className="text-gray-400 text-xs tracking-widest">© 2025 Lay Down The Groove. All rights reserved.</p>

  </div>
</footer>
  );
} 