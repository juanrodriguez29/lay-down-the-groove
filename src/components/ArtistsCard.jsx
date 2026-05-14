import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const ArtistsCard = ({ artist }) => {

  const imageUrl = artist.photo
    ? supabase.storage.from('ldg-media').getPublicUrl(artist.photo).data?.publicUrl
    : null;

  return (
    <MotionLink
      to={`/artists/${artist.id}`}
      className="flex flex-col w-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="aspect-square bg-gray-200 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={artist.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="pt-3">
        <h3 className="font-bold text-sm uppercase tracking-wide">{artist.name}</h3>
      </div>
    </MotionLink>
  )
}

export default ArtistsCard; 