import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function AdminEvents() {

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select("*").order('date', { ascending: false });
      if (error) throw new Error(error.message)
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return
    const deleteEvent = async () => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw new Error(error.message)
      setEvents(events.filter(event => event.id !== id));
    };
    deleteEvent();
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  }

  const handleSave = async (id) => {

    let artWorkPath = editingEvent.photo;

    if (file) {
      const fileName = `event-flyers/${Date.now()}-${file.name}`;
      const { error: updateError } = await supabase.storage.from('ldg-media').upload(fileName, file);
      if (updateError) throw new Error(updateError.message);
      artWorkPath = fileName;
    };

    if (!file && !editingEvent.artwork) {
      alert('Please upload a flyer for the event.');
      return;
    }

    if (!editingEvent.id) {
      const { data, error } = await supabase.from('events').insert({
        name: editingEvent.name,
        date: editingEvent.date,
        status: editingEvent.status,
        photo: artWorkPath,
        country: editingEvent.country,
      }).select('*');
      if (error) throw new Error(error.message)
      setEvents([...events, ...data].sort((a, b) => b.date.localeCompare(a.date)));
      setEditingEvent(null);
    } else {
      const { error } = await supabase.from('events').update({
        name: editingEvent.name,
        date: editingEvent.date,
        status: editingEvent.status,
        photo: artWorkPath,
        country: editingEvent.country,
      }).eq('id', id);
      if (error) throw new Error(error.message)
      setEvents(events.map(event => event.id === id ? editingEvent : event));
      setEditingEvent(null);
      setFile(null);
    }

  };


  const handleCancel = () => {
    setEditingEvent(null);
  };

  useEffect(() => {
    if (!editingEvent) return;

    const keyDownHandler = (e) => {
      if (e.key === 'Escape') setEditingEvent(null);
    };
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [editingEvent]);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <p className="text-2xl text-center font-bold uppercase tracking-widest mb-8">Events Section</p>
        <button
          className="px-4 py-2 text-xs uppercase tracking-widest bg-red-950 text-white hover:bg-red-900 transition-colors"
          onClick={() => handleEdit({
            name: '',
            date: '',
            status: '',
            country: ''
          })}
        >+ add event
        </button>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <table className='w-full table-fixed'>
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Country</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr className="border-b border-gray-200 hover:bg-gray-50" key={event.id}>
                <td className="text-left py-3 px-4">{event.name}</td>
                <td className="text-left py-3 px-4">{event.date}</td>
                <td className="text-left py-3 px-4">{event.status}</td>
                <td className="text-left py-3 px-4">{event.country}</td>
                <td className="text-left py-3 px-4">
                  <button
                    className="text-xs uppercase tracking-widest text-blue-600 hover:text-blue-800 mr-4"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs uppercase tracking-widest text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => handleCancel()}>
          <div className="bg-white p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6">{editingEvent.id ? 'Edit Event' : 'Add Event'}</h2>
            <div className="flex flex-col gap-4">
              <input
                value={editingEvent.name}
                onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                placeholder="Name"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                value={editingEvent.date}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                placeholder="date"
                className="border border-gray-300 px-4 py-2 text-sm"
                type="date"
              />
              <input
                value={editingEvent.country}
                onChange={(e) => setEditingEvent({ ...editingEvent, country: e.target.value })}
                placeholder="Country"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
              <select
                value={editingEvent.status}
                onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                placeholder="Status"
                className="border border-gray-300 px-4 py-2 text-sm"
              >
                <option value="">Select Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
              <input
                id="artwork-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="artwork-upload"
                className="border border-gray-300 px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 block text-center"
              >
                {file ? file.name : 'Upload Artwork'}
              </label>

            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleSave(editingEvent.id)}
                className="px-4 py-2 flex-1 text-xs uppercase tracking-widest bg-red-950 text-white hover:bg-red-900 transition-colors">
                Save
              </button>
              <button
                onClick={() => handleCancel()}
                className="px-4 py-2 text-xs flex-1 uppercase tracking-widest border border-gray-300 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
