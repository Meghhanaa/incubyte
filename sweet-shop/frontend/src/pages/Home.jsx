import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Home(){
  const [sweets, setSweets] = useState([]);
  useEffect(()=>{ axios.get(import.meta.env.VITE_API_BASE + '/sweets').then(r=>setSweets(r.data)).catch(()=>{}) },[]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Sweets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sweets.map(s=>(
          <div key={s.id} className="border rounded p-4 bg-white shadow">
            <h2 className="font-semibold">{s.name}</h2>
            <p>{s.category} — ₹{s.price}</p>
            <p>Stock: {s.quantity}</p>
            <button disabled={s.quantity<=0} className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded">Purchase</button>
          </div>
        ))}
      </div>
    </div>
  )
}
