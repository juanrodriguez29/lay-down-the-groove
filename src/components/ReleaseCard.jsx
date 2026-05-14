import { SiBandcamp } from 'react-icons/si';
import { supabase } from "../supabase";
import { motion } from "framer-motion";


const ReleaseCard = ({ release }) => {

  const { data } = supabase.storage.from('ldg-media').getPublicUrl(release.artwork);
  const imageUrl = data?.publicUrl;

  return (
    <motion.a
      href={release.bandcamp}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex flex-col">

        <div className="aspect-square bg-gray-200 relative overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={release.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          ) : null}
          <div className="absolute bottom-2 right-2 md:hidden bg-black bg-opacity-60 p-1 rounded">
            <SiBandcamp size={16} className="text-white" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.75)' }}>
            <SiBandcamp size={26} className="text-white" />
            <p className="text-white text-base tracking-widest">Buy on Bandcamp</p>
          </div>
        </div>

        <div className="pt-3">
          <h3 className="font-bold text-sm uppercase tracking-wide">{release.title}</h3>
          <p className="text-sm text-gray-600">{release.artist}</p>
          <p className="text-xs text-gray-400 mt-1">{release.year} · {release.format}</p>
        </div>
      </div>
    </motion.a>
  )
}

export default ReleaseCard;
