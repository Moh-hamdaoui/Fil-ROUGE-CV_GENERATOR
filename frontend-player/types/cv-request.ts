// Types pour le formulaire de demande CV sportif

export type Position =
  | 'GB'   // Gardien de but
  | 'DG'   // Défenseur Gauche
  | 'DC'   // Défenseur Central
  | 'DD'   // Défenseur Droit
  | 'PG'   // Piston Gauche (3-5-2)
  | 'PD'   // Piston Droit (3-5-2)
  | 'MDC'  // Milieu Défensif Central
  | 'MG'   // Milieu Gauche
  | 'MC'   // Milieu Central
  | 'MD'   // Milieu Droit
  | 'MOC'  // Milieu Offensif Central
  | 'AG'   // Ailier Gauche
  | 'AD'   // Ailier Droit
  | 'BU'   // Buteur
  | 'AC'   // Avant-Centre

export type Formation = '4-3-3' | '3-5-2'

export type StrongFoot = 'Gauche' | 'Droit' | 'Les deux'

export type Gender = 'Homme' | 'Femme'

export type QualityCategory = 'Technique' | 'Physique' | 'Mental' | 'Défensif' | 'Offensif'

export interface Quality {
  category: QualityCategory
  name: string
}

export interface SeasonStats {
  matches: number
  goals: number
  assists: number
  cleanSheets?: number
  averagePlayingTime: number
}

export interface SeasonCareer {
  id: string
  season: string
  period: 'Saison complète' | 'Demi-saison' | 'Prêt'
  clubName: string
  clubLogo?: string
  competition: string
  competitionLogo?: string
  stats: SeasonStats
  isCaptain: boolean
  isChampionWinner: boolean
  championshipName?: string
  isUpgraded: boolean // Surclassé
  isGoalkeeper: boolean
}

export interface InternationalCareer {
  isInternational: boolean
  teamName?: string
  category?: string // U17, U19, U21, A
}

export interface ProfileData {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: Gender
  nationality: string
  secondaryNationality?: string
  size: number
  weight: number
  strongFoot: StrongFoot
  photo?: string
  additionalInfo?: string
}

export interface PositionData {
  primaryPost: Position
  secondaryPost?: Position
  additionalPosts: Position[]
  preferredFormation: Formation
  additionalInfo?: string
}

export interface QualitiesData {
  selectedQualities: Quality[]
  additionalInfo?: string
}

export interface CareerData {
  seasons: SeasonCareer[]
  international: InternationalCareer
  additionalInfo?: string
}

export interface CVRequestFormData {
  profile: ProfileData
  position: PositionData
  qualities: QualitiesData
  career: CareerData
}

// Constantes pour les listes déroulantes
export const POSITIONS: { value: Position; label: string }[] = [
  { value: 'GB', label: 'Gardien de but' },
  { value: 'DG', label: 'Défenseur Gauche' },
  { value: 'DC', label: 'Défenseur Central' },
  { value: 'DD', label: 'Défenseur Droit' },
  { value: 'PG', label: 'Piston Gauche' },
  { value: 'PD', label: 'Piston Droit' },
  { value: 'MDC', label: 'Milieu Défensif Central' },
  { value: 'MG', label: 'Milieu Gauche' },
  { value: 'MC', label: 'Milieu Central' },
  { value: 'MD', label: 'Milieu Droit' },
  { value: 'MOC', label: 'Milieu Offensif Central' },
  { value: 'AG', label: 'Ailier Gauche' },
  { value: 'AD', label: 'Ailier Droit' },
  { value: 'BU', label: 'Buteur' },
  { value: 'AC', label: 'Avant-Centre' },
]

export const FORMATIONS: { value: Formation; label: string }[] = [
  { value: '4-3-3', label: '4-3-3' },
  { value: '3-5-2', label: '3-5-2' },
]

export const SEASONS = [
  '2025/2026',
  '2024/2025',
  '2023/2024',
  '2022/2023',
  '2021/2022',
  '2020/2021',
]

export const INTERNATIONAL_CATEGORIES = [
  'U16',
  'U17',
  'U18',
  'U19',
  'U20',
  'U21',
  'U23',
  'Équipe A',
]

export const QUALITIES_BY_CATEGORY: Record<QualityCategory, string[]> = {
  Technique: [
    'Dribble',
    'Passes précises',
    'Vision de passe',
    'Tir puissant',
    'Tir placé',
    'Frappe lointaine',
    'Jeu court',
    'Jeu long',
    'Contrôle de balle',
    'Jeu en une touche',
    'Jeu de volée',
    'Centre',
    'Conduite de balle',
    'Qualité de frappe',
  ],
  Physique: [
    'Vitesse',
    'Accélération',
    'Endurance',
    'Puissance',
    'Explosivité',
    'Détente verticale',
    'Agilité',
    'Équilibre',
    'Résistance',
    'Robustesse',
    'Mobilité',
    'Capacité de répétition',
  ],
  Mental: [
    'Leadership',
    'Vision du jeu',
    'Intelligence tactique',
    'Sang-froid',
    'Concentration',
    'Combativité',
    'Discipline',
    'Prise de décision',
    'Gestion du stress',
    'Esprit collectif',
    'Mental gagnant',
    'Régularité',
  ],
  Défensif: [
    'Tacle',
    'Interception',
    'Marquage',
    'Placement défensif',
    'Anticipation',
    'Duel défensif',
    'Jeu aérien défensif',
    'Lecture du jeu',
    'Pressing',
    'Contre-pressing',
    'Rigueur défensive',
  ],
  Offensif: [
    'Appels de balle',
    'Finition',
    'Sang-froid devant le but',
    'Jeu sans ballon',
    'Percussion',
    'Créativité',
    'Sens du but',
    'Jeu entre les lignes',
  ],
}