import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ReleaseCard from "./ReleaseCard";
import { motion, useReducedMotion } from "framer-motion";

const ReleaseSkeleton = () => (
  <div className="flex flex-col w-full">
    <div className="aspect-square bg-gray-200 motion-safe:animate-pulse" />
    <div className="pt-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded motion-safe:animate-pulse w-3/4" />
      <div className="h-3 bg-gray-200 rounded motion-safe:animate-pulse w-1/2" />
      <div className="h-2 bg-gray-200 rounded motion-safe:animate-pulse w-1/3" />
    </div>
  </div>
);

export function Releases() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const fetchReleases = async () => {
      const { data, error } = await supabase.from('releases').select("*").order('catalog', { ascending: false });
      if (error) { setFetchError('Failed to load releases.'); setLoading(false); return; }
      setReleases(data);
      setLoading(false);
    };
    fetchReleases()
  }, []);



  return (
    <section id="releases" className="py-16 px-6 bg-zinc-100">
      <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-12">Releases</h2>
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
              {Array.from({ length: 8 }).map((_, i) => <ReleaseSkeleton key={i} />)}
            </div>
          : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">
            {releases.map((release) => (
              <ReleaseCard key={release.id} release={release} />
            ))}
          </div>
        }
      </motion.div>
    </section>
  )
}



