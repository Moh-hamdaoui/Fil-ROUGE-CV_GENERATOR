import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import playersRouter from './routes/players'
import requestsRouter from './routes/requests'
import clubsRouter from './routes/clubs'
import qualitiesRouter from './routes/qualities'
import careersRouter from './routes/careers'
import formationsRoutes from './routes/formations'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/api/players', playersRouter)
app.use('/api/requests', requestsRouter)
app.use('/api/clubs', clubsRouter)
app.use('/api/careers', careersRouter)
app.use('/api/qualities', qualitiesRouter)
app.use('/api/formations', formationsRoutes) 
app.use('/uploads', express.static('public/uploads'))

app.get('/', (req, res) => {
  res.json({ message: 'API CV Sportif - Backend en ligne ✅' })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur http://localhost:${PORT}`)
})