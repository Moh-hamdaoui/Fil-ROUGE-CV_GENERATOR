'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { pdf } from '@react-pdf/renderer'
import { User, Trophy, Mail, LocateFixed, Star, Image, Upload, Download, Save, Trash, Globe, Award, Link2, GraduationCap } from 'lucide-react'
import { CVPDFTemplate } from '@/component/CVPDFTemplate'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const QUALITIES = {
  Technique: ['Dribble', 'Passes précises', 'Tir puissant', 'Tête', 'Contrôle de balle', 'Jeu de volée'],
  Physique: ['Vitesse', 'Endurance', 'Puissance', 'Détente verticale', 'Agilité', 'Résistance'],
  Mental: ['Leadership', 'Vision du jeu', 'Intelligence tactique', 'Sang-froid', 'Combativité', 'Concentration'],
  Défensif: ['Tacle', 'Interception', 'Marquage', 'Jeu aérien', 'Placement défensif', 'Anticipation']
}

const NATIONAL_TEAMS = {
  'UEFA (Europe)': [
    'Albanie', 'Allemagne', 'Andorre', 'Angleterre', 'Arménie', 'Autriche', 'Azerbaïdjan',
    'Belgique', 'Biélorussie', 'Bosnie-Herzégovine', 'Bulgarie', 'Chypre', 'Croatie',
    'Danemark', 'Écosse', 'Espagne', 'Estonie', 'Finlande', 'France', 'Galles', 'Géorgie',
    'Gibraltar', 'Grèce', 'Hongrie', 'Îles Féroé', 'Irlande', 'Irlande du Nord', 'Islande',
    'Israël', 'Italie', 'Kazakhstan', 'Kosovo', 'Lettonie', 'Liechtenstein', 'Lituanie',
    'Luxembourg', 'Macédoine du Nord', 'Malte', 'Moldavie', 'Monaco', 'Monténégro',
    'Norvège', 'Pays-Bas', 'Pologne', 'Portugal', 'République tchèque', 'Roumanie',
    'Russie', 'Saint-Marin', 'Serbie', 'Slovaquie', 'Slovénie', 'Suède', 'Suisse',
    'Turquie', 'Ukraine'
  ],
  'CAF (Afrique)': [
    'Afrique du Sud', 'Algérie', 'Angola', 'Bénin', 'Botswana', 'Burkina Faso', 'Burundi',
    'Cameroun', 'Cap-Vert', 'Centrafrique', 'Comores', 'Congo', 'Côte d\'Ivoire', 'Djibouti',
    'Égypte', 'Érythrée', 'Eswatini', 'Éthiopie', 'Gabon', 'Gambie', 'Ghana', 'Guinée',
    'Guinée équatoriale', 'Guinée-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libye',
    'Madagascar', 'Malawi', 'Mali', 'Maroc', 'Maurice', 'Mauritanie', 'Mozambique',
    'Namibie', 'Niger', 'Nigeria', 'Ouganda', 'RD Congo', 'Rwanda', 'São Tomé-et-Príncipe',
    'Sénégal', 'Seychelles', 'Sierra Leone', 'Somalie', 'Soudan', 'Soudan du Sud',
    'Tanzanie', 'Tchad', 'Togo', 'Tunisie', 'Zambie', 'Zimbabwe'
  ],
  'CONMEBOL (Amérique du Sud)': [
    'Argentine', 'Bolivie', 'Brésil', 'Chili', 'Colombie', 'Équateur', 'Paraguay',
    'Pérou', 'Uruguay', 'Venezuela'
  ],
  'CONCACAF (Amérique du Nord/Centrale)': [
    'Antigua-et-Barbuda', 'Bahamas', 'Barbade', 'Belize', 'Bermudes', 'Canada',
    'Costa Rica', 'Cuba', 'Curaçao', 'Dominique', 'El Salvador', 'États-Unis',
    'Grenade', 'Guatemala', 'Guyana', 'Haïti', 'Honduras', 'Jamaïque', 'Mexique',
    'Nicaragua', 'Panama', 'Porto Rico', 'République dominicaine', 'Saint-Kitts-et-Nevis',
    'Saint-Vincent-et-les-Grenadines', 'Sainte-Lucie', 'Suriname', 'Trinité-et-Tobago'
  ],
  'AFC (Asie)': [
    'Afghanistan', 'Arabie saoudite', 'Australie', 'Bahreïn', 'Bangladesh', 'Bhoutan',
    'Brunei', 'Cambodge', 'Chine', 'Corée du Nord', 'Corée du Sud', 'Émirats arabes unis',
    'Guam', 'Hong Kong', 'Inde', 'Indonésie', 'Irak', 'Iran', 'Japon', 'Jordanie',
    'Kirghizistan', 'Koweït', 'Laos', 'Liban', 'Macao', 'Malaisie', 'Maldives', 'Mongolie',
    'Myanmar', 'Népal', 'Oman', 'Ouzbékistan', 'Pakistan', 'Palestine', 'Philippines',
    'Qatar', 'Singapour', 'Sri Lanka', 'Syrie', 'Tadjikistan', 'Taipei chinois',
    'Thaïlande', 'Timor oriental', 'Turkménistan', 'Viêt Nam', 'Yémen'
  ],
  'OFC (Océanie)': [
    'Fidji', 'Nouvelle-Calédonie', 'Nouvelle-Zélande', 'Papouasie-Nouvelle-Guinée',
    'Îles Salomon', 'Samoa', 'Samoa américaines', 'Tahiti', 'Tonga', 'Vanuatu'
  ]
}

