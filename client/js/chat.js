
const socket = io("http://localhost:1000");
const input = document.getElementById("msg");
const chatForm = document.getElementById("chat-form");
const charInput = document.getElementById("#msg")
const chatMessage = document.querySelector(".chat-messages")

let nsSocket = "";

socket.on("connect", ()=>{
    // console.log("메인 소켓 연결")
})

socket.on('nsList', (nsData) => {
    const div = document.querySelector(".namespace");
    div.innerHTML = "";
    nsData.forEach(ns=>{
        div.innerHTML += 
        `<img class="img namespace-img" ns=${ns.endpoint} src="/public/${ns.img}" />`
    })

    // 클릭하면 네임스페이스에 연결
    Array.from(document.getElementsByClassName('namespace-img')).forEach((elem)=>{
        elem.addEventListener("click", (event)=>{
            const endPoint = elem.getAttribute('ns');
            joinNamespace(endPoint);
        })
    })

})

