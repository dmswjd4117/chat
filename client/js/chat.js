const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages")


socket.on("message", message=>{ // 서버에서 메세지 받음
    paintMessage(message)
    chatMessage.scrollTop = chatMessage.scrollHeight;
})


chatForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const message = e.target.elements.msg.value;
    e.target.elements.msg.value = ''

    socket.emit("chatMessage", message) // 서버에 메세지 전달
})


function paintMessage(message) {  // 메세지 화면에 표시하기
    const div = document.createElement("div")
    div.classList.add("message")
    div.innerHTML = `
    <p class="meta"> 
        ${message.username}  
        <span> ${message.time} </span>
    </p>
    <p class="message">
        ${message.text}
    </p>
    `
    chatMessage.appendChild(div)
}