const router = require('express').Router()
const AuthorController = require('../controllers/author-controller')

router.get('/', AuthorController.getAllAuthors)

module.exports = router