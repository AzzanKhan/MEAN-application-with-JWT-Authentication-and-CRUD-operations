const mongoose = require('mongoose')
const user = mongoose.model('User')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

module.exports.login = (req,res) => {
    console.log('logging user');
    user.findOne({
        username:req.body.username,
    }).exec((err,user)=>{
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
                let token = jwt.sign({username:user.username},'SECRET',{expiresIn:60})
                res.status(201).json({loggedIn:true,token})
            }
            else{
                console.log('user login failed!',user)
                res.status(400).json('Unauthorized: Wrong Password!!')
            }  
        }
    })
}