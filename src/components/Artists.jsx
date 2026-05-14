import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ArtistsCard from "./ArtistsCard";
import { motion, useReducedMotion } from 'framer-motion'

const ArtistSkeleton = () => (
  <div className="flex flex-col w-full">
    <div className="aspect-square bg-gray-200 motion-safe:animate-pulse" />
    <div className="pt-3">
      <div className="h-3 bg-gray-200 rounded motion-safe:animate-pulse w-2/3" />
    </div>
  </div>
);

export function Artists() {

  const [ artists, setArtists ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const prefersReducedMotion = useReducedMotion();


   useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase.from('artists').select("*").order('name', { ascending: true });
      if (error) { setFetchError('Failed to load artists.'); setLoading(false); return; }
      setArtists(data);
      setLoading(false);
    };
    fetchArtists()
  },[]);

  return (
    <section id="artists" className="py-16 px-6 bg-zinc-100">
      <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-12">Artists</h2>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {fetchError
        ? <p className="text-center text-sm uppercase tracking-widest text-gray-500">{fetchError}</p>
        : loading
        ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => <ArtistSkeleton key={i} />)}
          </div>
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