module.exports.home = (req,res) => {
    console.log('home!');
    res.status(201).json(`Welcome ${req.user}`)
}