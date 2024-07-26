import User from "../models/userModel.js";
import createCookie from "../utilis/utilis.js";

const authUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        
        if(user && (user.checkPassword(password))) {
          createCookie(res, user._id)
          res.status(200).json({
              _id: user._id,
              name: user.name,
              email: user.email
          })
        }else {
            res.status(401).json({message: 'Invalid Email or Password'})
        }
    } catch (error) {
        console.log(error)
    }
 
}
const getUser = async(req, res) => {
  const user = req.user
  try {
    if(user) {
        res.status(200).json(user)
    }
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}

const registerUser = async(req, res) => {
try {
    const { name , email, password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser) {
      return  res.status(401).json({message: 'user with email already exists'})
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if(user) {
        createCookie(res, user._id)
         res.status(200).json({
             _id: user._id,
             name: user.name,
             email: user.email
         })
    }
} catch (error) {
   return res.status(500).json({message: "Fill all the Fields"})
}
}

const updateUser = async(req, res) => {
try {
    const {name, email, password} = req.body
    const user = await User.findById(req.user._id)
    if(user) {
        user.name = name || user.name
        user.email = email || user.email
    
        if(password) {
            user.password = password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    }
} catch (error) {
    res.status(500).json(error)
    console.log(error)
}

   
}

const logoutUser = async(req, res) => {
 try {
     res.cookie('jwt', '', {
        maxAge: 0
    })

    res.status(200).json({message: 'Logout user'})
 } catch (error) {
    console.log(error)
    res.status(500).json(error)
 }
}

export {
    authUser,
    registerUser,
    updateUser,
    logoutUser,
    getUser
}