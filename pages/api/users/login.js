import bcrypt from 'bcryptjs'

import connectDB from '../../../helpers/connectDB'
import { bakeAJWT } from '../../../helpers/bakeCookies'
import isEmail from '../../../helpers/isEmail'

import User from '../../../models/User'

export default async function (req, res) {
    const { email, password } = req.body

    if (!email || !password) res.status(400).send('Input error!')
    if (!isEmail(email)) res.status(400).send('Input error!')

    connectDB()

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const AJWT = await bakeAJWT(user)

        res.setHeader('Set-Cookie', AJWT)
        res.status(200).json('Success!')
    } else {
        res.status(401).send('Invalid email or password')
    }
}
