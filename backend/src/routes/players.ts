import express from 'express'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const prisma = new PrismaClient()

// Configuration de multer pour l'upload
const uploadDir = 'public/uploads/players'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, 'player-' + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Format d\'image non supporté'))
    }
  },
})

// Endpoint pour uploader la photo
router.post('/:id/upload-photo', express.json({ limit: '5mb' }), async (req, res) => {
  try {
    const playerId = parseInt(req.params.id)
    const { photo } = req.body

    if (!photo) {
      return res.status(400).json({ error: 'Aucune photo fournie' })
    }

    // Vérifier que c'est du base64
    if (!photo.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Format d\'image invalide' })
    }

    // Mettre à jour la photo en base de données
    const player = await prisma.player.update({
      where: { id: playerId },
      data: { photo: photo },
    })

    res.json({ 
      success: true, 
      photo: photo,
      message: 'Photo uploadée avec succès'
    })
  } catch (error) {
    console.error('Erreur upload photo:', error)
    res.status(500).json({ error: 'Erreur lors de l\'upload de la photo' })
  }
})

module.exports = router

// GET - Récupérer tous les joueurs
router.get('/', async (req, res) => {
  try {
    const players = await prisma.player.findMany({
      include: {
        qualities: true,
        careers: {
          include: {
            club: true,
            stats: true,
          },
        },
        formations: true,
        requests: true,
      },
    })
    res.json(players)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const player = await prisma.player.findUnique({
      where: { id: parseInt(id) },
      include: {
        qualities: true,
        careers: {
          include: {
            club: true,
            stats: true,
          },
        },
        formations: true,
        requests: true,
      },
    })
    
    if (!player) {
      return res.status(404).json({ error: 'Joueur non trouvé' })
    }
    
    res.json(player)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du joueur' })
  }
})

// POST - Créer un nouveau joueur avec une demande
router.post('/', async (req, res) => {
  try {
    const data = req.body
    
    const player = await prisma.player.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        nationality: data.nationality,
        secondaryNationality: data.secondaryNationality || null, 
        dateOfBirth: new Date(data.dateOfBirth),
        email: data.email,
        telephone: data.telephone,
        strongFoot: data.strongFoot,
        size: parseInt(data.size),
        weight: parseInt(data.weight), 
        vma: parseInt(data.vma),
        primaryPost: data.primaryPost,
        secondaryPost: data.secondaryPost || null,
        photo: data.photo || null,
        requests: {
          create: {
            isTreated: false,
          },
        },
      },
      include: {
        requests: true,
      },
    })
    
    res.status(201).json(player)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la création du joueur' })
  }
})

// PUT - Mettre à jour un joueur
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    
    const player = await prisma.player.update({
      where: { id: parseInt(id) },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        nationality: data.nationality,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        email: data.email,
        telephone: data.telephone,
        strongFoot: data.strongFoot,
        size: data.size ? parseInt(data.size) : undefined,
        weight: data.weight ? parseInt(data.weight) : undefined, 
        vma: data.vma ? parseInt(data.vma) : undefined,
        primaryPost: data.primaryPost,
        secondaryPost: data.secondaryPost,
        photo: data.photo,
      },
    })
    
    res.json(player)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du joueur' })
  }
})

// DELETE - Supprimer un joueur
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    await prisma.player.delete({
      where: { id: parseInt(id) },
    })
    
    res.json({ message: 'Joueur supprimé avec succès' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du joueur' })
  }
})

export default router