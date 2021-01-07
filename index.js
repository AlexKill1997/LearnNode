const express = require('express')
const path = require('path')
const exp = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const mongoose = require('mongoose')
const e = require('express')

const hbs = exp.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
const app = express()
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

// async function start() {
//     try {
//         const url = `mongodb+srv://alexey_kilafyan:liverpool2005@cluster0.7gdue.mongodb.net/<dbname>?retryWrites=true&w=majority`
//         await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//         app.listen(PORT, () => {
//             console.log(`server is ready on port ${PORT}`)
//         })
//     } catch {
//         console.log('jjjcjccjj')
//     }

// }
// start()
app.listen(PORT, () => {
    console.log(`server is ready on port ${PORT}`)
})