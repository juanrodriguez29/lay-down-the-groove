
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function ArtistPage() {

  console.log('ArtistPage component mounted')

  const [artist, setArtist] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtist = async () => {
      console.log('fetching artist with id:', id)
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', id)
        .single();

      console.log('data:', data)
      console.log('error:', error)
      if (error) throw new Error(error.message);
      setArtist(data);
    };
    fetchArtist();
  }, [id]);


  if (!artist) return <p className="text-center text-gray-400 text-sm uppercase tracking-widest mt-32">Loading...</p>

  const imageUrl = artist.photo
    ? supabase.storage.from('ldg-media').getPublicUrl(artist.photo).data?.publicUrl
    : null

  console.log('imageUrl:', imageUrl)

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="px-6 bg-zinc-100 min-h-screen pt-24 pb-16 flex items-center">
        {artist ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
            <div className="aspect-square overflow-hidden max-w-md">
              <img src={imageUrl} alt={artist.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">{artist.name}</h2>
              <p className="text-gray-800 text-sm md:text-base leading-relaxed tracking-wide max-w-prose">{artist.bio}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest">Loading...</p>
        )}
      </div>
    </div>
  )
}