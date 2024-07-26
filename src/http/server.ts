import { Elysia } from 'elysia'
import { registerRestaurante } from './routes/register-restaurante'

const app = new Elysia().use(registerRestaurante)

app.listen(3333, () => {
  console.log('🔥 HTTP server running!')
})
