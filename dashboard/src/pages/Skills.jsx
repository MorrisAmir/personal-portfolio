import React, { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Skills(){
  const [skills, setSkills] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'skills'), snap=>{
      const data = []
      snap.forEach(d=> data.push({id: d.id, ...d.data()}))
      setSkills(data)
    })
    return unsub
  },[])

  const handleAdd = async (e)=>{
    e.preventDefault()
    if(!name) return alert('Name required')
    await addDoc(collection(db,'skills'), {name, category})
    setName(''); setCategory('')
  }

  const handleDelete = async (id)=>{
    if(!confirm('Delete this skill?')) return
    await deleteDoc(doc(db,'skills',id))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Skills</h2>
      <div className="p-4 bg-gray-800 rounded shadow mb-4 border border-gray-700">
        <form onSubmit={handleAdd} className="flex gap-2 items-center">
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="p-2 border border-gray-600 rounded flex-1 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} className="p-2 border border-gray-600 rounded w-40 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition font-medium">Add</button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map(s=> (
          <div key={s.id} className="flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded px-3 py-1 hover:border-gray-600 transition">
            <div className="text-sm font-medium text-white">{s.name}</div>
            <div className="text-xs text-gray-500">{s.category}</div>
            <button onClick={()=>handleDelete(s.id)} className="text-sm text-red-400 hover:text-red-300 transition">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
