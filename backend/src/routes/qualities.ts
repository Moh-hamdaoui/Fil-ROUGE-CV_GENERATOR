import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/player/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params
    const qualities = await prisma.playerQualities.findMany({
      where: { playerId: parseInt(playerId) },
    })
    res.json(qualities)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des qualités' })
  }
})

router.post('/player/:playerId/bulk', async (req, res) => {
  try {
    const { playerId } = req.params
    const { qualities } = req.body 
    
    await prisma.playerQualities.deleteMany({
      where: { playerId: parseInt(playerId) },
    })
    
    const created = await prisma.playerQualities.createMany({
      data: qualities.map((q: any) => ({
        playerId: parseInt(playerId),
        category: q.category,
        quality: q.quality,
        rating: q.rating,
      })),
    })
    
    res.json({ message: 'Qualités mises à jour', count: created.count })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour des qualités' })
  }
})

export default router