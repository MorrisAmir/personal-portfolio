import React, { useEffect, useState, createContext, useContext } from 'react'
import { Routes, Route, Navigate, Link, Outlet, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { seedPortfolioDataOnce } from './seed'
import Login from './pages/Login'
import DashboardPage from './pages/Dashboard'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import About from './pages/About'

const AuthContext = createContext()
export function useAuth() { return useContext(AuthContext) }

function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-4">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function Layout() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <aside className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-screen">
        <div className="p-6 border-b border-gray-700">
          <div className="text-lg font-bold">Mo Amir</div>
          <div className="text-sm text-gray-400">Admin</div>
        </div>
        <nav className="p-4 flex-1 space-y-1">
          <Link to="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-700 transition">Home</Link>
          <Link to="/dashboard/projects" className="block py-2 px-3 rounded hover:bg-gray-700 transition">Projects</Link>
          <Link to="/dashboard/skills" className="block py-2 px-3 rounded hover:bg-gray-700 transition">Skills</Link>
          <Link to="/dashboard/about" className="block py-2 px-3 rounded hover:bg-gray-700 transition">About</Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">{user && user.email}</div>
          <button
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
            onClick={async () => { await signOut(auth); navigate('/login') }}
          >Sign out</button>
        </div>
      </aside>
      <main className="flex-1 p-6 ml-72">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  // Seed portfolio data on app load (once only)
  useEffect(() => {
    if (!loading && user) {
      seedPortfolioDataOnce()
    }
  }, [loading, user])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthContext.Provider>
  )
}
