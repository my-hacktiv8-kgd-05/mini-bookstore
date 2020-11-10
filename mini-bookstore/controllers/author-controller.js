const { Author, Book } = require('../models')

class AuthorController {
    static getAllAuthors(req, res) {
        Author.findAll({ include: Book})
            .then( data => {
                res.render('allAuthors', { data })
            })
            .catch ( err => {
                res.send(err)
            })
    }
}

module.exports = AuthorController