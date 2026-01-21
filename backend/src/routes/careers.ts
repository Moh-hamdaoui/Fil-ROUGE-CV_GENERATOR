import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET - Récupérer toutes les carrières d'un joueur
router.get('/player/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params
    const careers = await prisma.career.findMany({
      where: { playerId: parseInt(playerId) },
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
    res.status(500).json({ error: 'Erreur lors de la récupération des carrières' })
  }
})

// POST - Créer une nouvelle carrière avec stats
router.post('/', async (req, res) => {
  try {
    const { playerId, clubId, season, competition, startDate, endDate, stats } = req.body
    
    const career = await prisma.career.create({
      data: {
        playerId: parseInt(playerId),
        clubId: parseInt(clubId),
        season,
        competition,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        stats: stats ? {
          create: {
            matches: stats.matches || 0,
            goals: stats.goals || 0,
            assists: stats.assists || 0,
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
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la création de la carrière' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { season, competition, startDate, endDate, stats } = req.body
    
    const career = await prisma.career.update({
      where: { id: parseInt(id) },
      data: {
        season,
        competition,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
      },
      include: {
        club: true,
        stats: true,
      },
    })
    
    if (stats) {
      await prisma.stats.upsert({
        where: {
          careerId: career.id,
        },
        update: {
          matches: stats.matches ?? 0,
          goals: stats.goals ?? 0,
          assists: stats.assists ?? 0,
        },
        create: {
          careerId: career.id,
          matches: stats.matches ?? 0,
          goals: stats.goals ?? 0,
          assists: stats.assists ?? 0,
        },
      })
    }

    
    res.json(career)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la carrière' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    await prisma.career.delete({
      where: { id: parseInt(id) },
    })
    
    res.json({ message: 'Carrière supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la carrière' })
  }
})

export default router