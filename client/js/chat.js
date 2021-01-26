
const socket = io("http://localhost:1000");
const socket2 = io("http://localhost:1000/admin");
const input = document.getElementById("msg");
const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages")



socket.on("connect", ()=>{
    console.log("메인 연결")
    // 서버에서 메세지 받음
    socket.on("message", message=>{ 
        paintMessage(message)
        chatMessage.scrollTop = chatMessage.scrollHeight;
    })

    socket.on("level1", d=>{ 
        console.log(d)
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
})


socket2.on('connect',()=>{
    console.log("어드민 연결")
    socket2.on('welcome', (msg)=>{
        console.log(msg)
    })
})
