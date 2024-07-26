import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const checkAuth = async(req, res, next) =>{
    const token = req.cookies.jwt

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET)      
            req.user = await User.findById(decoded.userId).select('-password') 
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({message: 'Invalid Token'})
            throw new Error('Invalid Token')
        }
    }else {
        res.status(401).json({message: "No Token Found"})
    }
}


export default checkAuth