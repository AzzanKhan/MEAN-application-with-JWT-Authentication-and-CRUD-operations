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
const { off } = require('../app');

//JWT Authentication
router.post('/users/register',registrationCtrl.register)
router.post('/users/login',loginCtrl.login)
router.get('/home', isAuthenticate, homeCtrl.home)
router.post('/refresh',refreshCtrl.refresh)

//CRUD Operations

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username for user
 *         nickname:
 *           type: string
 *           description: nickname for user
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         username: swagger
 *         nickname: openAPI
 *         password: test@123
 */

//C-Create
/**
 * @swagger
 * /create:
 *   post:
 *     summary: creates a new user
 *     tags: ['Create Operation']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: creates user
 *       500:
 *          description: error
 */
router.post('/create', async (req,res)=>{
    try{
        const user = new User(req.body)
        user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10))
        const result = await User.create(user);
        //const result = await user.save();  this can also be used
        res.send(`${result.username} successfully created!!`)
    }catch(err){
        res.status(500).send(err.message)
    }
})

//R-Reading single record
/**
 * @swagger
 * /read/{username}:
 *   get:
 *     summary: Returns the user
 *     tags: ['Read Operations']
 *     parameters:
 *        - in: path
 *          name: username
 *          schema:
 *              type: string
 *              required: true
 *          description: username to find the user
 *     responses:
 *       200:
 *         description: Returns the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: string
 *                      description: auto generated in database
 *                  username:
 *                      type: string
 *                      description: username for user
 *                  nickname:
 *                      type: string
 *                      description: nickname for user
 *                  password:
 *                      type: string
 *                      description: password
 *       404:
 *          description: user not found
 *       500:
 *          description: server error
 */
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
/**
 * @swagger
 * /read:
 *   get:
 *     summary: Returns the list of all users
 *     tags: ['Read Operations']
 *     responses:
 *       200:
 *         description: the list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: internal error
 */
router.get('/read', async (req,res)=>{
    try{
        const result = await User.find();
        return res.send(result)
    }catch(err){
        res.status(500).send(err)
    }
})

//U-Update
/**
 * @swagger
 * /update:
 *   put:
 *     summary: Updates nickname of a user
 *     tags: ['Update Operation']
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - nickname
 *                  properties:
 *                      username:
 *                          type: string
 *                          description: username for user
 *                      nickname:
 *                          type: string
 *                          description: nickname for user
 *                  example:
 *                      username: swagger
 *                      nickname: openAPI 3.0
 *     responses:
 *       200:
 *         description: Returns the updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *          description: failed operation
 */
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

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: deletes a user
 *     tags: ['Delete Operation']
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - username
 *                  properties:
 *                      username:
 *                          type: string
 *                          description: username for user
 *                  example:
 *                      username: swagger
 *     responses:
 *       200:
 *         description: Returns the result of delete operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *          description: failed operation
 */
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