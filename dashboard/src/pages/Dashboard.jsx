import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function DashboardPage(){
  const [counts, setCounts] = useState({projects:0, skills:0})

  useEffect(()=>{
    const unsub1 = onSnapshot(collection(db,'projects'), snap=> setCounts(c=>({...c, projects: snap.size})))
    const unsub2 = onSnapshot(collection(db,'skills'), snap=> setCounts(c=>({...c, skills: snap.size})))
    return ()=>{unsub1(); unsub2();}
  },[])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-white">Welcome to the Dashboard</h2>
      <p className="mb-6 text-gray-400">Manage your portfolio content. Use the links on the left to edit Projects, Skills, and About.</p>
      <div className="grid grid-cols-2 gap-4 max-w-lg">
        <div className="p-4 bg-gray-800 rounded shadow border border-gray-700"><span className="text-gray-400">Total projects:</span> <span className="font-bold text-blue-400">{counts.projects}</span></div>
        <div className="p-4 bg-gray-800 rounded shadow border border-gray-700"><span className="text-gray-400">Total skills:</span> <span className="font-bold text-blue-400">{counts.skills}</span></div>
      </div>
    </div>
  )
}
