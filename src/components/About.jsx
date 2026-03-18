import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="py-16 px-6 bg-zinc-100 flex flex-col pb-24">
      <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-12">About</h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div>
            <p className="text-gray-800  text-sm md:text-base leading-relaxed tracking-wide max-w-prose">
              Lay Down The Groove is a DJ and production duo based in Naarm/Melbourne, originally from Bogotá, Colombia. Active since 2014, their sound blends deep house, electro, and percussive club rhythms, always guided by groove, emotion, and narrative flow. Alongside their dynamic DJ sets, LDG also runs a vinyl-focused label and party series supporting emerging and established talent. In 2025, they released ChordPlay — their debut full-length album and a milestone in their ongoing journey through electronic music.
            </p>
          </div>
          <div>
            <img src="/Artists/about.jpg" alt="Lay Down The Groove" className="w-full h-auto object-cover" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/*
<div className="flex items-center justify-center">
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2124578295&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
          </iframe>
        </div>*/