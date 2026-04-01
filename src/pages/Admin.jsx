import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { AdminReleases } from '../admin/AdminReleases';
import { AdminArtists } from '../admin/AdminArtists';
import { AdminEvents } from '../admin/AdminEvents';


export function Admin() {

  const [activeSection, setActiveSection] = useState('releases');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Logout error:', error);
    };
    navigate('/login');
  }



  return (
    <div className="flex min-h-screen">
      <nav className="w-64 flex flex-col bg-red-950 text-white p-6 tracking-widest uppercase justify-between sticky top-0 h-screen">
        <div className="flex flex-col items-center gap-6">
          <img src="/Alternate_Logo_No_Text.png" alt="Lay Down The Groove" className="h-20 invert" />
          <button
            className={`hover:text-gray-400 transition-colors ${activeSection === 'releases' ? 'text-white font-bold underline' : 'text-gray-400'}`} onClick={() => setActiveSection('releases')}>Releases</button>
          <button
            className={`hover:text-gray-400 transition-colors ${activeSection === 'artists' ? 'text-white font-bold underline' : 'text-gray-400'}`} onClick={() => setActiveSection('artists')}>Artists</button>
          <button
            className={`hover:text-gray-400 transition-colors ${activeSection === 'events' ? 'text-white font-bold underline' : 'text-gray-400'}`} onClick={() => setActiveSection('events')}>Events</button>
          <button
            className={`hover:text-gray-400 transition-colors ${activeSection === 'subscribers' ? 'text-white font-bold underline' : 'text-gray-400'}`} onClick={() => setActiveSection('subscribers')}>Subscribers</button>
        </div>
        <button
          className="text-white hover:text-gray-400 transition-colors"
          onClick={handleLogout}
        >Log Out
        </button>
      </nav>
      <div className="flex-1 bg-zinc-100 p-6">
        {activeSection === 'releases' && (
          <AdminReleases />
        )}
        {activeSection === 'artists' && (
          <AdminArtists />
        )}
        {activeSection === 'events' && (
          <AdminEvents />
        )}
        {activeSection === 'subscribers' && <p>Subscribers Section</p>}

      </div>

    </div>
  );
}