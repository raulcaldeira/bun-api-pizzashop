import { Elysia } from 'elysia'
import { registerRestaurante } from './routes/register-restaurante'
import { sendAuthLink } from './routes/send-auth-link'
import { autheticateFromLink } from './routes/authenticate-from-link'

const app = new Elysia()
  .use(registerRestaurante)
  .use(sendAuthLink)
  .use(autheticateFromLink)

app.listen(3333, () => {
  console.log('🔥 HTTP server running!')
})
