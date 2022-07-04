const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')

const registrationCtrl = require('../controllers/registration.controller');
const loginCtrl = require('../controllers/login.controller');
const homeCtrl = require('../controllers/home.controller')
const refreshCtrl = require('../controllers/refresh.controller')
const { isAuthenticate } = require('../middlewares/authenticate');

//JWT Authentication
router.post('/users/register',registrationCtrl.register)
router.post('/users/login',loginCtrl.login)
router.get('/home', isAuthenticate, homeCtrl.home)
router.post('/refresh',refreshCtrl.refresh)

//CRUD Operations
//C-Create
router.post('/create', async (req,res)=>{
    try{
        const user = new User(req.body)
        user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10))
        const result = await User.create(user);
        //const result = await user.save();  //this can also be used
        res.send(`${result.username} successfully created!!`)
    }catch(err){
        res.status(500).send(err.message)
    }
})

//R-Reading single record
router.get('/read/:username', async (req,res)=>{
    try{
        const username = req.params.username
        const result = await User.findOne({username});
        if(result)
            return res.send(result)
        else 
            return res.status(404).send(`${username} does not exist`)
    }catch(err){
        res.status(500).send(err)
    }
})

//Reading multiple records
router.get('/read', async (req,res)=>{
    try{
        const result = await User.find();
        return res.send(result)
    }catch(err){
        res.status(500).send(err)
    }
})

//U-Update
router.put('/update', async (req,res)=>{
    try{
        const username = req.body.username
        const newNickName = req.body.nickname
        const result = await User.findOneAndUpdate(
            { username: username },
            {
              $set: {
                nickname: newNickName,
              }
            },
            { new: true }
          );
        res.send(result)
    }catch(err){
        res.status(500).json(err.message)
    }
})

//D-DELETE
router.delete('/delete', async (req,res)=>{
    try{
        const username = req.body.username
        const result = await User.deleteOne({username});
        res.send(result)
    }catch(err){
        res.status(500).json(err.message)
    }
})

module.exports = router