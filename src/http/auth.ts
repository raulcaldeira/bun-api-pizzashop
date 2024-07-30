import { Elysia, t, type Static } from 'elysia'
import jwt from '@elysiajs/jwt'
import { env } from '../env'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .derive({ as: 'global' }, ({ cookie, jwt }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        cookie.auth.set({
          value: token,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      },
      signOut: () => {
        // removeCookie('auth')
        cookie.auth.remove()
      },
      getCurrentUser: async () => {
        const authCookie = cookie.auth.value

        const payload = await jwt.verify(authCookie)

        if (!payload) {
          throw new Error('Unauthorized.')
        }

        return {
          userId: payload.sub,
          restaurantId: payload.restaurantId,
        }
      },
    }
  })
