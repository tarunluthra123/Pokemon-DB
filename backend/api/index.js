const route = require('express').Router()
const jwt = require("jsonwebtoken");

route.use('/login', require('./login'))

exports = module.exports = {
    route
}