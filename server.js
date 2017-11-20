var compression = require('compression')
var bodyParser = require('body-parser')
var express = require('express')
var multer = require('multer')
var morgan = require('morgan')
var crypto = require('crypto')
var cors = require('cors')
var path = require('path')
var hat = require('hat')
var fs = require('fs')

var app = express()
var port = process.env.PORT || 1337
var uploader = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const dir = './objects/'
            fs.exists(dir, function (exists) {
                if (exists)
                    cb(null, './objects/')
                else
                    fs.mkdir(dir, err => cb(err, dir))
            })
        },
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) return cb(err)
                cb(null, hat() + path.extname(file.originalname))
            })
        }
    })
})

app.use(cors())
app.use(compression())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/object/:fileId', (req, res) => {
    var file = process.cwd() + '/objects/' + req.params.fileId

    fs.exists(file, function(exists) {
        if (exists) {
            res.sendFile(file)
        } else {
            res.status(404).json({
                result: 404,
                message: "The requested object doesn't exist"
            })
        }
    })
})

app.post('/upload', uploader.single('file'), function (req, res) {
    res.json({
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        encoding: req.file.encoding,
        size: req.file.size
    })
})

app.delete('/onject/:fileId', (req, res) => {
    var file = process.cwd() + '/objects/' + req.params.fileId

    fs.exists(file, function (exists) {
        if (exists) {
            fs.unlink(file, function(err) {
                if (err) {
                    res.status(200).json({
                        result: 500,
                        message: "The requested object cannot be deleted"
                    })
                } else {
                    res.status(200).json({
                        result: 200,
                        message: "The requested object is deleted"
                    })
                }
            })
        } else {
            res.status(404).json({
                result: 404,
                message: "The requested object doesn't exist"
            })
        }
    })
})

app.all('/*', (req, res) => {
    res.status(400).json({
        result: 400,
        message: "The requested endpoint doesn't exist"
    })
})

app.listen(port, '0.0.0.0', function() {
    console.log('Bucket running at port: ' + port)
})
