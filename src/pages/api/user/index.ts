import type { NextApiRequest, NextApiResponse } from 'next'

import { IdentifyRequest } from 'lib/jwt'
import prisma from 'lib/prisma'
import Auth from 'middlewares/Auth'

export default Auth(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await IdentifyRequest({ req })

        if (req.method == 'GET') {
            const user = await prisma.user.findUnique({
                where: { id, isVerified: true },
                include: {
                    cart: true,
                    orders: true,
                    addresses: true,
                    payments: true,
                    wishlist: true,
                    notifications: true,
                    reviews: true,
                    errors: true,
                },
            })

            return res.status(200).json({ user })
        }
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
})
