import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

import dbRoutes from '@/routes/db.routes'

// | Cargar variables de entorno
if (process.env.NODE_ENV !== 'production') dotenv.config({ path: 'src/config/.env.local' })

const app = express()

// # Config
// | Permitir peticiones desde el cliente
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL, // # Cambiar a variable de entorno <-----------
    credentials: true,
  }),
)
// | Evitar mostrar registros de petición en producción
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))
// | Parsear peticiones con body-parser
app.use(express.json())
// | Parsear urlencoded payloads
app.use(express.urlencoded({ extended: true }))

// # Routes ⬇️  //////////////////////////////////////////
app.use('/db', dbRoutes)

export default app
