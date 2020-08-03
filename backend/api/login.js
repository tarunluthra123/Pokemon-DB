const route = require('express').Router()
const jwt = require("jsonwebtoken");
const MongoClient = require('mongodb').MongoClient
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/"
const DB_NAME = process.env.DB_NAME || 'pokemon_db'

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}

route.get('/', (req, res) => {
    const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    console.log(decoded)
    res.json(decoded.username)
})

route.post('/', async (req, res) => {
    const query = req.body
    try {
        const db = await MongoClient.connect(MONGO_URL + DB_NAME)
        const users = db.collection('users')
        const arr = await users.find(query).toArray()
        if (arr.length > 0) {
            const token = generateAccessToken(query)
            res.send({msg: "valid", token: token})
        } else {
            res.send({msg: "incorrect"})
        }
    } catch (e) {
        console.log(e)
        res.send({msg: "Some error"})
    }
})

exports = module.exports = route