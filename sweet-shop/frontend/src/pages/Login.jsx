import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState(''), [password,setPassword]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      const r = await axios.post(import.meta.env.VITE_API_BASE + '/auth/login',{ email, password });
      localStorage.setItem('token', r.data.token);
      nav('/');
    }catch(err){ alert('Login failed'); }
  }
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="w-full p-2 border"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="password" className="w-full p-2 border"/>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
