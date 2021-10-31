const express = require('express')
require('./db/mongoose')

const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Express middleware
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

const multer = require('multer')
const upload = multer ({
    dest: 'images'
})

app.post('/upload', upload.single('upload'), (req, res) => {
    console.log(req.body)
    res.send()
})

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
    console.log('Server listening on ', port)
})