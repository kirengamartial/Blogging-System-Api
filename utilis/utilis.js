import jwt from 'jsonwebtoken'

const createCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.SECRET,{
        expiresIn: '3d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict'
    })
}

export default createCookie