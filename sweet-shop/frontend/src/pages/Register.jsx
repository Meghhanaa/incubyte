import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName]=useState(''), [email,setEmail]=useState(''), [password,setPassword]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      await axios.post(import.meta.env.VITE_API_BASE + '/auth/register',{ name, email, password });
      alert('Registered. Please login.');
      nav('/login');
    }catch(err){ alert('Register failed'); }
  }
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="name" className="w-full p-2 border"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="w-full p-2 border"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="password" className="w-full p-2 border"/>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Register</button>
      </form>
    </div>
  )
}
