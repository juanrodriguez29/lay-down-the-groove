import { useState } from 'react';
import { supabase } from '../supabase';
import { SiSoundcloud, SiBandcamp, SiInstagram } from 'react-icons/si';


export function Footer() {

  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    if (!email) return;
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);
    if (error) {
      console.log('Supabase error:', error)
      alert('Something went wrong. Please try again.');
    } else {
      alert('Thanks for subscribing!')
      setEmail('');
    }
  };

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
        <div className="flex flex-col md:flex-row items-center gap-4">
          <label className="text-white text-xs tracking-widest">Subscribe:</label>
          <input 
            type="email"
            placeholder="Enter your email"
            className="text-center px-4 py-1 text-xs bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="px-4 py-1 text-xs uppercase tracking-widest bg-white text-red-950 hover:bg-gray-200 transition-colors">Subscribe</button>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-xs tracking-widest">© 2026 Lay Down The Groove. All rights reserved.</p>

      </div>
    </footer>
  );
} 