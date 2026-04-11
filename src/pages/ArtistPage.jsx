
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function ArtistPage() {

  const [artist, setArtist] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtist = async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      setArtist(data);
    };
    fetchArtist();
  }, [id]);

  if (!artist) return <p className="text-center text-gray-400 m-auto text-sm uppercase tracking-widest mt-32">Loading...</p>

  const imageUrl = artist.photo
    ? supabase.storage.from('ldg-media').getPublicUrl(artist.photo).data?.publicUrl
    : null

  

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="px-6 bg-zinc-100 min-h-screen pt-24 pb-16 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-6xl mx-auto items-start w-full">
          
          <div className={`aspect-square overflow-hidden ${artist.soundcloud ? 'max-w-md' : 'w-full self-center'}`}>
            <img src={imageUrl} alt={artist.name} className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold uppercase tracking-widest mt-6 mb-4">{artist.name}</h2>
            <p className="text-gray-800 text-sm md:text-base leading-relaxed tracking-wide max-w-prose">{artist.bio}</p>
            {artist.youtube && (
              <div className="md:col-span-2 mt-6">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src={artist.youtube}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
          {artist.soundcloud && (
            <div className="md:col-span-2">
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={artist.soundcloud}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


