import { useState } from "react";
import { events } from "../data";
import EventsCard from "./EventsCard";
import { motion } from 'framer-motion'

export function Events() {

  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.status === filter;
  })

  return (
    <section id="events" className="pt-12 pb-6 px-6 bg-zinc-100">
      <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-12">Events</h2>

      <div className="flex gap-4 mb-12 justify-center">
        <p className="text-sx uppercase tracking-widest text-gray-400 self center">Filter by:</p>
        <button
          className={`px-4 py-1 text-xs uppercase tracking-widest border transition-colors ${filter === 'all' ? 'bg-black text-white' : 'border-black hover:bg-black hover:text-white'}`}
          onClick={() => setFilter("all")}>
          All
        </button>
        <button
          className={`px-4 py-1 text-xs uppercase tracking-widest border transition-colors ${filter === 'past' ? 'bg-black text-white' : 'border-black hover:bg-black hover:text-white'}`}
          onClick={() => setFilter("past")}>
          Past
        </button>
        <button
          className={`px-4 py-1 text-xs uppercase tracking-widest border transition-colors ${filter === 'upcoming' ? 'bg-black text-white' : 'border-black hover:bg-black hover:text-white'}`}
          onClick={() => setFilter("upcoming")}>
          Upcoming
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto min-h-96">
          {filteredEvents.length === 0 ? (
            <div className="flex justify-center items-center min-h-96">
              <p className="text-gray-400 text-sm uppercase tracking-widest col-span-3 text-center pt-16">No upcoming events</p>
            </div>
          ) :
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {[...filteredEvents].sort((a, b) => {
                const [dayA, monthA, yearA] = a.date.split('/')
                const [dayB, monthB, yearB] = b.date.split('/')
                return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA)
              }).map((event) => (
                <EventsCard key={event.id} event={event} />
              ))}
            </div>
          }
        </div>
      </motion.div>
    </section>
  )
}