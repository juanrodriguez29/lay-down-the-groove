import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function AdminReleases() {

  const [releases, setReleases] = useState([]);
  const [editingRelease, setEditingRelease] = useState(null);

  useEffect(() => {
    const fetchReleases = async () => {
      const { data, error } = await supabase.from('releases').select("*").order('catalog', { ascending: false });
      if (error) throw new Error(error.message)
      setReleases(data);
    };
    fetchReleases();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this release?')) return
    const deleteRelease = async () => {
      const { error } = await supabase.from('releases').delete().eq('id', id);
      if (error) throw new Error(error.message)
      setReleases(releases.filter(release => release.id !== id));
    };
    deleteRelease();
  };

  const handleEdit = (release) => {
    setEditingRelease(release);
  }

  const handleSave = async (id) => {

    if (!editingRelease.id) {
      const { data, error } = await supabase.from('releases').insert({
        catalog: editingRelease.catalog,
        title: editingRelease.title,
        artist: editingRelease.artist,
        year: editingRelease.year,
        bandcamp: editingRelease.bandcamp,
        format: editingRelease.format
      }).select('*');
      if (error) throw new Error(error.message)
      setReleases([...releases, ...data].sort((a, b) => b.catalog.localeCompare(a.catalog)));
      setEditingRelease(null);
    } else {
      const { error } = await supabase.from('releases').update({
        catalog: editingRelease.catalog,
        title: editingRelease.title,
        artist: editingRelease.artist,
        year: editingRelease.year,
        bandcamp: editingRelease.bandcamp,
        format: editingRelease.format
      }).eq('id', id);
      if (error) throw new Error(error.message)
      setReleases(releases.map(release => release.id === id ? editingRelease : release));
      setEditingRelease(null);
    }

  };


  const handleCancel = () => {
    setEditingRelease(null);
  };

  useEffect(() => {
    if (!editingRelease) return;

    const keyDownHandler = (e) => {
      if (e.key === 'Escape') handleCancel();
    };
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    }
  }, [handleCancel, editingRelease]);


  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <p className="text-2xl text-center font-bold uppercase tracking-widest mb-8">Releases Section</p>
        <button
          className="px-4 py-2 text-xs uppercase tracking-widest bg-red-950 text-white hover:bg-red-900 transition-colors"
          onClick={() => handleEdit({
            catalog: '',
            title: '',
            artist: '',
            year: '',
            bandcamp: '',
            format: ''
          })}
        >+ add release
        </button>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <table className='w-full table-fixed'>
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="text-left py-3 px-4">Catalog</th>
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Artist</th>
              <th className="text-left py-3 px-4">Year</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {releases.map((release) => (
              <tr className="border-b border-gray-200 hover:bg-gray-50" key={release.id}>
                <td className="text-left py-3 px-4">{release.catalog}</td>
                <td className="text-left py-3 px-4">{release.title}</td>
                <td className="text-left py-3 px-4">{release.artist}</td>
                <td className="text-left py-3 px-4">{release.year}</td>
                <td className="text-left py-3 px-4">
                  <button
                    className="text-xs uppercase tracking-widest text-blue-600 hover:text-blue-800 mr-4"
                    onClick={() => handleEdit(release)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs uppercase tracking-widest text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(release.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingRelease && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => handleCancel()}>
          <div className="bg-white p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6">{editingRelease.id ? 'Edit Release' : 'Add Release'}</h2>
            <div className="flex flex-col gap-4">
              <input
                value={editingRelease.catalog}
                onChange={(e) => setEditingRelease({ ...editingRelease, catalog: e.target.value })}
                placeholder="Catalog"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                value={editingRelease.title}
                onChange={(e) => setEditingRelease({ ...editingRelease, title: e.target.value })}
                placeholder="Title"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                value={editingRelease.artist}
                onChange={(e) => setEditingRelease({ ...editingRelease, artist: e.target.value })}
                placeholder="Artist"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                value={editingRelease.year}
                onChange={(e) => setEditingRelease({ ...editingRelease, year: e.target.value })}
                placeholder="Year"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                value={editingRelease.bandcamp}
                onChange={(e) => setEditingRelease({ ...editingRelease, bandcamp: e.target.value })}
                placeholder="Bandcamp"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                value={editingRelease.format}
                onChange={(e) => setEditingRelease({ ...editingRelease, format: e.target.value })}
                placeholder="Format"
                className="border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleSave(editingRelease.id)}
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
  )
}
