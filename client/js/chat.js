
const socket = io("http://localhost:1000");
const input = document.getElementById("msg");
const chatForm = document.getElementById("chat-form");
const charInput = document.getElementById("#msg")
const chatMessage = document.querySelector(".chat-messages")

let nsSocket = "";


socket.on("connect", ()=>{
    console.log("메인 소켓 연결")
})


// 서버에서 네임스페이스 리스트 받아옴
socket.on('nsList', (nsData) => {
    const div = document.querySelector(".namespace");
    div.innerHTML = "";
    nsData.forEach(ns=>{
        console.log(ns)
        div.innerHTML += 
        `<img class="img namespace-img" ns=${ns.endpoint} src="/public/${ns.img}" />
        <div class="nsTitle">${ns.nsTitle}</div>
        `
    })

    // 클릭하면 네임스페이스에 연결
    Array.from(document.getElementsByClassName('namespace-img')).forEach((elem)=>{
        elem.addEventListener("click", (event)=>{
            const endPoint = elem.getAttribute('ns');
            joinNamespace(endPoint);
        })
    })

    //처음엔 위에있는 네임스페이스로 연결
    const topNamespace = document.querySelector(".namespace-img").getAttribute('ns');
    joinNamespace(topNamespace);
})
