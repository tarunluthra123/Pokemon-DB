const route = require('express').Router()
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}

route.get('/', (req, res) => {
    console.log("token secret = ", process.env.TOKEN_SECRET)
    const token = generateAccessToken(req.body)
    res.json(token)
})

route.post('/', (req, res) => {
    const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    console.log(decoded)
    res.json(decoded.username)
})

exports = module.exports = route