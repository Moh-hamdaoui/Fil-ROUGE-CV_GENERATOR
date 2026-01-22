import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET - Récupérer toutes les demandes
router.get('/', async (req, res) => {
  try {
    const { isTreated } = req.query
    
    const where = isTreated !== undefined
      ? { isTreated: isTreated === 'true' }
      : {}
    
    const requests = await prisma.request.findMany({
      where,
      include: {
        player: {
          include: {
            qualities: true,
            careers: {
              include: {
                club: true,
                stats: true,
              },
            },
            formations: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    res.json(requests)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des demandes' })
  }
})

router.get('/player/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params
    
    const request = await prisma.request.findFirst({
      where: { playerId: parseInt(playerId) },
      orderBy: { createdAt: 'desc' }
    })
    
    if (!request) {
      return res.status(404).json({ error: 'Aucune demande trouvée pour ce joueur' })
    }
    
    res.json(request)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la demande' })
  }
})

// GET - Récupérer une demande par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const request = await prisma.request.findUnique({
      where: { id: parseInt(id) },
      include: {
        player: {
          include: {
            qualities: true,
            careers: {
              include: {
                club: true,
                stats: true,
              },
            },
            formations: true,
          },
        },
      },
    })
    
    if (!request) {
      return res.status(404).json({ error: 'Demande non trouvée' })
    }
    
    res.json(request)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la demande' })
  }
})

// PATCH - Mettre à jour le statut d'une demande
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { isTreated } = req.body
    
    const updatedRequest = await prisma.request.update({
      where: { id: parseInt(id) },
      data: { isTreated },
    })
    
    res.json(updatedRequest)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la demande' })
  }
})

// DELETE - Supprimer une demande
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    await prisma.request.delete({
      where: { id: parseInt(id) },
    })
    
    res.json({ message: 'Demande supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la demande' })
  }
})

export default router