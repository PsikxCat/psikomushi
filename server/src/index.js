import app from './app.js'

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en puerto ${PORT}`)
