import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function AdminReleaseNotes() {

  const [releases, setReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [vibeNotes, setVibeNotes] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReleases = async () => {
      const { data, error } = await supabase.from('releases').select("*").order('catalog', { ascending: false });
      if (error) throw new Error(error.message)
      setReleases(data);
    };
    fetchReleases();
  }, []);

  const handleGenerate = async () => {

    if (!selectedRelease) {
      alert('Please select a release from the dropdown menu');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('generate-release-notes', { body: { release: selectedRelease, vibeNotes } });
    if (error) throw new Error(error.message)
    const sections = data.result.split('---')
    setGeneratedNotes(sections);
    setLoading(false);
  }

  return (
    <>
      <p className="text-2xl font-bold uppercase tracking-widest mb-8">Release Notes</p>

      <div className="flex flex-col gap-4 w-full  p-8 max-w-2xl mx-auto">
        <select
          onChange={(e) => setSelectedRelease(releases.find(r => r.id === parseInt(e.target.value)))}
          className="appearance-none border border-gray-300 px-4 py-2 text-sm w-full">
          <option value="">Select a release</option>
          {releases.map((release) => (
            <option key={release.id} value={release.id}>{release.title}</option>
          ))}
        </select>

        <textarea
          onChange={(e) => setVibeNotes(e.target.value)}
          value={vibeNotes}
          placeholder="Type some vibe notes for your release"
          className="border border-gray-300 px-4 py-2 text-sm h-32 resize-none"
        />

        <button
          className="px-4 py-2 text-xs uppercase tracking-widest bg-red-950 text-white hover:bg-red-900 transition-colors disabled:opacity-50"
          onClick={handleGenerate}
          disabled={loading}>
          {loading ? 'Generating' : 'Generate Notes'}
        </button>

        {generatedNotes.length > 0 && (
          <div className="flex flex-col gap-6 mt-6">
            {generatedNotes.map((section, index) => (
              <div key={index} className="p-4 border border-gray-200 bg-gray-50">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(section)}
                    className="text-xs uppercase tracking-widest text-red-950 hover:text-red-700 transition-colors">
                    Copy
                  </button>
                </div>
                <p className="text-sm whitespace-pre-wrap">{section}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </>
  )
}
