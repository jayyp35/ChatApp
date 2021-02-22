const http = require('http')
const express = require('express')
const app = express()
const SERVER_PORT = process.env.PORT || 3333
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
app.use('/' , express.static(__dirname + '/docs'))

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
                socket.emit('logged_in',{
                    name: data.username
                });
            } else {
                socket.emit('passmismatch');
            }
        } else {
            socket.emit('usermismatch');
        }
    })

    socket.on('send', (data) => {
        socket.broadcast.emit('msg_rcvd',data)
    })
})

server.listen(SERVER_PORT, ()=> {
    console.log("Server started on http://localhost:1234");
})