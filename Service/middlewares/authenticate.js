const jwt = require('jsonwebtoken')

module.exports.isAuthenticate = (req,res,next) =>{
    let isHeader = req.headers.authorization
    if(isHeader){
        let token = isHeader.split(' ')[1]
        jwt.verify(token,'SECRET',(err,decode)=>{
            if(err){
                console.log(err)
                res.status(401).json(err)
            }
            else{
                req.user = decode.username
                next()
            }
        })
    }
    else{
        res.status(403).send('token Unavailable!!')
    }
}
