const router = require('express').Router()
const Controller = require('../controllers/app-controller')
const authorRouter = require('./authorRouter')
const bookRouter = require('./bookRouter')

router.get('/', Controller.redirectToListBooks)

router.use('/authors', authorRouter)

router.use('/books', bookRouter)

module.exports = router