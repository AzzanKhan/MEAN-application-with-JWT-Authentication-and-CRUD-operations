const jwt = require('jsonwebtoken')

module.exports.refreshToken = (req,res) =>{
    let isHeader = req.headers.authorization
    if(isHeader){
        let token = isHeader.split(' ')[1]
        jwt.verify(token,'SECRET',(err,decode)=>{
            if(err){
                console.log(err)
                res.status(401).json(err)
            }
            else{
                const presentUnixSeconds = Math.round(Number(new Date()) / 1000)
	            if (decode.exp - presentUnixSeconds > 30) {
		            return res.status(400).end()
	            }
                let newToken = jwt.sign({username:decode.username},'SECRET',{expiresIn:300})
                res.status(201).json({loggedIn:true,refreshed:true,newToken})
            }
        })
    }
    else{
        res.status(403).send('token Unavailable!!')
    }
}