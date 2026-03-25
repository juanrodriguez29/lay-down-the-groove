import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ArtistsCard from "./ArtistsCard";
import { motion } from 'framer-motion'

export function Artists() {

  const [ artists, setArtists ] = useState([]);
  const [ loading, setLoading ] = useState(true);


   useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase.from('artists').select("*").order('name', { ascending: true });
      if (error) throw new Error(error.message);
      setArtists(data);
      setLoading(false);
    };
    fetchArtists()
  },[]);

  return (
    <section id="artists" className="py-16 px-6 bg-zinc-100">
      <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-12">Artists</h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {loading 
        ? (<p className="text-center text-gray-400 text-sm uppercase tracking-widest">Loading...</p>)
        : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">
          {artists.map((artist) => (
            <ArtistsCard key={artist.id} artist={artist} />
          ))}
        </div>
        }
      </motion.div>
    </section>
  )
}