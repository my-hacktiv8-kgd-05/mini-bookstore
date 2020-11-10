const router = require('express').Router()
const BookController = require('../controllers/book-controller')

router.get('/', BookController.getShowAllBooks)

router.get('/buy/:id', BookController.getBuyBooksById)

router.get('/add', BookController.getAddBookForm)

router.post('/add', BookController.postAddBookForm)

router.get('/emptyList', BookController.getEmptyListBooks)

router.get('/restock/:id', BookController.getRestockBookForm)

router.post('/restock/:id', BookController.postRestockBookForm)

router.get('/delete/:id', BookController.getDeleteBookById)

module.exports = router