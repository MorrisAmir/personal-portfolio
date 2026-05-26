import React, { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Projects(){
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({title:'', description:'', tech:'', year:'', role:''})
  const [editingId, setEditingId] = useState(null)

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'projects'), snap=>{
      const data = []
      snap.forEach(d=> data.push({id: d.id, ...d.data()}))
      setProjects(data)
    })
    return unsub
  },[])

  const validate = f => f.title && f.description

  const handleAdd = async (e)=>{
    e.preventDefault()
    if(!validate(form)) return alert('Title and description required')
    const payload = {...form, tech: form.tech ? form.tech.split(',').map(s=>s.trim()) : [], year: form.year || '', role: form.role || ''}
    await addDoc(collection(db,'projects'), payload)
    setForm({title:'', description:'', tech:'', year:'', role:''})
  }

  const startEdit = (p)=>{
    setEditingId(p.id)
    setForm({title:p.title, description:p.description, tech: p.tech ? p.tech.join(', ') : '', year: p.year || '', role: p.role || ''})
    window.scrollTo({top:0, behavior:'smooth'})
  }

  const handleUpdate = async (e)=>{
    e.preventDefault()
    if(!validate(form)) return alert('Title and description required')
    const docRef = doc(db,'projects',editingId)
    await updateDoc(docRef, {title:form.title, description:form.description, tech: form.tech ? form.tech.split(',').map(s=>s.trim()) : [], year: form.year, role: form.role})
    setEditingId(null)
    setForm({title:'', description:'', tech:'', year:'', role:''})
  }

  const handleDelete = async (id)=>{
    if(!confirm('Delete this project?')) return
    await deleteDoc(doc(db,'projects',id))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Projects</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded shadow border border-gray-700">
          <h3 className="font-bold mb-2 text-white">{editingId ? 'Edit Project' : 'Add Project'}</h3>
          <form onSubmit={editingId ? handleUpdate : handleAdd} className="space-y-2">
            <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
            <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
            <input placeholder="Tech (comma separated)" value={form.tech} onChange={e=>setForm({...form, tech:e.target.value})} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
            <input placeholder="Year" value={form.year} onChange={e=>setForm({...form, year:e.target.value})} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
            <input placeholder="Role" value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
            <div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2 transition font-medium">{editingId ? 'Update' : 'Add'}</button>
              {editingId && <button type="button" onClick={()=>{setEditingId(null); setForm({title:'', description:'', tech:'', year:'', role:''})}} className="py-2 px-4 text-gray-400 hover:text-white transition">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map(p=> (
            <div key={p.id} className="p-4 bg-gray-800 rounded shadow border border-gray-700 hover:border-gray-600 transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-lg text-white">{p.title}</div>
                  <div className="text-sm text-gray-400">{p.role} — {p.year}</div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button onClick={()=>startEdit(p)} className="text-sm text-blue-400 hover:text-blue-300 transition">Edit</button>
                  <button onClick={()=>handleDelete(p.id)} className="text-sm text-red-400 hover:text-red-300 transition">Delete</button>
                </div>
              </div>
              <p className="mt-3 text-gray-300">{p.description}</p>
              <div className="mt-2 text-xs text-gray-500">Tech: {(p.tech||[]).join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
