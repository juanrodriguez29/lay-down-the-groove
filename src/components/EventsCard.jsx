import { supabase } from "../supabase";

const EventsCard = ({ event }) => {

  const imageUrl = event.photo
    ? supabase.storage.from('ldg-media').getPublicUrl(event.photo).data?.publicUrl
    : null;

  const cardContent = (
    <div className="flex flex-col w-full">
      <div className="bg-gray-200 overflow-hidden">
        {event.photo ? (
          <img src={imageUrl} alt={event.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />)
          : null
        }
      </div>
      <div className="pt-3">
        <h3 className="font-bold text-sm uppercase tracking-wide">{event.name}</h3>
        <p className="text-sm text-gray-600">
          {new Date(event.date).toLocaleDateString('en-AU')}
        </p>
      </div>
    </div>
  );

  return event.booking_link
    ? <a href={event.booking_link} target="_blank" rel="noopener noreferrer" className="block group">{cardContent}</a>
    : <div>{cardContent}</div>;
}

export default EventsCard;