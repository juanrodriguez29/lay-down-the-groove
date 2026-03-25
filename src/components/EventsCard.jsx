import { supabase } from "../supabase";

const EventsCard = ({ event }) => {

  const imageUrl = event.photo
    ? supabase.storage.from('ldg-media').getPublicUrl(event.photo).data?.publicUrl
    : null;

  return (

    
    <div className="flex flex-col">

      {event.photo ? (
        <img src={imageUrl} alt={event.name} className="aspect-[3/4] w-full h-full object-cover" />)
        : null
      }

      <div className="pt-3">
        <h3 className="font-bold text-sm uppercase tracking-wide">{event.name}</h3>
        <p className="text-sm text-gray-600">
          {new Date(event.date).toLocaleDateString('en-AU')}
        </p>
      </div>
    </div>
  )
}

export default EventsCard;