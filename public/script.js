let socket = io()
let username;

let start = $('#startbtn')


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

socket.on('logged_in', ()=> {
    console.log("Valid Login Attempt")
    $('#inpusername').hide()
    $('#inppassword').hide()
    start.hide()

})

