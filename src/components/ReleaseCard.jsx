const ReleaseCard = ({ release }) => {
  return (
    <div className="flex flex-col">
      <a href={release.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="aspect-square bg-gray-200">
          {release.artwork ? (
            <img src={release.artwork} alt={release.title} className="w-full h-full object-cover" />)
            : null
          }
        </div>
      </a>
      <div className="pt-3">
        <h3 className="font-bold text-sm uppercase tracking-wide">{release.title}</h3>
        <p className="text-sm text-gray-600">{release.artist}</p>
        <p className="text-xs text-gray-400 mt-1">{release.year} · {release.format}</p>
      </div>
    </div>
  )
}

export default ReleaseCard;