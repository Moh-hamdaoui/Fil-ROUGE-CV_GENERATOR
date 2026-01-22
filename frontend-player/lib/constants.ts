// Liste des nationalités
export const NATIONALITIES = [
  "Française", "Marocaine", "Algérienne", "Tunisienne", "Sénégalaise",
  "Ivoirienne", "Camerounaise", "Malienne", "Guinéenne", "Congolaise",
  "Belge", "Suisse", "Espagnole", "Portugaise", "Italienne",
  "Allemande", "Anglaise", "Néerlandaise", "Brésilienne", "Argentine",
  "Autre"
]

// Divisions
export const DIVISIONS = [
  'Ligue 1', 'Ligue 2', 'National', 'National 2', 'National 3',
  'Régional 1', 'Régional 2', 'Régional 3',
  'Départemental 1', 'Départemental 2', 'Départemental 3',
  'D1 Arkema', 'D2 Féminine', 'D3 Féminine',
  'Serie A', 'Serie B', 'La Liga', 'Premier League',
  'Bundesliga', 'Eredivisie', 'Liga Portugal',
  'Autre'
]

// Catégories d'âge
export const CATEGORIES = [
  'U13', 'U14', 'U15', 'U16', 'U17', 'U18', 'U19', 'U20', 'U21', 'U23',
  'Réserve', 'Séniors'
]

// Saisons disponibles
export const SEASONS = Array.from({ length: 10 }, (_, i) => {
  const year = 2016 + i
  return `${year}/${year + 1}`
})

// Qualités par catégorie
export const QUALITIES_BY_CATEGORY: Record<string, string[]> = {
  'Technique': [
    'Dribble', 'Contrôle de balle', 'Passes précises', 'Passes longues',
    'Tir puissant', 'Tir précis', 'Jeu de tête', 'Centres', 'Coups de pied arrêtés',
    'Technique sous pression', 'Première touche', 'Jeu en une touche'
  ],
  'Physique': [
    'Vitesse', 'Accélération', 'Endurance', 'Puissance', 'Détente verticale',
    'Agilité', 'Résistance', 'Équilibre', 'Force dans les duels'
  ],
  'Mental': [
    'Leadership', 'Vision du jeu', 'Intelligence tactique', 'Sang-froid',
    'Combativité', 'Concentration', 'Prise de décision', 'Communication',
    'Mentalité de gagnant', 'Régularité'
  ],
  'Défensif': [
    'Tacle', 'Interception', 'Marquage', 'Jeu aérien défensif',
    'Placement défensif', 'Anticipation', 'Couverture', 'Lecture du jeu'
  ],
  'Gardien': [
    'Arrêts réflexes', 'Jeu au pied', 'Sorties aériennes', 'Un contre un',
    'Placement', 'Communication', 'Relances longues', 'Jeu au sol'
  ]
}

// Postes pour 4-3-3
export const POSITIONS_433: Record<string, { x: number; y: number; label: string }> = {
  "GB": { x: 50, y: 90, label: "Gardien" },
  "DG": { x: 15, y: 72, label: "Défenseur Gauche" },
  "DC": { x: 38, y: 78, label: "Défenseur Central G" },
  "DC2": { x: 62, y: 78, label: "Défenseur Central D" },
  "DD": { x: 85, y: 72, label: "Défenseur Droit" },
  "MDC": { x: 50, y: 58, label: "Milieu Défensif" },
  "MC": { x: 35, y: 48, label: "Milieu Central G" },
  "MC2": { x: 65, y: 48, label: "Milieu Central D" },
  "AG": { x: 15, y: 22, label: "Ailier Gauche" },
  "BU": { x: 50, y: 15, label: "Buteur" },
  "AD": { x: 85, y: 22, label: "Ailier Droit" },
}

// Postes pour 3-5-2
export const POSITIONS_352: Record<string, { x: number; y: number; label: string }> = {
  "GB": { x: 50, y: 90, label: "Gardien" },
  "DCG": { x: 25, y: 75, label: "Défenseur Central G" },
  "DC": { x: 50, y: 78, label: "Défenseur Central" },
  "DCD": { x: 75, y: 75, label: "Défenseur Central D" },
  "PG": { x: 10, y: 55, label: "Piston Gauche" },
  "PD": { x: 90, y: 55, label: "Piston Droit" },
  "MDC": { x: 50, y: 58, label: "Milieu Défensif" },
  "MC": { x: 35, y: 45, label: "Milieu Central G" },
  "MOC": { x: 65, y: 45, label: "Milieu Offensif" },
  "BU": { x: 35, y: 18, label: "Attaquant G" },
  "BU2": { x: 65, y: 18, label: "Attaquant D" },
}

// Labels des postes
export const POSITION_LABELS: Record<string, string> = {
  'GB': 'Gardien',
  'DG': 'Défenseur Gauche',
  'DC': 'Défenseur Central',
  'DC2': 'Défenseur Central',
  'DCG': 'Défenseur Central Gauche',
  'DCD': 'Défenseur Central Droit',
  'DD': 'Défenseur Droit',
  'PG': 'Piston Gauche',
  'PD': 'Piston Droit',
  'MDC': 'Milieu Défensif Central',
  'MC': 'Milieu Central',
  'MC2': 'Milieu Central',
  'MOC': 'Milieu Offensif Central',
  'MG': 'Milieu Gauche',
  'MD': 'Milieu Droit',
  'AG': 'Ailier Gauche',
  'AD': 'Ailier Droit',
  'BU': 'Buteur',
  'BU2': 'Buteur',
  'ATT': 'Attaquant',
}