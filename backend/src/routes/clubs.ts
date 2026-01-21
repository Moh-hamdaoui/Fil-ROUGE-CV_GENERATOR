import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET - Récupérer tous les clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await prisma.club.findMany({
      include: {
        careers: true,
      },
    })
    res.json(clubs)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des clubs' })
  }
})

// POST - Créer un nouveau club
router.post('/', async (req, res) => {
  try {
    const { name, logo, foundedYear } = req.body
    
    const club = await prisma.club.create({
      data: {
        name,
        logo: logo || null,
        foundedYear: foundedYear ? parseInt(foundedYear) : null,
      },
    })
    
    res.status(201).json(club)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du club' })
  }
})

export default router