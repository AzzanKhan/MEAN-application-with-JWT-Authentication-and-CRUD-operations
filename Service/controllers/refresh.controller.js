const tokenService = require('../services/token.service')

module.exports.refresh = async (req,res) => {
    try{
        const { token } = req.body
        console.log(token)
        if(token){
            const username = await tokenService.verifyRefreshToken(token)
            const accessToken = await tokenService.getAccessToken(username)
            res.send({accessToken})
        }
        else{
            res.status(403).send('token Unavailable!!')
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}