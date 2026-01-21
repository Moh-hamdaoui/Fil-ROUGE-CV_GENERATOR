'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { pdf } from '@react-pdf/renderer'
import { User, Trophy, Mail, LocateFixed, Star, Image, Upload } from 'lucide-react'
import { CVPDFTemplate } from '@/component/CVPDFTemplate'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const QUALITIES = {
  Technique: ['Dribble', 'Passes précises', 'Tir puissant', 'Tête', 'Contrôle de balle', 'Jeu de volée'],
  Physique: ['Vitesse', 'Endurance', 'Puissance', 'Détente verticale', 'Agilité', 'Résistance'],
  Mental: ['Leadership', 'Vision du jeu', 'Intelligence tactique', 'Sang-froid', 'Combativité', 'Concentration'],
  Défensif: ['Tacle', 'Interception', 'Marquage', 'Jeu aérien', 'Placement défensif', 'Anticipation']
}

export default function PlayerEditPage() {
  const params = useParams()
  const router = useRouter()
  const playerId = params.id as string

  const [player, setPlayer] = useState<any>(null)
  const [careers, setCareers] = useState<any[]>([])
  const [qualities, setQualities] = useState<any>({})
  const [clubs, setClubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profil')
  const [showCareerModal, setShowCareerModal] = useState(false)
  const [newCareer, setNewCareer] = useState({
    clubId: '',
    season: '',
    competition: '',
    startDate: '',
    endDate: '',
    stats: { matches: 0, goals: 0, assists: 0 }
  })

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/login')
      return
    }
    fetchData()
  }, [playerId, router])

  const fetchData = async () => {
    try {
      const [playerRes, careersRes, qualitiesRes, clubsRes] = await Promise.all([
        fetch(`${API_URL}/api/players/${playerId}`),
        fetch(`${API_URL}/api/careers/player/${playerId}`),
        fetch(`${API_URL}/api/qualities/player/${playerId}`),
        fetch(`${API_URL}/api/clubs`)
      ])

      const playerData = await playerRes.json()
      const careersData = await careersRes.json()
      const qualitiesData = await qualitiesRes.json()
      const clubsData = await clubsRes.json()

      setPlayer(playerData)
      setCareers(careersData)
      setClubs(clubsData)

      const qualitiesMap: any = {}
      Object.keys(QUALITIES).forEach(cat => {
        qualitiesMap[cat] = {}
        QUALITIES[cat as keyof typeof QUALITIES].forEach(q => {
          const existing = qualitiesData.find((qd: any) => qd.quality === q && qd.category === cat)
          qualitiesMap[cat][q] = existing ? existing.rating : 5
        })
      })
      setQualities(qualitiesMap)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      await fetch(`${API_URL}/api/players/${playerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player),
      })
      alert('Profil sauvegardé !')
    } catch (error) {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveQualities = async () => {
    setSaving(true)
    try {
      const qualitiesArray: any[] = []
      Object.entries(qualities).forEach(([category, quals]: [string, any]) => {
        Object.entries(quals).forEach(([quality, rating]) => {
          qualitiesArray.push({ category, quality, rating })
        })
      })

      await fetch(`${API_URL}/api/qualities/player/${playerId}/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qualities: qualitiesArray }),
      })
      alert('Qualités sauvegardées !')
    } catch (error) {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleAddCareer = async () => {
    try {
      const response = await fetch(`${API_URL}/api/careers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCareer,
          playerId: parseInt(playerId),
          clubId: parseInt(newCareer.clubId),
        }),
      })
      const data = await response.json()
      setCareers([data, ...careers])
      setShowCareerModal(false)
      setNewCareer({
        clubId: '',
        season: '',
        competition: '',
        startDate: '',
        endDate: '',
        stats: { matches: 0, goals: 0, assists: 0 }
      })
    } catch (error) {
      alert('Erreur lors de l\'ajout de la carrière')
    }
  }

  const handleDeleteCareer = async (careerId: number) => {
    if (!confirm('Supprimer cette saison ?')) return
    try {
      await fetch(`${API_URL}/api/careers/${careerId}`, { method: 'DELETE' })
      setCareers(careers.filter(c => c.id !== careerId))
    } catch (error) {
      alert('Erreur lors de la suppression')
    }
  }

  const handleGeneratePDF = async () => {
    try {
      const qualitiesArray: any[] = []
      Object.entries(qualities).forEach(([category, quals]: [string, any]) => {
        Object.entries(quals).forEach(([quality, rating]) => {
          qualitiesArray.push({ category, quality, rating })
        })
      })

      const blob = await pdf(
        <CVPDFTemplate 
          player={player} 
          careers={careers} 
          qualities={qualitiesArray} 
        />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `CV_${player.firstName}_${player.lastName}.pdf`
      a.click()
    } catch (error) {
      console.error('Erreur génération PDF:', error)
      alert('Erreur lors de la génération du PDF')
    }
  }

  const updateQuality = (category: string, quality: string, rating: number) => {
    setQualities({
      ...qualities,
      [category]: {
        ...qualities[category],
        [quality]: rating
      }
    })
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  // Validation côté client
  if (file.size > 5 * 1024 * 1024) {
    alert('Fichier trop volumineux (max 5MB)')
    return
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    alert('Format non supporté. Utilisez JPG, PNG ou WebP')
    return
  }

  setSaving(true)
  try {
    // Convertir l'image en base64
    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64String = event.target?.result as string

      const response = await fetch(`${API_URL}/api/players/${playerId}/upload-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: base64String }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur upload')
      }

      const data = await response.json()
      setPlayer({ ...player, photo: data.photo })
      alert('Photo uploadée avec succès !')
    }

    reader.onerror = () => {
      alert('Erreur lors de la lecture du fichier')
    }

    reader.readAsDataURL(file)
  } catch (error) {
    console.error('Erreur:', error)
    alert(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
  } finally {
    setSaving(false)
    // Réinitialiser l'input
    if (e.target) {
      e.target.value = ''
    }
  }
}

  const TABS = [
    { key: 'profil', label: 'Profil', icon: User },
    { key: 'carriere', label: 'Carrière', icon: Trophy },
    { key: 'contact', label: 'Contact', icon: Mail },
  ]

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Chargement...</div>
  }

  if (!player) {
    return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Joueur non trouvé</div>
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="bg-[#141414] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              <span className="text-xl">←</span>
              <span>Retour</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {player.firstName} {player.lastName}
              </h1>
              <p className="text-sm text-gray-400">{player.primaryPost}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleGeneratePDF}
              className="px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Générer PDF
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-[#141414] rounded-t-xl overflow-hidden">
            <div className="flex border-b ">
            {TABS.map((tab) => {
                const Icon = tab.icon
                return (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 py-4 font-medium transition flex items-center gap-2 ${
                        activeTab === tab.key ? 'bg-[#f59e0b] text-black' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]' }`}>
                        <Icon size={20} />
                        <span>{tab.label}</span>
                    </button>
                )     
              })}
          </div>
        </div>

        <div className="bg-[#141414] rounded-b-xl p-8">
          {activeTab === 'profil' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <User size={20} className="text-[#f59e0b]" />Informations personnelles</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Prénom</label>
                      <input
                        type="text"
                        value={player.firstName}
                        onChange={(e) => setPlayer({ ...player, firstName: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Nom</label>
                      <input
                        type="text"
                        value={player.lastName}
                        onChange={(e) => setPlayer({ ...player, lastName: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm text-[#404040] mb-2">Date de naissance</label>
                      <input
                        type="date"
                        value={player.dateOfBirth?.split('T')[0] || ''}
                        onChange={(e) => setPlayer({ ...player, dateOfBirth: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Nationalité</label>
                      <input
                        type="text"
                        value={player.nationality}
                        onChange={(e) => setPlayer({ ...player, nationality: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Taille (cm)</label>
                      <input
                        type="number"
                        value={player.size}
                        onChange={(e) => setPlayer({ ...player, size: parseInt(e.target.value) })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Poids (kg)</label>
                      <input
                        type="number"
                        value={player.weight || ''}
                        onChange={(e) => setPlayer({ ...player, weight: parseInt(e.target.value) })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">VMA (km/h)</label>
                      <input
                        type="number"
                        value={player.vma || ''}
                        onChange={(e) => setPlayer({ ...player, vma: parseInt(e.target.value) })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <LocateFixed size={20} className="text-[#f59e0b]" />Poste</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Poste principal</label>
                      <select
                        value={player.primaryPost}
                        onChange={(e) => setPlayer({ ...player, primaryPost: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      >
                        <option>GB</option>
                        <option>DG</option>
                        <option>DC</option>
                        <option>DD</option>
                        <option>MDC</option>
                        <option>MC</option>
                        <option>MOC</option>
                        <option>AG</option>
                        <option>AD</option>
                        <option>BU</option>
                        <option>Piston G</option>
                        <option>Piston D</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Poste secondaire</label>
                      <select
                        value={player.secondaryPost}
                        onChange={(e) => setPlayer({ ...player, secondaryPost: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      >
                        <option>GB</option>
                        <option>DG</option>
                        <option>DC</option>
                        <option>DD</option>
                        <option>MDC</option>
                        <option>MC</option>
                        <option>MOC</option>
                        <option>AG</option>
                        <option>AD</option>
                        <option>BU</option>
                        <option>Piston G</option>
                        <option>Piston D</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Pied fort</label>
                      <select
                        value={player.strongFoot}
                        onChange={(e) => setPlayer({ ...player, strongFoot: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      >
                        <option>Gauche</option>
                        <option>Droit</option>
                        <option>Les deux</option>
                      </select>
                      <div className='mt-4'>
                        <label className="block text-sm text-gray-400 mb-2">Formation préféré</label>
                        <label className="block text-lg text-gray-200 mb-2">{player.favoriteTactic}</label>
                      </div>
                    </div>
                   
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Star size={20} className="text-[#f59e0b]" />
                            Qualités ({player.qualities.length})
                        </h2>
                    </div>

                <div className="flex flex-wrap gap-2">
                    {player.qualities && player.qualities.length > 0 ? (player.qualities.map((q: any) => (
                <span
                    key={q.id}
                    className="bg-[#262626] border border-[#f59e0b] text-[#f59e0b] px-3 py-1 rounded-full text-sm font-medium"
                >
                    {q.quality}
                </span>
                    ))
                ) : (
                <p className="text-gray-400">Aucune qualité renseignée</p>
                )}
                </div>
            </div>


                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full bg-[#22c55e] text-white py-3 rounded-lg font-medium hover:bg-[#16a34a] transition disabled:bg-gray-600"
                >
                  {saving ? 'Sauvegarde...' : 'Sauvegarder le profil'}
                </button>
              </div>

              <div>
                <div className="bg-[#1a1a1a] rounded-xl p-6">
  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
    <Upload size={20} className="text-[#f59e0b]" />
    Photo joueur
  </h3>
  
  <div className="relative group cursor-pointer">
    <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border-2 border-dashed border-gray-700 flex items-center justify-center relative h-64 group-hover:border-[#f59e0b] transition">
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        disabled={saving}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />

      {player.photo ? (
        <>
          <img 
            src={player.photo} 
            alt={`${player.firstName} ${player.lastName}`}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <div className="text-white text-center opacity-0 group-hover:opacity-100 transition">
              <Upload size={32} className="mx-auto mb-2" />
              <p className="text-sm font-medium">Changer la photo</p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 pointer-events-none">
          <Upload size={48} className="mx-auto mb-2 text-[#f59e0b]" />
          <p className="text-sm font-medium">Cliquez pour uploader</p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP (max 5MB)</p>
        </div>
      )}
    </div>
  </div>

  {saving && (
    <div className="mt-3 flex items-center gap-2">
      <div className="w-4 h-4 bg-[#f59e0b] rounded-full animate-pulse"></div>
      <p className="text-sm text-[#f59e0b]">Upload en cours...</p>
    </div>
  )}
</div>
                <div className="bg-[#1a1a1a] rounded-xl p-6 mt-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4"><Image size={20} className="text-[#f59e0b]" />Logos pour PDF</h3>
                  <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#404040] flex items-center justify-center">
                    
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'carriere' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Historique de carrière</h2>
                <button
                  onClick={() => setShowCareerModal(true)}
                  className="px-4 py-2 bg-[#f59e0b] text-black rounded-lg font-medium hover:bg-[#d97706] transition"
                >
                  + Ajouter une saison
                </button>
              </div>

              <div className="space-y-4">
                {careers.map((career) => (
                  <div key={career.id} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#f59e0b] transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white">{career.club.name}</h4>
                        <p className="text-gray-400 mt-1">{career.competition} - {career.season}</p>
                        {career.stats && (
                          <div className="flex gap-6 mt-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#f59e0b]">{career.stats[0].goals}</div>
                              <div className="text-xs text-gray-500">buts</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#f59e0b]">{career.stats[0].matches}</div>
                              <div className="text-xs text-gray-500">matchs</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#f59e0b]">{career.stats[0].assists}</div>
                              <div className="text-xs text-gray-500">passes</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteCareer(career.id)}
                        className="text-red-500 hover:text-red-400 text-2xl"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {showCareerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                  <div className="bg-[#141414] rounded-2xl p-8 w-full max-w-3xl border border-gray-800">
                    <h3 className="text-2xl font-bold text-white mb-6">Ajouter une saison</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Club</label>
                          <select
                            value={newCareer.clubId}
                            onChange={(e) => setNewCareer({ ...newCareer, clubId: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          >
                            <option value="">Sélectionner un club</option>
                            {clubs.map(club => (
                              <option key={club.id} value={club.id}>{club.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Saison</label>
                          <input
                            type="text"
                            placeholder="2024-2025"
                            value={newCareer.season}
                            onChange={(e) => setNewCareer({ ...newCareer, season: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Compétition</label>
                        <input
                          type="text"
                          placeholder="U19 NATIONAL"
                          value={newCareer.competition}
                          onChange={(e) => setNewCareer({ ...newCareer, competition: e.target.value })}
                          className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Date début</label>
                          <input
                            type="date"
                            value={newCareer.startDate}
                            onChange={(e) => setNewCareer({ ...newCareer, startDate: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Date fin</label>
                          <input
                            type="date"
                            value={newCareer.endDate}
                            onChange={(e) => setNewCareer({ ...newCareer, endDate: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          />
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-white mt-6 mb-3">Statistiques</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Matchs</label>
                          <input
                            type="number"
                            value={newCareer.stats.matches}
                            onChange={(e) => setNewCareer({ 
                              ...newCareer, 
                              stats: { ...newCareer.stats, matches: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Buts</label>
                          <input
                            type="number"
                            value={newCareer.stats.goals}
                            onChange={(e) => setNewCareer({ 
                              ...newCareer, 
                              stats: { ...newCareer.stats, goals: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Passes décisives</label>
                          <input
                            type="number"
                            value={newCareer.stats.assists}
                            onChange={(e) => setNewCareer({ 
                              ...newCareer, 
                              stats: { ...newCareer.stats, assists: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => setShowCareerModal(false)}
                        className="flex-1 px-6 py-3 bg-[#1a1a1a] text-white rounded-lg font-medium hover:bg-[#252525] transition border border-gray-700"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleAddCareer}
                        className="flex-1 px-6 py-3 bg-[#f59e0b] text-black rounded-lg font-medium hover:bg-[#d97706] transition"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="max-w-2xl">
              <div className="bg-[#1a1a1a] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">✉️</span>
                  <h2 className="text-xl font-bold text-white">Informations de contact</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={player.email}
                      onChange={(e) => setPlayer({ ...player, email: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={player.telephone}
                      onChange={(e) => setPlayer({ ...player, telephone: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full mt-6 bg-[#22c55e] text-white py-3 rounded-lg font-medium hover:bg-[#16a34a] transition disabled:bg-gray-600"
                >
                  {saving ? 'Sauvegarde...' : 'Sauvegarder les informations'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}