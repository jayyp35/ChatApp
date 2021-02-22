let socket = io()
let username;
let btnSend;
let start = $('#startbtn')
$('#chatbox').hide()

start.on("click", () => {
    let user = $('#inpusername').val()
    let pass = $('#inppassword').val()
    socket.emit('boom')
    if(!user && !pass) {
        window.alert("Enter Login Credentials");
    } else if(user && !pass) {
        window.alert("Enter Password for User: "+ user)
    } else if(!user) {
        window.alert("Username cannot be empty");
    } else if(user && pass) {
        socket.emit('login',{
            username: $('#inpusername').val(),
            password: $('#inppassword').val()
        })
    }
})
socket.on('passmismatch', ()=> {
    console.log("Password Invalid")
    
})

socket.on("usermismatch", ()=> {
    console.log("No such username exists")
})

socket.on('logged_in', (data)=> {
    console.log("Valid Login Attempt")
    username= data.name;
    $('#inpusername').hide()
    $('#inppassword').hide()
    start.hide()
    $('#chatbox').show()
})


$('#sendbtn').on("click" , () => {
    let a = {
        from: username,
        message: $('#message').val()
    }
    socket.emit('send',a)
    addMessageSent(a)
    $('#message').val('')
})
// socket.on('msg_rcvd', (data) => {
//     $('#messagebox').append($('div').text(data.message))
// })

socket.on('msg_rcvd', (data) => {
   addMessageRcvd(data)
})

function addMessageRcvd(data) {
    let box = $('#messagebox')
    console.log(data)
    box.append(`<div class="m-1 p-2" style="text-align:left;color:#eeeeee;background-color:#393e46;border-radius: 10px;">
                    <div style="font-size:6pt">${data.from}</div>
                    <div>${data.message}</div> 
                </div>`)
}
function addMessageSent(data) {
    let box = $('#messagebox')
    box.append(`<div class="m-1 px-3" style="text-align:right;color:#eeeeee;background-color:#222831;border-radius: 10px;"> ${data.message}</div>`)
}



// <div style="text-align:right;border: 1px solid red;border-radius:10px;"></div>
