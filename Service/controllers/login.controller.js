const authService = require('../services/auth.service')

module.exports.login = async (req,res) => {
    try{
       await authService.login(req,res)
    }catch(err){
        res.status(err.status).send(error.message)
    }
}