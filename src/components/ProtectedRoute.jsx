import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    }
    checkSession();
  }, []);

  if (loading) return (<div className="min-h-screen bg-red-950 flex items-center justify-center">
    <p className="text-white text-xs uppercase tracking-widest">Loading...</p>
  </div>);

  if (!session) return <Navigate to="/login" />;

  return children;

}