import { useState, useEffect } from "react";
import { supabase } from "../supabase"; 
import EventsCard from "./EventsCard";
import { motion, useReducedMotion } from 'framer-motion'

const EventSkeleton = () => (
  <div className="flex flex-col w-full">
    <div className="aspect-square bg-gray-200 motion-safe:animate-pulse" />
    <div className="pt-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded motion-safe:animate-pulse w-3/4" />
      <div className="h-3 bg-gray-200 rounded motion-safe:animate-pulse w-1/2" />
    </div>
  </div>
);

export function Events() {

  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
      if (error) { setFetchError('Failed to load events.'); setLoading(false); return; }
      setEvents(data);
      setLoading(false);
    }
    fetchEvents()
  }, []);
  
  

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.status === filter;
  })

  return (
    <section id="events" className="pt-12 pb-6 px-6 bg-zinc-100">
      <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-12">Events</h2>

      <div className="flex gap-4 mb-12 justify-center">
        <p className="text-xs uppercase tracking-widest text-gray-400 self-center">Filter by:</p>
        <button
          className={`px-4 py-3.5 text-xs uppercase tracking-widest border transition-colors cursor-pointer ${filter === 'all' ? 'bg-black text-white' : 'border-black hover:bg-black hover:text-white'}`}
          onClick={() => setFilter("all")}>
          All
        </button>
        <button
          className={`px-4 py-3.5 text-xs uppercase tracking-widest border transition-colors cursor-pointer ${filter === 'past' ? 'bg-black text-white' : 'border-black hover:bg-black hover:text-white'}`}
          onClick={() => setFilter("past")}>
          Past
        </button>
        <button
          className={`px-4 py-3.5 text-xs uppercase tracking-widest border transition-colors cursor-pointer ${filter === 'upcoming' ? 'bg-black text-white' : 'border-black hover:bg-black hover:text-white'}`}
          onClick={() => setFilter("upcoming")}>
          Upcoming
        </button>
      </div>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {fetchError
        ? <p className="text-center text-sm uppercase tracking-widest text-gray-500">{fetchError}</p>
        : loading
        ? <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => <EventSkeleton key={i} />)}
          </div>
        : <div className="max-w-6xl mx-auto min-h-96">
          {filteredEvents.length === 0 ? (
            <div className="flex justify-center items-center min-h-96">
              <p className="text-gray-400 text-sm uppercase tracking-widest col-span-3 text-center pt-16">No upcoming events</p>
            </div>
          ) :
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <EventsCard key={event.id} event={event} />
              ))}
            </div>
          }
        </div>
}
      </motion.div>
    </section>
  )
}