const EventsCard = ({ event }) => {
  return (
    <div className="flex flex-col">
      
        {event.photo ? (
          <img src={event.photo} alt={event.name} className="w-full h-full object-cover" />)
          : null
        }
      
      <div className="pt-3">
        <p className="text-sm text-gray-600">{event.date}</p>
      </div>
    </div>
  )
}

export default EventsCard;