import { z } from 'zod'

export const profileSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  gender: z.enum(["Homme", "Femme"]).refine((val) => !!val, {
    message: "Sélectionnez votre genre",
  }),    
  dateOfBirth: z.string().min(1, "La date de naissance est requise"),
  nationality: z.string().min(2, "La nationalité est requise"),
  secondaryNationality: z.string().optional(),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Numéro de téléphone invalide"),
  photo: z.string().optional(),
})

export const physicalSchema = z.object({
  size: z.number().min(100, "Taille minimum 100 cm").max(250, "Taille maximum 250 cm"),
  weight: z.number().min(30, "Poids minimum 30 kg").max(150, "Poids maximum 150 kg"),
  strongFoot: z
  .enum(["Droit", "Gauche", "Ambidextre"])
  .refine((val) => !!val, {
    message: "Sélectionnez votre pied fort",
  }),
  vma: z.number().optional().nullable(),
})

export const positionSchema = z.object({
  favoriteTactic: z
  .enum(["4-3-3", "3-5-2"])
  .refine((value) => value !== undefined, {
    message: "Sélectionnez une formation",
  }),
  primaryPost: z.string().min(1, "Le poste principal est requis"),
  secondaryPost: z.string().optional(),
})

export const qualitiesSchema = z.object({
  qualities: z.array(z.object({
    category: z.string(),
    quality: z.string(),
  })).min(1, "Sélectionnez au moins une qualité").max(6, "Maximum 6 qualités"),
})

export const careerItemSchema = z.object({
  clubName: z.string().min(2, "Le nom du club est requis"),
  season: z.string().min(1, "La saison est requise"),
  competition: z.string().min(1, "La compétition est requise"),
  category: z.string().optional(),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().optional(),
  isCaptain: z.boolean().default(false),
  isChampionWinner: z.boolean().default(false),
  nameOfChampionship: z.string().optional(),
  isInternationalPlayer: z.boolean().default(false),
  internationalTeamName: z.string().optional(),
  internationalCategory: z.string().optional(),
  isChangedClub: z.string().optional(),
  aboutClubChanging: z.string().optional(),
  aboutInternationalSelection: z.string().optional(),
  stats: z.object({
    matches: z.number().nullable().optional(),
    goals: z.number().nullable().optional(),
    assists: z.number().nullable().optional(),
    cleanSheet: z.number().nullable().optional(),
    averagePlayingTime: z.number().nullable().optional(),
  }),
})

export const careerSchema = z.object({
  careers: z.array(careerItemSchema).min(1, "Ajoutez au moins une saison"),
})

export const formationItemSchema = z.object({
  institution: z.string().min(2, "L'établissement est requis"),
  diploma: z.string().min(2, "Le diplôme est requis"),
  startYear: z.number().min(2000).max(2030),
  endYear: z.number().min(2000).max(2030),
})

export const formationSchema = z.object({
  formations: z.array(formationItemSchema).optional(),
})

export const linksSchema = z.object({
  linkVideo: z.string().url("URL invalide").optional().or(z.literal('')),
  linkStats: z.string().url("URL invalide").optional().or(z.literal('')),
})

export type ProfileData = z.infer<typeof profileSchema>
export type PhysicalData = z.infer<typeof physicalSchema>
export type PositionData = z.infer<typeof positionSchema>
export type QualitiesData = z.infer<typeof qualitiesSchema>
export type CareerItemData = z.infer<typeof careerItemSchema>
export type CareerData = z.infer<typeof careerSchema>
export type FormationItemData = z.infer<typeof formationItemSchema>
export type FormationData = z.infer<typeof formationSchema>
export type LinksData = z.infer<typeof linksSchema>
