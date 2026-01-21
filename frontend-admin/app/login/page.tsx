'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_CODE = "ADMIN2026"

export default function LoginPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (code === ADMIN_CODE) {
      localStorage.setItem('adminAuth', 'true')
      router.push('/dashboard')
    } else {
      setError('Code incorrect')
      setCode('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ⚽ Admin CV Sportif
          </h1>
          <p className="text-gray-600">Entrez le code d'accès</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code d'accès"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  )
}