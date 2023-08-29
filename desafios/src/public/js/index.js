
const socket = io();

let user = '';
let chatBox = document.getElementById('chatBox');


Swal.fire({
    title: 'Your email.',
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address',
    inputValidator: (value) => {
        return !value.includes('@') && "An email is required to continue."; 
    },
    allowOutsideClick: false
}).then((result) => { user = result.value });

//chatBox input
chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
});


socket.on('messageLogs', messageCollection => {
    let log = document.getElementById('messageLogs'); 
    let messages = "";
    messageCollection.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} </br>`;
    });
    log.innerHTML = messages;
});