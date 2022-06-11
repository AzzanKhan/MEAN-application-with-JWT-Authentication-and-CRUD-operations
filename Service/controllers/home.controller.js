module.exports.home = (req,res) => {
    res.status(201).json({username : req.user})
}