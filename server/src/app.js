import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { getEmployees } from './config/supabase.js'

// import userRoutes from './routes/user.routes.js'
// import channelRoutes from './routes/channel.routes.js'
// import messageRoutes from './routes/message.routes.js'

// | Cargar variables de entorno
if (process.env.NODE_ENV !== 'production') dotenv.config({ path: 'src/config/.env.local' })

const app = express()

// # Config
// | Permitir peticiones desde el cliente
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
// | Registrar peticiones en consola con morgan
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))
// | Parsear peticiones con body-parser
app.use(express.json())
// | Parsear urlencoded payloads
app.use(express.urlencoded({ extended: true }))

getEmployees()

// // # Routes
// app.get('/api/session', (req, res) => {
//   res.json(req.session)
// })
// app.use('/api/user', userRoutes)
// app.use('/api/channel', channelRoutes)
// app.use('/api/message', messageRoutes)

export default app
