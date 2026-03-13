const ArtistsCard = ({ artist }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="aspect-square bg-gray-200 overflow-hidden">
        {artist.photo ? (
          <img src={artist.photo} alt={artist.name} className="w-full h-full object-cover" />)
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