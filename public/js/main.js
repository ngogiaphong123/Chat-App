const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
//? Get username and room from URLs
const {username,room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const socket = io();
//? Join chat room
socket.emit('joinRoom', {username,room});
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
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}