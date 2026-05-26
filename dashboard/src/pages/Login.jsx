import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Email and password required'); return }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gray-800 rounded shadow border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-white">Dashboard Login</h1>
        {error && <div className="mb-2 text-red-400 text-sm">{error}</div>}
        <label className="block mb-3 text-gray-300">
          <span className="block mb-1 text-sm font-medium">Email</span>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" placeholder="you@example.com" /></label>
        <label className="block mb-3 text-gray-300">
          <span className="block mb-1 text-sm font-medium">Password</span>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" placeholder="Password" /></label>
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition">Sign in</button>
      </form>
    </div>
  )
}
