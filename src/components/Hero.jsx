import { SiSoundcloud, SiBandcamp, SiInstagram } from 'react-icons/si';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-between bg-zinc-100 pt-20 pb-12">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 pb-12 w-full items-center flex-1">


        <div className="flex flex-col items-center md:items-start justify-center gap-6">
          <img src="/Main_Logo.png" alt="Lay Down The Groove" className="w-64 md:w-96" />
          <p className="text-gray-800 text-sm md:text-base font-bold tracking-widest uppercase">Record Label & Artist · Melbourne</p>

        </div>


        <div className="flex items-center justify-center">
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2124578295&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
          </iframe>
        </div>

      </div>
      <div className="flex flex-col items-center gap-6">
        <button className="border-2 border-black text-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
          Explore Releases
        </button>
        <div className="flex gap-6">
          <a href="https://instagram.com/laydownthegroove" target="_blank" rel="noopener noreferrer"
            className="text-gray-800 hover:text-black transition-colors">
            <SiInstagram size={20} />
          </a>
          <a href="https://soundcloud.com/lay-down-the-groove" target="_blank" rel="noopener noreferrer"
            className="text-gray-800 hover:text-black transition-colors">
            <SiSoundcloud size={20} />
          </a>
          <a href="https://laydownthegroove.bandcamp.com" target="_blank" rel="noopener noreferrer"
            className="text-gray-800 hover:text-black transition-colors">
            <SiBandcamp size={20} />
          </a>
        </div>
      </div>


    </section>


  )
}

/*<section className="bg-cover bg-no-repeat min-h-screen flex flex-col items-center justify-center gap-6 bg-zinc-100">
     <img src="/Main_Logo.png" alt="Lay Down The Groove" className="w-64 md:w-96" />
     <p className="text-gray-800 text-base font-bold tracking-widest uppercase">Record Label & Artist · Melbourne</p>
     <button className="border-2 border-black text-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
       Explore Releases
     </button>
     <div className="flex gap-6 mt-2">
       <a href="https://instagram.com/laydownthegroove" target="_blank" rel="noopener noreferrer"
         className="text-gray-800 hover:text-black transition-colors">
         <SiInstagram size={20} />
       </a>
       <a href="https://soundcloud.com/lay-down-the-groove" target="_blank" rel="noopener noreferrer"
         className="text-gray-800 font-bold text-sm tracking-widest hover:text-black transition-colors uppercase">
         <SiSoundcloud size={20} />
       </a>
       <a href="https://laydownthegroove.bandcamp.com" target="_blank" rel="noopener noreferrer"
         className="text-gray-800 font-bold text-sm tracking-widest hover:text-black transition-colors uppercase">
         <SiBandcamp size={20} />
       </a>
     </div>
     <div className="w-full max-w-md">
       <iframe
         width="100%"
         height="300"
         scrolling="no"
         frameBorder="no"
         allow="autoplay"
         src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2124578295&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
       </iframe>
     </div>
   </section>*/