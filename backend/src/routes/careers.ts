import express, { Router, Request, Response, RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'

const router = Router()
const prisma = new PrismaClient()

// ==================== MULTER CONFIGURATION ====================

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|svg/
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype) {
      return cb(null, true)
    } else {
      cb(new Error('Format d\'image non supporté. Utilisez JPG, PNG, WebP ou SVG'))
    }
  },
})

// ==================== GET ====================

/**
 * GET /api/careers/player/:playerId
 * Récupère toutes les carrières d'un joueur
 */
router.get('/player/:playerId', (async (req: Request, res: Response) => {
  try {
    const playerId = Array.isArray(req.params.playerId) 
      ? req.params.playerId[0] 
      : req.params.playerId
    
    const careers = await prisma.career.findMany({
      where: { playerId: parseInt(playerId, 10) },
      include: {
        club: true,
        stats: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    })
    res.json(careers)
  } catch (error) {
    console.error('Erreur GET careers:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des carrières' })
  }
}) as RequestHandler)

/**
 * GET /api/careers/:id
 * Récupère une carrière spécifique
 */
router.get('/:id', (async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    
    const career = await prisma.career.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        club: true,
        stats: true,
      },
    })
    
    if (!career) {
      return res.status(404).json({ error: 'Carrière non trouvée' })
    }
    
    res.json(career)
  } catch (error) {
    console.error('Erreur GET career:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération de la carrière' })
  }
}) as RequestHandler)

// ==================== POST ====================

/**
 * POST /api/careers
 * Crée une nouvelle carrière avec stats
 */
router.post('/', (async (req: Request, res: Response) => {
  try {
    const { 
      playerId, 
      clubId, 
      season, 
      competition, 
      startDate, 
      endDate, 
      category,
      isInternationalPlayer,
      aboutInternationalSelection,
      internationalCategory,
      internationalTeamName,
      isCaptain,
      isChampionWinner,
      nameOfChampionship,
      isUpgraded,
      isChangedClub,
      aboutClubChanging,
      stats 
    } = req.body
    
    const career = await prisma.career.create({
      data: {
        playerId: parseInt(playerId, 10),
        clubId: parseInt(clubId, 10),
        season,
        competition,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        category: category || '',
        isInternationalPlayer: isInternationalPlayer || false,
        aboutInternationalSelection: aboutInternationalSelection || null,
        internationalTeamName: internationalTeamName || null,
        isCaptain: isCaptain || false,
        isChampionWinner: isChampionWinner || false,
        internationalCategory: internationalCategory || '',
        nameOfChampionship: nameOfChampionship || null,
        isUpgraded: isUpgraded || false, 
        clubLogo: null,
        competitionLogo: null,
        isChangedClub: isChangedClub || false,
        aboutClubChanging: aboutClubChanging || null,
        stats: stats ? {
          create: {
            matches: stats.matches || 0,
            goals: stats.goals || 0,
            assists: stats.assists || 0,
            cleanSheet: stats.cleanSheet || null,
            averagePlayingTime: stats.averagePlayingTime || 0,
          },
        } : undefined,
      },
      include: {
        club: true,
        stats: true,
      },
    })
    
    res.status(201).json(career)
  } catch (error) {
    console.error('Erreur POST career:', error)
    res.status(500).json({ error: 'Erreur lors de la création de la carrière' })
  }
}) as RequestHandler)

/**
 * POST /api/careers/:id/upload-club-logo
 * Upload le logo du club pour une carrière
 */
router.post('/:id/upload-club-logo', upload.single('logo'), (async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }

    // Convertir en base64
    const base64Logo = req.file.buffer.toString('base64')
    const dataUri = `data:${req.file.mimetype};base64,${base64Logo}`

    // Mettre à jour la carrière
    const career = await prisma.career.update({
      where: { id: parseInt(id, 10) },
      data: {
        clubLogo: dataUri,
      },
      include: {
        club: true,
        stats: true,
      },
    })

    res.json({
      success: true,
      message: 'Logo club uploadé avec succès',
      career: career,
    })
  } catch (error) {
    console.error('Erreur upload club logo:', error)
    res.status(500).json({ error: 'Erreur lors de l\'upload du logo club' })
  }
}) as RequestHandler)

/**
 * POST /api/careers/:id/upload-competition-logo
 * Upload le logo de la compétition pour une carrière
 */
router.post('/:id/upload-competition-logo', upload.single('logo'), (async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }

    // Convertir en base64
    const base64Logo = req.file.buffer.toString('base64')
    const dataUri = `data:${req.file.mimetype};base64,${base64Logo}`

    // Mettre à jour la carrière
    const career = await prisma.career.update({
      where: { id: parseInt(id, 10) },
      data: {
        competitionLogo: dataUri,
      },
      include: {
        club: true,
        stats: true,
      },
    })

    res.json({
      success: true,
      message: 'Logo compétition uploadé avec succès',
      career: career,
    })
  } catch (error) {
    console.error('Erreur upload competition logo:', error)
    res.status(500).json({ error: 'Erreur lors de l\'upload du logo compétition' })
  }
}) as RequestHandler)

// ==================== PUT ====================

/**
 * PUT /api/careers/:id
 * Met à jour une carrière existante
 */
router.put('/:id', (async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const { 
      season, 
      competition, 
      startDate, 
      endDate, 
      category,
      isInternationalPlayer,
      aboutInternationalSelection,
      internationalCategory,
      internationalTeamName,
      isCaptain,
      isChampionWinner,
      nameOfChampionship,
      isUpgraded,
      stats,
      isChangedClub,
      aboutClubChanging,
    } = req.body
    
    const career = await prisma.career.update({
      where: { id: parseInt(id, 10) },
      data: {
        season,
        competition,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        category,
        isInternationalPlayer,
        aboutInternationalSelection,
        internationalCategory,
        internationalTeamName,
        isCaptain,
        isChampionWinner,
        nameOfChampionship,
        isUpgraded,
        isChangedClub,
        aboutClubChanging,
      },
      include: {
        club: true,
        stats: true,
      },
    })
    
    // Mise à jour des stats
    if (stats) {
      await prisma.stats.upsert({
        where: {
          careerId: career.id,
        },
        update: {
          matches: stats.matches ?? 0,
          goals: stats.goals ?? 0,
          assists: stats.assists ?? 0,
          cleanSheet: stats.cleanSheet ?? null,
          averagePlayingTime: stats.averagePlayingTime ?? 0,
        },
        create: {
          careerId: career.id,
          matches: stats.matches ?? 0,
          goals: stats.goals ?? 0,
          assists: stats.assists ?? 0,
          cleanSheet: stats.cleanSheet ?? null,
          averagePlayingTime: stats.averagePlayingTime ?? 0,
        },
      })
    }

    // Récupérer la carrière mise à jour avec les stats
    const updatedCareer = await prisma.career.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        club: true,
        stats: true,
      },
    })

    res.json(updatedCareer)
  } catch (error) {
    console.error('Erreur PUT career:', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la carrière' })
  }
}) as RequestHandler)

// ==================== DELETE ====================

/**
 * DELETE /api/careers/:id
 * Supprime une carrière (les stats sont supprimées en cascade)
 */
router.delete('/:id', (async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const careerId = parseInt(id, 10)
    
    await prisma.career.delete({
      where: { id: careerId },
    })
    
    res.json({ message: 'Carrière supprimée avec succès' })
  } catch (error) {
    console.error('Erreur DELETE career:', error)
    res.status(500).json({ error: 'Erreur lors de la suppression de la carrière' })
  }
}) as RequestHandler)

export default router