// Catégories internationales
const INTERNATIONAL_CATEGORIES = [
  'U15',
  'U16', 
  'U17',
  'U18',
  'U19',
  'U20',
  'U21',
  'U23',
  'Espoirs',
  'A'
]

export default function PlayerEditPage() {
  const params = useParams()
  const router = useRouter()
  const playerId = params.id as string

  const [playerRequest, setPlayerRequest] = useState<any>(null)
  const [player, setPlayer] = useState<any>(null)
  const [careers, setCareers] = useState<any[]>([])
  const [qualities, setQualities] = useState<any>({})
  const [clubs, setClubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profil')
  const [showCareerModal, setShowCareerModal] = useState(false)
  const [formations, setFormations] = useState<any[]>([])
  
  // État complet pour nouvelle carrière avec TOUS les champs
  const [newCareer, setNewCareer] = useState({
    clubId: '',
    season: '',
    competition: '',
    startDate: '',
    endDate: '',
    category: '',
    // Champs internationaux
    isInternationalPlayer: false,
    internationalTeamName: '',
    aboutInternationalSelection: '',
    // Badges/Accomplissements
    isCaptain: false,
    isChampionWinner: false,
    nameOfChampionship: '',
    isUpgraded: false,
    internationalCategory: '',
    isChangedClub: false,
    aboutClubChanging: '',
    // Stats
    stats: { 
      matches: 0, 
      goals: 0, 
      assists: 0, 
      cleanSheet: 0,
      averagePlayingTime: 0 
    }
  })

  const [showFormationModal, setShowFormationModal] = useState(false)
  const [editingFormation, setEditingFormation] = useState<any>(null)
  const [newFormation, setNewFormation] = useState({
  institution: '',
  diploma: '',
  startYear: new Date().getFullYear(),
  endYear: new Date().getFullYear(),
})

  // État pour gérer les uploads
  const [uploadingLogos, setUploadingLogos] = useState<{
    [key: number]: {
      club: boolean
      competition: boolean
    }
  }>({})

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
    const [playerRes, careersRes, qualitiesRes, clubsRes, requestRes, formationsRes] = await Promise.all([
      fetch(`${API_URL}/api/players/${playerId}`),
      fetch(`${API_URL}/api/careers/player/${playerId}`),
      fetch(`${API_URL}/api/qualities/player/${playerId}`),
      fetch(`${API_URL}/api/clubs`),
      fetch(`${API_URL}/api/requests/player/${playerId}`),
      fetch(`${API_URL}/api/formations/player/${playerId}`) // NOUVEAU
    ])

    const playerData = await playerRes.json()
    const careersData = await careersRes.json()
    const qualitiesData = await qualitiesRes.json()
    const clubsData = await clubsRes.json()
    const requestData = await requestRes.json()
    const formationsData = await formationsRes.json() // NOUVEAU

    setPlayer(playerData)
    setCareers(careersData)
    setClubs(clubsData)
    setPlayerRequest(requestData)
    setFormations(formationsData) // NOUVEAU

    // ... reste du code
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    setLoading(false)
  }
}
  const handleMarkAsTreated = async () => {
    if (!playerRequest) return
    
    try {
      const response = await fetch(`${API_URL}/api/requests/${playerRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isTreated: true }),
      })

      if (response.ok) {
        setPlayerRequest({ ...playerRequest, isTreated: true })
        alert('Demande marquée comme traitée !')
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour')
    }
  }

  const handleAddFormation = async () => {
  try {
    const response = await fetch(`${API_URL}/api/formations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerId: parseInt(playerId),
        institution: newFormation.institution,
        diploma: newFormation.diploma,
        startYear: newFormation.startYear,
        endYear: newFormation.endYear,
      }),
    })
    const data = await response.json()
    setFormations([...formations, data])
    setShowFormationModal(false)
    setNewFormation({
      institution: '',
      diploma: '',
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
    })
  } catch (error) {
    alert('Erreur lors de l\'ajout de la formation')
  }
}

