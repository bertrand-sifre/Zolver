const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const Socket = require('./socket')
const spawn = require('child_process').spawn

const UPLOAD_DIR = 'uploads'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({storage})

app.use(cors())

app.put('/images',upload.single("image"), (req, resp) => {
  resp.status(200).send(req.file)
} )

app.get('/images', (req, resp) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    resp.status(200).send(files)
  })
})

app.post('/compute/:img_id', (req, resp) => {
  // send cmd to python
  const python = spawn('python3', ['/Zolver/src/python/main_no_gui.py', '/Zolver/uploads/' + req.params.img_id], {shell: true})
  python.stdout.on('data', (data) => {
    Socket.socket.emit('logs:update', {msg: data.toString()})
  })
  python.stderr.on('data', (data) => {
    Socket.socket.emit('logs:update', {msg: data.toString()})
  })
  python.on('exit', (code) => {
    Socket.socket.emit('logs:update', {msg: `Compute finish with code: ${code}`})
  })
  resp.status(200).send({"state":"Compute launched."})
})

app.listen(3000, () => {
  console.log('api start on 3000')
})