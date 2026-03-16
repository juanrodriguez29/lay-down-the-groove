import { SiBandcamp } from 'react-icons/si';

const ReleaseCard = ({ release }) => {
  return (
    <a href={release.link} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="flex flex-col">

        <div className="aspect-square bg-gray-200 relative overflow-hidden">
          {release.artwork ? (
            <img src={release.artwork} alt={release.title} className="w-full h-full object-cover" />)
            : null
          }
          <div className="absolute bottom-2 right-2 md:hidden bg-black bg-opacity-60 p-1 rounded">
            <SiBandcamp size={16} className="text-white" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-60 transition-opacity">
            <p className="text-white text-base tracking-widest">Buy on Bandcamp</p>
          </div>
        </div>


        <div className="pt-3">
          <h3 className="font-bold text-sm uppercase tracking-wide">{release.title}</h3>
          <p className="text-sm text-gray-600">{release.artist}</p>
          <p className="text-xs text-gray-400 mt-1">{release.year} · {release.format}</p>
        </div>
      </div>
    </a>

  )
}

export default ReleaseCard;