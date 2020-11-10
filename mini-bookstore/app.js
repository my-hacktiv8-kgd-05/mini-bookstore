const express = require('express')
const app = express()
const port = 3000

const appRouter = require('./routes')

app.set('view engine', 'ejs')

app.use(express.urlencoded( { extended: false }))

app.use('/', appRouter)

app.listen(port, () => {
    console.log(`mini-bookstore live at http://127.0.0.1:${port}`)
})