import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/player/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params
    const formations = await prisma.formation.findMany({
      where: { playerId: parseInt(playerId) },
    })
    res.json(formations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des formations' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { playerId, institution, startYear, endYear, diploma } = req.body
    const formation = await prisma.formation.create({
      data: {
        playerId: parseInt(playerId),
        institution,
        startYear: parseInt(startYear),
        endYear: parseInt(endYear),
        diploma,
      },
    })
    res.status(201).json(formation)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la création de la formation' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { institution, startYear, endYear, diploma } = req.body
    const formation = await prisma.formation.update({
      where: { id: parseInt(id) },
      data: {
        institution,
        startYear: parseInt(startYear),
        endYear: parseInt(endYear),
        diploma,
      },
    })
    res.json(formation)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la formation' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.formation.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Formation supprimée' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la suppression de la formation' })
  }
})

export default router
