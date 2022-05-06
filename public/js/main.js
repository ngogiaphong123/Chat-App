const chatForm = document.getElementById('chat-form');
const socket = io();
//? Listen form server socket
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
})

//? Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = event.target.elements.msg.value;
    //? Emit message to server
    socket.emit('chatMessage', msg);
})

const outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHtml = ``;
}