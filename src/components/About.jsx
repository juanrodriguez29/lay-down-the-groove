export function About() {
  return (
    <section className="py-16 px-6 bg-zinc-100 flex flex-col pb-32">
      <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-16">About</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
        <div>
          <p className="text-gray-800  text-sm md:text-base leading-relaxed tracking-wide">
            Lay Down The Groove is a DJ and production duo based in Naarm/Melbourne, originally from Bogotá, Colombia. Active since 2014, their sound blends deep house, electro, and percussive club rhythms, always guided by groove, emotion, and narrative flow. Alongside their dynamic DJ sets, LDG also runs a vinyl-focused label and party series supporting emerging and established talent. In 2025, they released ChordPlay — their debut full-length album and a milestone in their ongoing journey through electronic music.
          </p>
        </div>
        <div>
          <img src="/Artists/about.jpg" alt="Lay Down The Groove" className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  )
}

