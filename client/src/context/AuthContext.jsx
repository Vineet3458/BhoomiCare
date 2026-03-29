import React, { createContext, useContext, useState, useCallback } from 'react'

// Authentication context.
// Uses localStorage for session persistence (real app → use JWT + backend).
// Stores user profile including name, region, and language preference.

const AuthContext = createContext(null)

const STORAGE_KEY = 'bhoomicare_user'

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Demo user database (in-memory — replace with real API)
const DEMO_USERS = [
  {
    id: 'u1',
    name: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    password: 'farmer123',
    phone: '9876543210',
    region: 'Maharashtra',
    lang: 'hi',
    avatar: '👨‍🌾',
    joinedAt: '2024-01-15',
  },
]

export function AuthProvider({ children }) {
  const [user,    setUser   ] = useState(() => loadUser())
  const [loading, setLoading] = useState(false)
  const [error,   setError  ] = useState(null)

  const login = useCallback(async ({ email, password }) => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API delay
      await new Promise(r => setTimeout(r, 700))

      // Check demo users
      const found = DEMO_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )

      if (!found) {
        throw new Error('Invalid email or password.')
      }

      const { password: _, ...safeUser } = found
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
      setUser(safeUser)
      return { ok: true }
    } catch (e) {
      setError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async ({ name, email, password, phone, region, lang }) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise(r => setTimeout(r, 800))

      // Check duplicate email
      const exists = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (exists) throw new Error('An account with this email already exists.')

      const avatars = ['👨‍🌾','👩‍🌾','🧑‍🌾']
      const newUser = {
        id: `u${Date.now()}`,
        name, email, phone,
        region: region || 'Maharashtra',
        lang:   lang   || 'en',
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        joinedAt: new Date().toISOString().slice(0, 10),
      }

      DEMO_USERS.push({ ...newUser, password })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
      setUser(newUser)
      return { ok: true }
    } catch (e) {
      setError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const updateProfile = useCallback((updates) => {
    const updated = { ...user, ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setUser(updated)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
