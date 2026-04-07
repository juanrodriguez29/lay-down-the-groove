import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function AdminSubscribers() {

  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const { data, error } = await supabase.from('subscribers').select("*").order('created_at', { ascending: false });
      if (error) throw new Error(error.message)
      setSubscribers(data);
    };
    fetchSubscribers();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return
    const deleteSubscribers = async () => {
      const { error } = await supabase.from('subscribers').delete().eq('id', id);
      if (error) throw new Error(error.message)
      setSubscribers(subscribers.filter(subscriber => subscriber.id !== id));
    };
    deleteSubscribers();
  };

  return (
    <>
      <p className="text-2xl  font-bold uppercase tracking-widest mb-8">Subscribers Section</p>
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <table className='w-full table-fixed'>
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Date subscribed</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr className="border-b border-gray-200 hover:bg-gray-50" key={subscriber.id}>
                <td className="text-left py-3 px-4">{subscriber.email}</td>
                <td className="text-left py-3 px-4">{new Date(subscriber.created_at).toLocaleDateString('en-AU')}</td>
                <td className="text-left py-3 px-4">
                  <button
                    className="text-xs uppercase tracking-widest text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(subscriber.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
