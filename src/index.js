const express = require('express')
const path = require('path')
const multer = require('multer')

const uuid = require('uuid/v4')


//Initializations
const app = express()


//Settings

app.set('port', 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Middlewares
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) =>{
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase())
    }
})

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    //limits:{fileSize:1000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb("Error: Por favor, suba una imagen válida")
    }

}).single('image'))
//Routes

app.use(require('./routes/index.routes'))

    //Start server

app.listen(app.get('port'), () =>{ 
    console.log(`Server on Port ${app.get('port')}`)
})