const handleUpdateFormation = async (formationId: number, updatedData: any) => {
  try {
    const response = await fetch(`${API_URL}/api/formations/${formationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    const data = await response.json()
    setFormations(formations.map(f => f.id === formationId ? data : f))
    setEditingFormation(null)
    alert('Formation mise à jour !')
  } catch (error) {
    alert('Erreur lors de la mise à jour')
  }
}

const handleDeleteFormation = async (formationId: number) => {
  if (!confirm('Supprimer cette formation ?')) return
  try {
    await fetch(`${API_URL}/api/formations/${formationId}`, { method: 'DELETE' })
    setFormations(formations.filter(f => f.id !== formationId))
  } catch (error) {
    alert('Erreur lors de la suppression')
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
          playerId: parseInt(playerId),
          clubId: parseInt(newCareer.clubId),
          season: newCareer.season,
          competition: newCareer.competition,
          startDate: newCareer.startDate,
          endDate: newCareer.endDate || null,
          category: newCareer.category,
          internationalCategory: newCareer.internationalCategory,
          // Champs internationaux
          isInternationalPlayer: newCareer.isInternationalPlayer,
          internationalTeamName: newCareer.isInternationalPlayer ? newCareer.internationalTeamName : null,
          aboutInternationalSelection: newCareer.isInternationalPlayer ? newCareer.aboutInternationalSelection : null,
          // Badges
          isCaptain: newCareer.isCaptain,
          isChampionWinner: newCareer.isChampionWinner,
          nameOfChampionship: newCareer.isChampionWinner ? newCareer.nameOfChampionship : null,
          isUpgraded: newCareer.isUpgraded, 
          isChangedClub: newCareer.isChangedClub,
          aboutClubChanging: newCareer.aboutClubChanging,
          // Stats
          stats: newCareer.stats,
        }),
      })
      const data = await response.json()
      setCareers([data, ...careers])
      setShowCareerModal(false)
      // Reset le formulaire
      setNewCareer({
        clubId: '',
        season: '',
        competition: '',
        startDate: '',
        endDate: '',
        category: '',
        isInternationalPlayer: false,
        internationalTeamName: '',
        aboutInternationalSelection: '',
        internationalCategory: '',
        isCaptain: false,
        isChampionWinner: false,
        nameOfChampionship: '',
        isUpgraded: false,
        isChangedClub: false,
        aboutClubChanging: '',
        stats: { matches: 0, goals: 0, assists: 0, cleanSheet: 0, averagePlayingTime: 0 }
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

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Vérification de la taille du fichier (max 5 MB)
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
      const reader = new FileReader()
      
      reader.onload = async (event) => {
        try {
          
          // Conversion du fichier en Base64
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
          
          setPlayer((prevPlayer: any) => ({
              ...prevPlayer,
              photo: data.photo
          }))
          
          alert('Photo uploadée avec succès !')
          setSaving(false)
        } catch (error) {
          console.error('Erreur lors de l\'envoi:', error)
          alert(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
          setSaving(false)
        }
      }

      reader.onerror = () => {
        alert('Erreur lors de la lecture du fichier')
        setSaving(false)
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Erreur globale:', error)
      setSaving(false)
    }

    if (e.target) {
      e.target.value = ''
    }
  }

  const getAvailablePositions = (formation: string) => {
    const basePositions = ['GB', 'DG', 'DC', 'DD', 'MDC', 'MC', 'MOC', 'AG', 'AD', 'BU']
    if (formation === '3-5-2') {
      return [...basePositions, 'Piston G', 'Piston D']
    }
    return basePositions
  }

  const handleUploadClubLogo = async (careerId: number, file: File) => {
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Fichier trop volumineux (max 2MB)')
      return
    }

    setUploadingLogos(prev => ({
      ...prev,
      [careerId]: { ...prev[careerId], club: true }
    }))

    try {
      const formData = new FormData()
      formData.append('logo', file)

      const response = await fetch(`${API_URL}/api/careers/${careerId}/upload-club-logo`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Erreur upload')

      const data = await response.json()
      setCareers(careers.map(c => 
        c.id === careerId ? { ...c, clubLogo: data.career.clubLogo } : c
      ))
      alert('Logo club uploadé !')
    } catch (error) {
      alert('Erreur lors de l\'upload du logo club')
    } finally {
      setUploadingLogos(prev => ({
        ...prev,
        [careerId]: { ...prev[careerId], club: false }
      }))
    }
  }

  const handleUploadCompetitionLogo = async (careerId: number, file: File) => {
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Fichier trop volumineux (max 2MB)')
      return
    }

    setUploadingLogos(prev => ({
      ...prev,
      [careerId]: { ...prev[careerId], competition: true }
    }))

    try {
      const formData = new FormData()
      formData.append('logo', file)

      const response = await fetch(`${API_URL}/api/careers/${careerId}/upload-competition-logo`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Erreur upload')

      const data = await response.json()
      setCareers(careers.map(c => 
        c.id === careerId ? { ...c, competitionLogo: data.career.competitionLogo } : c
      ))
      alert('Logo compétition uploadé !')
    } catch (error) {
      alert('Erreur lors de l\'upload du logo compétition')
    } finally {
      setUploadingLogos(prev => ({
        ...prev,
        [careerId]: { ...prev[careerId], competition: false }
      }))
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
          <div className="flex items-center gap-3">
            {playerRequest?.isTreated ? (
              <div className="px-4 py-2 bg-[#22c55e]/10 border border-[#22c55e] text-[#22c55e] rounded-lg text-sm font-medium">
                ✓ Traité
              </div>
            ) : (
              <div className="px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b] text-[#f59e0b] rounded-lg text-sm font-medium">
                ⏱ À traiter
              </div>
            )}
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-[#22c55e] text-black py-3 px-3 rounded-lg font-medium hover:bg-[#16a34a] transition disabled:bg-gray-600 flex items-center justify-center"
            >
              <Save size={20} className="text-black font-bold mr-3" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-[#141414] rounded-t-xl overflow-hidden">
          <div className="flex border-b">
            {TABS.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-4 font-medium transition flex items-center gap-2 ${
                    activeTab === tab.key ? 'bg-[#f59e0b] text-black' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-[#141414] rounded-b-xl p-8">
          {/* TAB PROFIL */}
          {activeTab === 'profil' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Informations personnelles */}
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <User size={20} className="text-[#f59e0b]" />Informations personnelles
                    </h2>
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
                      <label className="block text-sm text-gray-400 mb-2">Genre</label>
                      <select
                        value={player.gender || ''}
                        onChange={(e) => setPlayer({ ...player, gender: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      >
                        <option value="">Sélectionnez</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                    </div>
                     </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Date de naissance</label>
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

                {/* Poste */}
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <LocateFixed size={20} className="text-[#f59e0b]" />Poste
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
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
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Formation préférée</label>
                      <select
                        value={player.favoriteTactic}
                        onChange={(e) => setPlayer({ ...player, favoriteTactic: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      >
                        <option>4-4-3</option>
                        <option>3-5-2</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Poste principal</label>
                      <select
                        value={player.primaryPost}
                        onChange={(e) => setPlayer({ ...player, primaryPost: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      >
                        {getAvailablePositions(player.favoriteTactic || '4-4-3').map((position) => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Poste secondaire</label>
                      <select
                        value={player.secondaryPost}
                        onChange={(e) => setPlayer({ ...player, secondaryPost: e.target.value })}
                        className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                      >
                        <option value="">Aucun</option>
                        {getAvailablePositions(player.favoriteTactic || '4-4-3').map((position) => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Qualités */}
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Star size={20} className="text-[#f59e0b]" />
                      Qualités ({player.qualities?.length || 0})
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {player.qualities && player.qualities.length > 0 ? (
                      player.qualities.map((q: any) => (
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
              </div>

              {/* Colonne droite */}
              <div>
                {/* Photo */}
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Upload size={20} className="text-[#f59e0b]" />
                    Photo joueur
                  </h3>
                  <label className="block cursor-pointer">
                    <div className="relative group">
                      <div className="bg-[#0a0a0a] rounded-xl overflow-hidden flex items-center justify-center relative h-64 group-hover:border-[#f59e0b] transition">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          disabled={saving}
                          className="hidden"
                        />
                        {player?.photo && player.photo.length > 50 ? (
                          <img
                            src={player.photo}
                            alt={`${player.firstName} ${player.lastName}`}
                            className="w-full h-full object-cover block"
                          />
                        ) : (
                          <div className="text-center text-gray-400 pointer-events-none">
                            <Upload size={48} className="mx-auto mb-2 text-[#f59e0b]" />
                            <p className="text-sm font-medium">Cliquez pour uploader</p>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP (max 5MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                  {saving && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#f59e0b] rounded-full animate-pulse"></div>
                      <p className="text-sm text-[#f59e0b]">Upload en cours...</p>
                    </div>
                  )}
                </div>

                {/* Boutons */}
                {playerRequest && !playerRequest.isTreated && (
                  <button
                    onClick={handleMarkAsTreated}
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    ✓ Marquer comme traité
                  </button>
                )}

                {playerRequest && playerRequest.isTreated && (
                  <div className="mt-4 bg-green-500/10 border border-green-500 text-green-500 py-3 rounded-lg text-center font-medium">
                    ✓ Demande traitée
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleGeneratePDF}
                    className="flex items-center justify-center w-full py-4 bg-[#db7c07] text-black text-lg font-bold rounded-lg gap-2 hover:bg-amber-400 transition"
                  >
                    <Download size={20} className="text-black font-bold" /> Générer le PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB CARRIÈRE */}
          {activeTab === 'carriere' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Historique de carrière</h2>
                <button
                  onClick={() => setShowCareerModal(true)}
                  className="px-4 py-2 bg-[#f59e0b] text-black rounded-lg font-medium hover:bg-[#d97706] transition"
                >
                  + Ajouter une saison
                </button>
              </div>

              <div className="space-y-8">
                {careers.length === 0 ? (
                  <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-8 text-center text-gray-400">
                    Aucune saison enregistrée
                  </div>
                ) : (
                  careers.map((career) => (
                    <div key={career.id} className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-8">
                      {/* En-tête avec club et badges */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-white min-w-12">
                            {career.club?.name?.substring(0, 2)?.toUpperCase() || 'NC'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xl font-bold text-white">{career.club?.name || 'Club inconnu'}</h3>
                              {career.isCaptain && (
                                <span className="px-2 py-1 bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] rounded text-xs font-medium">
                                  Capitaine
                                </span>
                              )}
                              {career.isChampionWinner && (
                                <span className="px-2 py-1 bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] rounded text-xs font-medium">
                                  Champion {career.nameOfChampionship && `- ${career.nameOfChampionship}`}
                                </span>
                              )}
                              {career.isInternationalPlayer && (
                                <span className="px-2 py-1 bg-[#7C3AED]/20 border border-[#7C3AED] text-[#7C3AED] rounded text-xs font-medium">
                                  International {career.internationalTeamName}
                                </span>
                              )}
                              {career.isUpgraded && (
                                <span className="px-2 py-1 bg-[#3B82F6]/20 border border-[#3B82F6] text-[#3B82F6] rounded text-xs font-medium">
                                  Surclassé
                                </span>
                              )}
                              {career.isChangedClub && (
                                <span className="px-2 py-1 bg-[#F97316]/20 border border-[#F97316] text-[#F97316] rounded text-xs font-medium">
                                  Transfert mi-saison {career.aboutClubChanging && `- ${career.aboutClubChanging}`}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm mt-1">
                              {career.category && <span className="text-[#f59e0b]">{career.category} • </span>}
                              {career.competition} • {career.season}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteCareer(career.id)}
                          className="text-gray-500 hover:text-red-400 transition p-2"
                          title="Supprimer cette saison"
                        >
                          <Trash size={20} />
                        </button>
                      </div>

                      {/* Logos */}
                      <div className="grid grid-cols-2 gap-6 mb-8 p-4 bg-[#0a0a0a] rounded-lg">
                        <div>
                          <p className="text-gray-400 text-sm mb-3">Logo club</p>
                          <label className="block w-full border-2 border-dashed border-gray-700 rounded-lg p-4 h-32 flex flex-col items-center justify-center hover:border-[#f59e0b] transition cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleUploadClubLogo(career.id, file)
                              }}
                              disabled={uploadingLogos[career.id]?.club}
                              className="hidden"
                            />
                            {uploadingLogos[career.id]?.club ? (
                              <>
                                <div className="w-6 h-6 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin mb-2"></div>
                                <p className="text-xs text-[#f59e0b]">Upload...</p>
                              </>
                            ) : career.clubLogo ? (
                              <>
                                <img src={career.clubLogo} alt="Logo club" className="w-16 h-16 object-contain" />
                                <p className="text-xs text-gray-400 mt-2">Changer logo</p>
                              </>
                            ) : (
                              <>
                                <Upload size={24} className="text-gray-600 mb-2" />
                                <p className="text-xs text-gray-400">Ajouter logo</p>
                              </>
                            )}
                          </label>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm mb-3">Logo compétition</p>
                          <label className="block w-full border-2 border-dashed border-gray-700 rounded-lg p-4 h-32 flex flex-col items-center justify-center hover:border-[#f59e0b] transition cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleUploadCompetitionLogo(career.id, file)
                              }}
                              disabled={uploadingLogos[career.id]?.competition}
                              className="hidden"
                            />
                            {uploadingLogos[career.id]?.competition ? (
                              <>
                                <div className="w-6 h-6 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin mb-2"></div>
                                <p className="text-xs text-[#f59e0b]">Upload...</p>
                              </>
                            ) : career.competitionLogo ? (
                              <>
                                <img src={career.competitionLogo} alt="Logo compétition" className="w-16 h-16 object-contain" />
                                <p className="text-xs text-gray-400 mt-2">Changer logo</p>
                              </>
                            ) : (
                              <>
                                <Upload size={24} className="text-gray-600 mb-2" />
                                <p className="text-xs text-gray-400">Ajouter logo</p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Badges / Accomplissements éditables */}
                      <div className="mb-6 p-4 bg-[#0a0a0a] rounded-lg">
                        <p className="text-gray-400 text-sm font-medium mb-4">Accomplissements</p>
                        <div className="flex flex-wrap gap-3">
                          {/* Capitaine */}
                          <button
                            type="button"
                            onClick={() => {
                              setCareers(careers.map(c =>
                                c.id === career.id
                                  ? { ...c, isCaptain: !c.isCaptain }
                                  : c
                              ))
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              career.isCaptain
                                ? 'bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700]'
                                : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                            }`}
                          >
                            <span>👑</span>
                            <span className="text-sm font-medium">Capitaine</span>
                          </button>

                          {/* Champion */}
                          <button
                            type="button"
                            onClick={() => {
                              setCareers(careers.map(c =>
                                c.id === career.id
                                  ? { ...c, isChampionWinner: !c.isChampionWinner }
                                  : c
                              ))
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              career.isChampionWinner
                                ? 'bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700]'
                                : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                            }`}
                          >
                            <span>🏆</span>
                            <span className="text-sm font-medium">Champion</span>
                          </button>

                          {/* Surclassé */}
                          <button
                            type="button"
                            onClick={() => {
                              setCareers(careers.map(c =>
                                c.id === career.id
                                  ? { ...c, isUpgraded: !c.isUpgraded }
                                  : c
                              ))
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              career.isUpgraded
                                ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#3B82F6]'
                                : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                            }`}
                          >
                            <span>⬆️</span>
                            <span className="text-sm font-medium">Surclassé</span>
                          </button>
                          <button
                                type="button"
                                onClick={() => {
                                  setCareers(careers.map(c =>
                                    c.id === career.id
                                      ? { ...c, isChangedClub: !c.isChangedClub }
                                      : c
                                  ))
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                  career.isChangedClub
                                    ? 'bg-[#F97316]/20 border-[#F97316] text-[#F97316]'
                                    : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                                }`}
                            >
                            <span>🔄</span>
                            <span className="text-sm font-medium">Transfert mi-saison</span>
                          </button>
                        </div>

                        {/* Nom du championnat si champion */}
                        {career.isChampionWinner && (
                          <div className="mt-4">
                            <label className="block text-xs text-gray-500 mb-2">Nom du championnat</label>
                            <input
                              type="text"
                              placeholder="Ex: Championnat U19 National"
                              value={career.nameOfChampionship || ''}
                              onChange={(e) => {
                                setCareers(careers.map(c =>
                                  c.id === career.id
                                    ? { ...c, nameOfChampionship: e.target.value }
                                    : c
                                ))
                              }}
                              className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#f59e0b] focus:outline-none text-sm"
                            />
                          </div>
                        )}
                        {/* Détails du transfert si changement de club */}
{career.isChangedClub && (
  <div className="mt-4">
    <label className="block text-xs text-gray-500 mb-2">Précisions sur le transfert</label>
    <input
      type="text"
      placeholder="Ex: Prêt depuis le PSG en janvier, Transfert mercato hivernal..."
      value={career.aboutClubChanging || ''}
      onChange={(e) => {
        setCareers(careers.map(c =>
          c.id === career.id
            ? { ...c, aboutClubChanging: e.target.value }
            : c
        ))
      }}
      className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#F97316] focus:outline-none text-sm"
    />
  </div>
)}
                      </div>

                      {/* Statistiques */}
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-4">Statistiques</p>
                        <div className={`grid gap-4 ${player.primaryPost === 'GB' ? 'grid-cols-3' : 'grid-cols-4'}`}>
                          <div>
                            <label className="block text-xs text-gray-500 mb-2">Matchs joués</label>
                            <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg p-2">
                              <input
                                type="number"
                                value={career.stats?.matches || 0}
                                onChange={(e) => {
                                  setCareers(careers.map(c =>
                                    c.id === career.id
                                      ? { ...c, stats: { ...c.stats, matches: parseInt(e.target.value) || 0 } }
                                      : c
                                  ))
                                }}
                                className="bg-transparent border-0 text-white font-bold text-lg w-full focus:outline-none"
                              />
                            </div>
                          </div>
                          
                          {/* Gardien: Clean sheets */}
                          {player.primaryPost === 'GB' ? (
                            <div>
                              <label className="block text-xs text-gray-500 mb-2">Clean sheets</label>
                              <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg p-2">
                                <input
                                  type="number"
                                  value={career.stats?.cleanSheet || 0}
                                  onChange={(e) => {
                                    setCareers(careers.map(c =>
                                      c.id === career.id
                                        ? { ...c, stats: { ...c.stats, cleanSheet: parseInt(e.target.value) || 0 } }
                                        : c
                                    ))
                                  }}
                                  className="bg-transparent border-0 text-purple-400 font-bold text-lg w-full focus:outline-none"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <div>
                                <label className="block text-xs text-gray-500 mb-2">Buts</label>
                                <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg p-2">
                                  <input
                                    type="number"
                                    value={career.stats?.goals || 0}
                                    onChange={(e) => {
                                      setCareers(careers.map(c =>
                                        c.id === career.id
                                          ? { ...c, stats: { ...c.stats, goals: parseInt(e.target.value) || 0 } }
                                          : c
                                      ))
                                    }}
                                    className="bg-transparent border-0 text-[#f59e0b] font-bold text-lg w-full focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-2">Passes D.</label>
                                <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg p-2">
                                  <input
                                    type="number"
                                    value={career.stats?.assists || 0}
                                    onChange={(e) => {
                                      setCareers(careers.map(c =>
                                        c.id === career.id
                                          ? { ...c, stats: { ...c.stats, assists: parseInt(e.target.value) || 0 } }
                                          : c
                                      ))
                                    }}
                                    className="bg-transparent border-0 text-[#22c55e] font-bold text-lg w-full focus:outline-none"
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          <div>
                            <label className="block text-xs text-gray-500 mb-2">Temps moyen</label>
                            <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg p-2">
                              <input
                                type="number"
                                value={career.stats?.averagePlayingTime || 0}
                                onChange={(e) => {
                                  setCareers(careers.map(c =>
                                    c.id === career.id
                                      ? { ...c, stats: { ...c.stats, averagePlayingTime: parseInt(e.target.value) || 0 } }
                                      : c
                                  ))
                                }}
                                className="bg-transparent border-0 text-blue-400 font-bold text-lg w-full focus:outline-none"
                              />
                              <span className="text-gray-500 text-xs">min</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bouton sauvegarder */}
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={async () => {
                            try {
                              await fetch(`${API_URL}/api/careers/${career.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  season: career.season,
                                  competition: career.competition,
                                  category: career.category,
                                  startDate: career.startDate,
                                  endDate: career.endDate,
                                  isInternationalPlayer: career.isInternationalPlayer,
                                  internationalTeamName: career.internationalTeamName,
                                  aboutInternationalSelection: career.aboutInternationalSelection,
                                  isCaptain: career.isCaptain,
                                  isChampionWinner: career.isChampionWinner,
                                  nameOfChampionship: career.nameOfChampionship,
                                  isUpgraded: career.isUpgraded,
                                  isChangedClub: career.isChangedClub,        
                                  aboutClubChanging: career.aboutClubChanging,   
                                  stats: career.stats
                                })
                              })
                              alert('Saison mise à jour !')
                            } catch (error) {
                              alert('Erreur lors de la mise à jour')
                            }
                          }}
                          className="px-6 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-black rounded-lg font-medium transition"
                        >
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* ==================== MODAL D'AJOUT DE CARRIÈRE ==================== */}
              {showCareerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
                  <div className="bg-[#141414] rounded-2xl p-8 w-full max-w-4xl border border-gray-800 my-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Ajouter une saison</h3>

                    <div className="space-y-6">
                      {/* Section 1: Infos de base */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Club *</label>
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
                          <label className="block text-sm text-gray-400 mb-2">Saison *</label>
                          <input
                            type="text"
                            placeholder="2024-2025"
                            value={newCareer.season}
                            onChange={(e) => setNewCareer({ ...newCareer, season: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Compétition *</label>
                          <input
                            type="text"
                            placeholder="Ex: Ligue 1, National 2..."
                            value={newCareer.competition}
                            onChange={(e) => setNewCareer({ ...newCareer, competition: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Catégorie</label>
                          <select
                            value={newCareer.category}
                            onChange={(e) => setNewCareer({ ...newCareer, category: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                          >
                            <option value="">Sélectionnez</option>
                            <option value="U15">U15</option>
                            <option value="U16">U16</option>
                            <option value="U17">U17</option>
                            <option value="U18">U18</option>
                            <option value="U19">U19</option>
                            <option value="U21">U21</option>
                            <option value="U23">U23</option>
                            <option value="Reserve">Réserve</option>
                            <option value="Senior">Séniors</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Date début *</label>
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

                      {/* Section 2: Badges/Accomplissements */}
                      <div className="bg-[#0a0a0a] rounded-xl p-4">
                        <h4 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                          <Award size={18} className="text-[#FFD700]" />
                          Accomplissements
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          {/* Capitaine */}
                          <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-500">👑</span>
                              <span className="text-white text-sm">Capitaine</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewCareer({ ...newCareer, isCaptain: !newCareer.isCaptain })}
                              className={`w-12 h-6 rounded-full transition-colors ${
                                newCareer.isCaptain ? 'bg-[#f59e0b]' : 'bg-gray-600'
                              }`}
                            >
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                newCareer.isCaptain ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </button>
                          </div>

                          {/* Champion */}
                          <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-500">🏆</span>
                              <span className="text-white text-sm">Champion</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewCareer({ ...newCareer, isChampionWinner: !newCareer.isChampionWinner })}
                              className={`w-12 h-6 rounded-full transition-colors ${
                                newCareer.isChampionWinner ? 'bg-[#f59e0b]' : 'bg-gray-600'
                              }`}
                            >
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                newCareer.isChampionWinner ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-500">⬆️</span>
                              <span className="text-white text-sm">Surclassé</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewCareer({ ...newCareer, isUpgraded: !newCareer.isUpgraded })}
                              className={`w-12 h-6 rounded-full transition-colors ${
                                newCareer.isUpgraded ? 'bg-[#3B82F6]' : 'bg-gray-600'
                              }`}
                            >
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                newCareer.isUpgraded ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </button>
                          </div>
                        </div>

                        {/* Nom du championnat si champion */}
                        {newCareer.isChampionWinner && (
                          <div className="mt-4">
                            <label className="block text-sm text-gray-400 mb-2">Nom du championnat</label>
                            <input
                              type="text"
                              placeholder="Ex: Championnat U19 National"
                              value={newCareer.nameOfChampionship}
                              onChange={(e) => setNewCareer({ ...newCareer, nameOfChampionship: e.target.value })}
                              className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                            />
                          </div>
                        )}
                        
                      </div>
{/* Section: Transfert en cours de saison */}
<div className="bg-[#0a0a0a] rounded-xl p-4">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <span className="text-xl">🔄</span>
      <h4 className="text-md font-bold text-white">Transfert en cours de saison</h4>
      <span className="text-xs text-gray-500">Mercato hivernal, prêt...</span>
    </div>
    <button
      type="button"
      onClick={() => setNewCareer({ ...newCareer, isChangedClub: !newCareer.isChangedClub })}
      className={`w-12 h-6 rounded-full transition-colors ${
        newCareer.isChangedClub ? 'bg-[#F97316]' : 'bg-gray-600'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
        newCareer.isChangedClub ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  </div>

  {newCareer.isChangedClub && (
    <div className="space-y-1 mt-4 pt-4 border-t border-gray-800">
      <label className="text-sm text-gray-400 mb-2 block">Précisions sur le transfert</label>
      <textarea
        placeholder="Ex: Arrivé en prêt du PSG en janvier, Transfert définitif mercato hivernal depuis l'OL..."
        value={newCareer.aboutClubChanging}
        onChange={(e) => setNewCareer({ ...newCareer, aboutClubChanging: e.target.value })}
        rows={2}
        className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#F97316] focus:outline-none resize-none"
      />
    </div>
  )}
</div>
                      {/* Section 3: Joueur International */}
                      <div className="bg-[#0a0a0a] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Globe size={18} className="text-[#7C3AED]" />
                            <h4 className="text-md font-bold text-white">Joueur international</h4>
                            <span className="text-xs text-gray-500">Sélectionné(e) en équipe nationale</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNewCareer({ ...newCareer, isInternationalPlayer: !newCareer.isInternationalPlayer })}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              newCareer.isInternationalPlayer ? 'bg-[#7C3AED]' : 'bg-gray-600'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              newCareer.isInternationalPlayer ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                 
{newCareer.isInternationalPlayer && (
  <div className="space-y-4 mt-4 pt-4 border-t border-gray-800">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Sélection / Équipe nationale</label>
        <select
          value={newCareer.internationalTeamName}
          onChange={(e) => setNewCareer({ ...newCareer, internationalTeamName: e.target.value })}
          className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
        >
          <option value="">Sélectionner un pays...</option>
          {Object.entries(NATIONAL_TEAMS).map(([confederation, teams]) => (
            <optgroup key={confederation} label={confederation}>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-2">Catégorie internationale</label>
        <select
          value={newCareer.internationalCategory}
          onChange={(e) => setNewCareer({ ...newCareer, internationalCategory: e.target.value })}
          className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
        >
          <option value="">Sélectionnez</option>
          {INTERNATIONAL_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
    <div>
      <label className="block text-sm text-gray-400 mb-2">À propos de la sélection (optionnel)</label>
      <textarea
        placeholder="Ex: Première sélection avec le Maroc U18, participation à la CAN U17..."
        value={newCareer.aboutInternationalSelection}
        onChange={(e) => setNewCareer({ ...newCareer, aboutInternationalSelection: e.target.value })}
        rows={2}
        className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none resize-none"
      />
    </div>
  </div>
)}
                      </div>

                      {/* Section 4: Statistiques */}
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4">Statistiques</h4>
                        <div className={`grid gap-4 ${player.primaryPost === 'GB' ? 'grid-cols-3' : 'grid-cols-4'}`}>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Matchs *</label>
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
                          
                          {/* Gardien: Clean sheets */}
                          {player.primaryPost === 'GB' ? (
                            <div>
                              <label className="block text-sm text-gray-400 mb-2">Clean sheets</label>
                              <input
                                type="number"
                                value={newCareer.stats.cleanSheet}
                                onChange={(e) => setNewCareer({
                                  ...newCareer,
                                  stats: { ...newCareer.stats, cleanSheet: parseInt(e.target.value) || 0 }
                                })}
                                className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                              />
                            </div>
                          ) : (
                            <>
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
                                <label className="block text-sm text-gray-400 mb-2">Passes D.</label>
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
                            </>
                          )}

                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Temps moyen (min)</label>
                            <input
                              type="number"
                              value={newCareer.stats.averagePlayingTime}
                              onChange={(e) => setNewCareer({
                                ...newCareer,
                                stats: { ...newCareer.stats, averagePlayingTime: parseInt(e.target.value) || 0 }
                              })}
                              className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Boutons */}
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
                        Ajouter la saison
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Section Formation */}
<div className="bg-[#1a1a1a] rounded-xl p-6 mt-6">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-bold text-white flex items-center gap-2">
      <GraduationCap size={20} className="text-[#f59e0b]" />
      Formation ({formations.length})
    </h2>
    <button
      onClick={() => setShowFormationModal(true)}
      className="px-4 py-2 bg-[#f59e0b] text-black rounded-lg font-medium hover:bg-[#d97706] transition text-sm"
    >
      + Ajouter
    </button>
  </div>

  {formations.length === 0 ? (
    <p className="text-gray-400 text-center py-4">Aucune formation enregistrée</p>
  ) : (
    <div className="space-y-4">
      {formations.map((formation) => (
        <div key={formation.id} className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800">
          {editingFormation?.id === formation.id ? (
            // Mode édition
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Établissement</label>
                  <input
                    type="text"
                    value={editingFormation.institution}
                    onChange={(e) => setEditingFormation({ ...editingFormation, institution: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#f59e0b] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Diplôme</label>
                  <input
                    type="text"
                    value={editingFormation.diploma}
                    onChange={(e) => setEditingFormation({ ...editingFormation, diploma: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#f59e0b] focus:outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Année début</label>
                  <input
                    type="number"
                    value={editingFormation.startYear}
                    onChange={(e) => setEditingFormation({ ...editingFormation, startYear: parseInt(e.target.value) })}
                    className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#f59e0b] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Année fin</label>
                  <input
                    type="number"
                    value={editingFormation.endYear}
                    onChange={(e) => setEditingFormation({ ...editingFormation, endYear: parseInt(e.target.value) })}
                    className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#f59e0b] focus:outline-none text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setEditingFormation(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleUpdateFormation(formation.id, editingFormation)}
                  className="px-4 py-2 bg-[#22c55e] text-black rounded-lg text-sm font-medium hover:bg-[#16a34a] transition"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          ) : (
            // Mode affichage
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[#f59e0b] font-bold">{formation.startYear} - {formation.endYear}</span>
                  <h4 className="text-white font-medium">{formation.institution}</h4>
                </div>
                <p className="text-gray-400 text-sm mt-1">{formation.diploma}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingFormation({ ...formation })}
                  className="p-2 text-gray-400 hover:text-[#f59e0b] transition"
                  title="Modifier"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteFormation(formation.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition"
                  title="Supprimer"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>

{/* Modal d'ajout de formation */}
{showFormationModal && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-lg border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <GraduationCap size={20} className="text-[#f59e0b]" />
        Ajouter une formation
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Établissement *</label>
          <input
            type="text"
            placeholder="Ex: Lycée Sport-Études Jean Moulin"
            value={newFormation.institution}
            onChange={(e) => setNewFormation({ ...newFormation, institution: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Diplôme *</label>
          <input
            type="text"
            placeholder="Ex: Baccalauréat STMG"
            value={newFormation.diploma}
            onChange={(e) => setNewFormation({ ...newFormation, diploma: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Année début *</label>
            <input
              type="number"
              min="2000"
              max="2030"
              value={newFormation.startYear}
              onChange={(e) => setNewFormation({ ...newFormation, startYear: parseInt(e.target.value) })}
              className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Année fin *</label>
            <input
              type="number"
              min="2000"
              max="2030"
              value={newFormation.endYear}
              onChange={(e) => setNewFormation({ ...newFormation, endYear: parseInt(e.target.value) })}
              className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => {
            setShowFormationModal(false)
            setNewFormation({
              institution: '',
              diploma: '',
              startYear: new Date().getFullYear(),
              endYear: new Date().getFullYear(),
            })
          }}
          className="flex-1 px-6 py-3 bg-[#1a1a1a] text-white rounded-lg font-medium hover:bg-[#252525] transition border border-gray-700"
        >
          Annuler
        </button>
        <button
          onClick={handleAddFormation}
          disabled={!newFormation.institution || !newFormation.diploma}
          className="flex-1 px-6 py-3 bg-[#f59e0b] text-black rounded-lg font-medium hover:bg-[#d97706] transition disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>
)}
            </div>
          )}

          {/* TAB CONTACT */}
          {activeTab === 'contact' && (
            <div className="max-w-2xl">
              <div className="bg-[#1a1a1a] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Mail size={20} className="text-[#f59e0b]" />Contact joueur
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={player.email}
                      onChange={(e) => setPlayer({ ...player, email: e.target.value })}
                      className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={player.telephone}
                      onChange={(e) => setPlayer({ ...player, telephone: e.target.value })}
                      className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Link2 size={20} className="text-[#f59e0b]" />Liens
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Statistiques</label>
                    <input
                      type="email"
                      value={player.linkStats}
                      onChange={(e) => setPlayer({ ...player, linkStats: e.target.value })}
                      className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Video</label>
                    <input
                      type="tel"
                      value={player.linkVideo}
                      onChange={(e) => setPlayer({ ...player, linkVideo: e.target.value })}
                      className="w-full bg-[#262626] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}