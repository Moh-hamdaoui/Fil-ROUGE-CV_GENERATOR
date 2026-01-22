import { create } from 'zustand'

// Types pour les données du joueur
export interface CareerData {
  clubId: string
  clubName: string
  season: string
  competition: string
  category: string
  startDate: string
  endDate: string
  isCaptain: boolean
  isChampionWinner: boolean
  nameOfChampionship: string
  isInternationalPlayer: boolean
  internationalTeamName: string
  aboutInternationalSelection: string
  stats: {
    matches: number | null
    goals: number | null
    assists: number | null
    cleanSheet: number | null
    averagePlayingTime: number | null
  }
}

export interface FormationData {
  institution: string
  diploma: string
  startYear: number | null
  endYear: number | null
}

export interface PlayerData {
  // Étape 1: Profil
  firstName: string
  lastName: string
  dateOfBirth: string
  nationality: string
  secondaryNationality: string
  email: string
  telephone: string
  photo: string
  
  // Étape 2: Physique
  size: number | null
  weight: number | null
  strongFoot: string
  vma: number | null
  
  // Étape 3: Poste
  favoriteTactic: string
  primaryPost: string
  secondaryPost: string
  
  // Étape 4: Qualités
  qualities: { category: string; quality: string }[]
  
  // Étape 5: Carrière
  careers: CareerData[]
  
  // Étape 6: Formation
  formations: FormationData[]
  
  // Étape 7: Liens
  linkVideo: string
  linkStats: string
}

interface PlayerStore {
  currentStep: number
  data: Partial<PlayerData>
  setStep: (step: number) => void
  updateData: (newData: Partial<PlayerData>) => void
  resetForm: () => void
}

const initialData: Partial<PlayerData> = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  nationality: '',
  secondaryNationality: '',
  email: '',
  telephone: '',
  photo: '',
  size: null,
  weight: null,
  strongFoot: '',
  vma: null,
  favoriteTactic: '4-3-3',
  primaryPost: '',
  secondaryPost: '',
  qualities: [],
  careers: [],
  formations: [],
  linkVideo: '',
  linkStats: '',
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentStep: 1,
  data: initialData,
  
  setStep: (step) => set({ currentStep: step }),
  
  updateData: (newData) => set((state) => ({
    data: { ...state.data, ...newData }
  })),
  
  resetForm: () => set({ currentStep: 1, data: initialData }),
}))