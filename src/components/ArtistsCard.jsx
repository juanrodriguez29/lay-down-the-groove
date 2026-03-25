import { supabase } from "../supabase";
const ArtistsCard = ({ artist }) => {

  const imageUrl = artist.photo 
  ? supabase.storage.from('ldg-media').getPublicUrl(artist.photo).data?.publicUrl 
  : null;

  return (
    <div className="flex flex-col w-full">
      <div className="aspect-square bg-gray-200 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={artist.name} className="w-full h-full object-cover" />)
          : null
        }
      </div>
      <div className="pt-3">
        <h3 className="font-bold text-sm uppercase tracking-wide">{artist.name}</h3>
      </div>
    </div>
  )
}

export default ArtistsCard; 