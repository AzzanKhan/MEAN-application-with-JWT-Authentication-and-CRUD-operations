const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt-nodejs')
const tokenService = require('./token.service')

module.exports = {
    register : async (req,res) => {
        try{
            const ifExists = await User.findOne({ username:req.body.username })
            if (ifExists)
                return res.status(403).json("User already exists")
            const user = new User({
                username:req.body.username,
                password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
            })
            const savedUser = await user.save()
            console.log('user registered succesfully',savedUser)
            return res.status(201).json(savedUser)
        }catch(err){
            console.log(err)
            return res.status(500).json('Internal Server Error')
        }
    },
    login : async (req,res) => {
        try{
            await User.findOne({
                username:req.body.username,
            }).exec(async (err,user)=>{
                if(err){
                    res.status(400).json(err)
                }
                else{
                    if(!user){
                        console.log('invalid user')
                        return res.status(401).send("user does not exist!")
                    }
                    if(bcrypt.compareSync(req.body.password,user.password)){
                        console.log('user logged in!',user)
                        let accessToken = await tokenService.getAccessToken(user.username)
                        let refreshToken = await tokenService.getRefreshToken(user.username)
                        return res.status(201).json({accessToken,refreshToken})
                    }
                    else{
                        console.log('user login failed!',user)
                        return res.status(400).json('Unauthorized: Wrong Password!!')
                    }  
                }
            })
        }catch(err){
            console.log(err.message)
            return res.status(500).json('Internal Server Error')
        }
    }
}