import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log('Supabase login error:', error);
      alert('Login failed. Please check your credentials and try again.');
    } else {
      navigate('/admin');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <section id="login" className="py-16 px-6 bg-red-950 flex flex-col items-center justify-center pb-24 min-h-screen">
      <img src="Alternate_Logo_No_Text.png" alt="Lay Down The Groove" className="h-24 invert mb-8" />
      <h2 className="text-3xl text-white font-bold uppercase tracking-widest text-center mb-12">Login</h2>
      <div className="flex flex-col gap-4 w-full max-w-sm border border-white p-8">
        <label className="text-white text-xs tracking-widest">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="text-center px-4 py-1 text-xs bg-transparent border border-white text-white placeholder:text-gray-400 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-white text-xs tracking-widest">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="text-center px-4 py-1 text-xs bg-transparent border border-white text-white placeholder:text-gray-400 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="mt-4 px-4 py-1 text-xs uppercase tracking-widest bg-white text-red-950 hover:bg-gray-200 transition-colors">Login</button>
      </div>
    </section>
  )
}