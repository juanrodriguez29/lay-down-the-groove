import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function AdminArtists() {

  const [artists, setArtists] = useState([]);
  const [editingArtist, setEditingArtist] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase.from('artists').select("*").order('name', { ascending: true });
      if (error) throw new Error(error.message)
      setArtists(data);
    };
    fetchArtists();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this artist?')) return
    const deleteArtist = async () => {
      const { error } = await supabase.from('artists').delete().eq('id', id);
      if (error) throw new Error(error.message)
      setArtists(artists.filter(artist => artist.id !== id));
    };
    deleteArtist();
  };

  const handleEdit = (artist) => {
    setEditingArtist(artist);
  }

  const handleSave = async (id) => {

    let artWorkPath = editingArtist.photo;

    if (file) {
      const fileName = `artist-photos/${Date.now()}-${file.name}`;
      const { error: updateError } = await supabase.storage.from('ldg-media').upload(fileName, file);
      if (updateError) throw new Error(updateError.message);
      artWorkPath = fileName;
    };

    if (!file && !editingArtist.artwork) {
      alert('Please upload a photo for the artist.');
      return;
    }

    if (!editingArtist.id) {
      const { data, error } = await supabase.from('artists').insert({
        name: editingArtist.name,
        photo: artWorkPath
      }).select('*');
      if (error) throw new Error(error.message)
      setArtists([...artists, ...data].sort((a, b) => a.name.localeCompare(b.name)));
      setEditingArtist(null);
    } else {
      const { error } = await supabase.from('artists').update({
        name: editingArtist.name,
        photo: artWorkPath
      }).eq('id', id);
      if (error) throw new Error(error.message)
      setArtists(artists.map(artist => artist.id === id ? editingArtist : artist));
      setEditingArtist(null);
    }

  };

  const handleCancel = () => {
    setEditingArtist(null);
  };

  useEffect(() => {
    if (!editingArtist) return;

    const keyDownHandler = (e) => {
      if (e.key === 'Escape') setEditingArtist(null);
    };
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    }
  }, [editingArtist]);


  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <p className="text-2xl text-center font-bold uppercase tracking-widest mb-8">Artists Section</p>
        <button
          className="px-4 py-2 text-xs uppercase tracking-widest bg-red-950 text-white hover:bg-red-900 transition-colors"
          onClick={() => handleEdit({
            name: '',
          })}
        >+ add artist
        </button>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <table className='w-full table-fixed'>
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr className="border-b border-gray-200 hover:bg-gray-50" key={artist.id}>
                <td className="text-left py-3 px-4">{artist.name}</td>
                <td className="text-left py-3 px-4">
                  <button
                    className="text-xs uppercase tracking-widest text-blue-600 hover:text-blue-800 mr-4"
                    onClick={() => handleEdit(artist)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs uppercase tracking-widest text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(artist.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingArtist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => handleCancel()}>
          <div className="bg-white p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6">{editingArtist.id ? 'Edit Artist' : 'Add Artist'}</h2>
            <div className="flex flex-col gap-4">
              <input
                value={editingArtist.name}
                onChange={(e) => setEditingArtist({ ...editingArtist, name: e.target.value })}
                placeholder="Name"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                id="photo-upload"
                type="file"
                accpet="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="border border-gray-300 px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 block text-center"
              >
                {file ? file.name : 'Upload Photo'}
              </label>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleSave(editingArtist.id)}
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
