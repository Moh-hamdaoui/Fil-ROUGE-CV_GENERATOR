'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, LogOut, Users, Clock, CheckCircle } from 'lucide-react'

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
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('tous')
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/login')
      return
    }

    fetchRequests()
  }, [])

  useEffect(() => {
    let filtered = requests

    if (filterStatus === 'traiter') {
      filtered = filtered.filter(r => !r.isTreated)
    } else if (filterStatus === 'traites') {
      filtered = filtered.filter(r => r.isTreated)
    }

    if (searchTerm) {
      filtered = filtered.filter(r =>
        `${r.player.firstName} ${r.player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.player.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredRequests(filtered)
  }, [requests, searchTerm, filterStatus])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/requests`)
      const data = await response.json()
      setRequests(data)
      setFilteredRequests(data)
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

  const totalCVs = requests.length
  const toProcess = requests.filter(r => !r.isTreated).length
  const processed = requests.filter(r => r.isTreated).length

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="bg-[#141414] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white"></h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition border border-red-600/50"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Cartes de statistiques */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#141414] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total CV</p>
                <p className="text-4xl font-bold text-white mt-2">{totalCVs}</p>
              </div>
              <Users size={40} className="text-blue-400/40" />
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">À traiter</p>
                <p className="text-4xl font-bold text-[#f59e0b] mt-2">{toProcess}</p>
              </div>
              <Clock size={40} className="text-[#f59e0b]/40" />
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Traités</p>
                <p className="text-4xl font-bold text-[#22c55e] mt-2">{processed}</p>
              </div>
              <CheckCircle size={40} className="text-[#22c55e]/40" />
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#141414] border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#f59e0b] focus:outline-none transition"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setFilterStatus('tous')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'tous'
                  ? 'bg-[#f59e0b] text-black'
                  : 'bg-[#141414] text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterStatus('traiter')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'traiter'
                  ? 'bg-[#f59e0b] text-black'
                  : 'bg-[#141414] text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              À traiter
            </button>
            <button
              onClick={() => setFilterStatus('traites')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'traites'
                  ? 'bg-[#f59e0b] text-black'
                  : 'bg-[#141414] text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              Traités
            </button>
          </div>
        </div>

        {/* Tableau des joueurs */}
        {filteredRequests.length === 0 ? (
          <div className="bg-[#141414] rounded-xl border border-gray-800 p-12 text-center">
            <p className="text-gray-500">Aucune demande trouvée</p>
          </div>
        ) : (
          <div className="bg-[#141414] rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 bg-[#0a0a0a]">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Joueur</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Poste</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Soumis le</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className={`border-b border-gray-800 hover:bg-[#1a1a1a] transition ${
                        index !== filteredRequests.length - 1 ? '' : 'border-b-0'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold text-[#f59e0b]">
                              {request.player.firstName[0]}{request.player.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {request.player.firstName} {request.player.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{request.player.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">{request.player.primaryPost}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        {request.isTreated ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] rounded-full text-sm font-medium border border-[#22c55e]/30">
                            ✓ Traité
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#f59e0b]/10 text-[#f59e0b] rounded-full text-sm font-medium border border-[#f59e0b]/30">
                            ⏱ En attente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/player/${request.player.id}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f59e0b] text-black rounded-lg font-medium hover:bg-[#d97706] transition text-sm"
                        >
                          Gérer →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer avec résumé */}
        {filteredRequests.length > 0 && (
          <div className="mt-6 text-center text-gray-500 text-sm">
            Affichage de {filteredRequests.length} demande{filteredRequests.length > 1 ? 's' : ''} sur {requests.length}
          </div>
        )}
      </div>
    </div>
  )
}