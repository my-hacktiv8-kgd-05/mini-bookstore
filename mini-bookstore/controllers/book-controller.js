const { Author, Book } = require('../models')
const { Op } = require('sequelize')
const Helpers = require('../helpers/helper')

class BookController {
    // Release 0, 1, 2, 3, 4 Done

    // Release 5 Done
    static getShowAllBooks(req, res,) {
        Book.findAll({ where: { stock: { [Op.gt]: 0 }}})
            .then( data => {
                res.render('allBooks', { data, Helpers })
            })
            .catch( err => {
                res.send(err)
            })
    }

    // Release 6 Done
    static getAddBookForm(req, res) {
        const error = req.query.error
        Author.findAll()
            .then( data => {
                res.render('books/add', { data, error })
            })
            .catch( err => {
                res.send(err)
            })
    }

    // Release 7 Done
    static postAddBookForm(req, res) {
        const newBook = {
            title: req.body.title,
            isbn: req.body.isbn,
            stock: req.body.stock,
            price: req.body.price,
            AuthorId: req.body.author
        }
        Book.create(newBook)
            .then( data => {
                res.redirect('/books')
            })
            .catch( err => {
                let errValidation = []
                err.errors.forEach( error => {
                    errValidation.push(error.message)
                })
                const result = errValidation.join(', ')
                res.redirect(`/books/add?error=${result}`)
            })
    }

    // Release 5A
    static getBuyBooksById(req, res) {
        const id = +req.params.id
        let boughtBook
        Book.findByPk(id)
            .then( data => {
                boughtBook = {
                    title: data.title,
                    isbn: data.isbn,
                    price: data.price,
                    stock: data.stock - 1
                }
                return Book.update(boughtBook, { where: { id }})
            })
            .then( () => {
                res.redirect('/books')
            })
            .catch( err => {
                res.send(err)
            })
    }

    // Release 8
    static getEmptyListBooks(req, res) {
        Book.findAll({ where: { stock: { [Op.eq]: 0 }}})
            .then( data => {
                res.render('books/emptyBooks', { data })
            })
            .catch( err => {
                res.send(err)
            })
    }

    // Release 9
    static getRestockBookForm(req, res) {
        const id = +req.params.id
        Book.findByPk(id)
            .then( data => {
                res.render('books/restockBook', { data })
            })
            .catch( err => {
                res.send(err)
            })
    }

    // Release 10
    static postRestockBookForm(req, res) {
        const id = +req.params.id
        const newStock = req.body.stock
        let restockBook
        Book.findByPk(id)
            .then( data => {
                restockBook = {
                    title: data.title,
                    isbn: data.isbn,
                    price: data.price,
                    stock: newStock
                }
                return Book.update(restockBook, { where: { id }})
            })
            .then( () => {
                res.redirect('/books/emptyList')
            })
            .catch( err => {
                res.send(err)
            })
    }

    // Release 11
    static getDeleteBookById(req, res) {
        const id = +req.params.id
        Book.destroy({ where: { id }})
            .then( () => {
                res.redirect('/books/emptyList')
            })
            .catch( err => {
                res.send(err)
            })
    }
}

module.exports = BookController