import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function About(){
  const [data, setData] = useState({bio:'', tagline:'', available:false})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const dRef = doc(db,'about','main')
    getDoc(dRef).then(snap=>{
      if(snap.exists()) setData(snap.data())
      setLoading(false)
    })
  },[])

  const handleSave = async (e)=>{
    e.preventDefault()
    if(!data.bio) return alert('Bio required')
    await setDoc(doc(db,'about','main'), data)
    alert('Saved')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">About</h2>
      {loading ? <div className="text-gray-400">Loading...</div> : (
        <form onSubmit={handleSave} className="p-4 bg-gray-800 rounded shadow space-y-2 max-w-2xl border border-gray-700">
          <label className="block text-gray-300">
            <span className="block mb-1 text-sm font-medium">Tagline</span>
            <input value={data.tagline} onChange={e=>setData({...data, tagline:e.target.value})} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" /></label>
          <label className="block text-gray-300">
            <span className="block mb-1 text-sm font-medium">Bio</span>
            <textarea value={data.bio} onChange={e=>setData({...data, bio:e.target.value})} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" rows={6} /></label>
          <label className="flex items-center space-x-2 text-gray-300">
            <span>Available</span>
            <input type="checkbox" checked={data.available} onChange={e=>setData({...data, available: e.target.checked})} className="ml-2 w-4 h-4" /></label>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition font-medium">Save</button>
          </div>
        </form>
      )}
    </div>
  )
}
