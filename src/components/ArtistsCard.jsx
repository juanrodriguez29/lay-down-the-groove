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
      className="block group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex flex-col bg-zinc-100">

        {/* Artwork */}
        <div className="aspect-square relative overflow-hidden bg-zinc-900">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={artist.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:grayscale transition-all duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {/* Red accent rule */}
        <div className="h-[2px] w-full" style={{ background: '#450a0a' }} />

        {/* Name */}
        <div className="px-3 pt-3 pb-4">
          <h3
            className="font-bold text-sm uppercase tracking-wide"
            style={{ fontFamily: "'DM Mono', sans-serif" }}
          >
            {artist.name}
          </h3>
        </div>

      </div>
    </MotionLink>
  );
};

export default ArtistsCard;
