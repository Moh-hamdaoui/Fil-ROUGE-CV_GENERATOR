import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import playersRouter from './routes/players'
import requestsRouter from './routes/requests'
import clubsRouter from './routes/clubs'
import qualitiesRouter from './routes/qualities'
import careersRouter from './routes/careers'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/players', playersRouter)
app.use('/api/requests', requestsRouter)
app.use('/api/clubs', clubsRouter)
app.use('/api/careers', careersRouter)
app.use('/api/qualities', qualitiesRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API CV Sportif - Backend en ligne ✅' })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur http://localhost:${PORT}`)
})