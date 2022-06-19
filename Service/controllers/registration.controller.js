const authService = require('../services/auth.service')

module.exports.register = async (req,res) => {
    try{
        console.log('registering user');
        await authService.register(req,res);
    }catch(err){
        res.status(err.status).send(err.message)
    }
}