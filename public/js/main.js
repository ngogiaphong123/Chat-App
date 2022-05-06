const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();
//? Listen form server socket
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    //? Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//? Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = event.target.elements.msg.value;
    //? Emit message to server
    socket.emit('chatMessage', msg);
    //? Clear input
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
})

const outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad<span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}