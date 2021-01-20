const socket = io("http://localhost:1000")
const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages")


socket.on("connect", ()=>{
    console.log(socket.id)
})


// 서버에서 메세지 받음
socket.on("message", message=>{ 
    paintMessage(message)
    chatMessage.scrollTop = chatMessage.scrollHeight;
})


chatForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const message = e.target.elements.msg.value;
    e.target.elements.msg.value = ''

    // 서버에 메세지 전달
    socket.emit("chatMessage", message) 
})


// 메세지 화면에 표시하기
function paintMessage(message) {  
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