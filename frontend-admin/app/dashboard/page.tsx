'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Request {
  id: number
  createdAt: string
  isTreated: boolean
  player: {
    id: number
    firstName: string
    lastName: string
    email: string
    nationality: string
    primaryPost: string
  }
}

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/login')
      return
    }

    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/requests`)
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">⚽ Admin - CV Sportif</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Demandes en attente ({requests.length})
          </h2>
          <p className="text-gray-600">
            Cliquez sur un joueur pour modifier ses informations et générer son CV
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            Aucune demande en attente
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((request) => (
              <Link
                key={request.id}
                href={`/dashboard/player/${request.player.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {request.player.firstName} {request.player.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{request.player.primaryPost}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                    En attente
                  </span>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📧 {request.player.email}</p>
                  <p>🌍 {request.player.nationality}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Demande du {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Gérer le profil →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}