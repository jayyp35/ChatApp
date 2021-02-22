const http = require('http')
const express = require('express')
const app = express()

const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
app.use('/' , express.static(__dirname + '/public'))

let users = {
    'Jay' : 'Jay123',
    'Aryan' : 'Aryan123',
    'Mummy' : 'Mummy123',
    'Papa' : 'Papa123',
    'Sajal' : 'Sajal123',
    'guest' : 'guest'
}

io.on("connection", (socket)=> {
    console.log("Connected with socket: " + socket.id);

    socket.on('login',(data)=> {
        if(users[data.username]) {
            if(users[data.username] == data.password) {
                socket.emit('logged_in');
            } else {
                socket.emit('passmismatch');
            }
        } else {
            socket.emit('usermismatch');
        }
    })
})

server.listen(1234, ()=> {
    console.log("Server started on http://localhost:1234");
})