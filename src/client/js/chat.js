const socket = io("/");
const input = document.getElementById("msg");
const chatForm = document.getElementById("chat-form");
const charInput = document.getElementById("#msg")
const chatMessage = document.querySelector(".chat-messages")

let nsSocket = "";


socket.on("connect", ()=>{
    // console.log("메인 소켓 연결")
}) 


// 서버에서 네임스페이스 리스트 받아옴
socket.on('nsList', (nsData) => {
    const div = document.querySelector(".namespace");
    div.innerHTML = "<img id='add-namespace' class='img' src='/image/plus.svg' />";
    nsData.forEach(ns=>{
        div.innerHTML +=  
        `<img class="img namespace-img" nsname=${ns.nsname} nsend=${ns.endpoint} src=/image/${ns.img} />
        <div class="nsTitle">${ns.nsTitle}</div>
        `
    })

    // 클릭하면 네임스페이스에 연결
    Array.from(document.getElementsByClassName('namespace-img')).forEach((elem)=>{
        elem.addEventListener("click", (event)=>{
            console.log(elem)
            const endPoint = elem.getAttribute('nsend');
            const nameSpaceName = elem.getAttribute('nsname')
            joinNamespace(endPoint, nameSpaceName);
        })
    })

    //처음엔 위에있는 네임스페이스로 연결
    const endPoint = document.querySelector(".namespace-img").getAttribute('nsend');
    const nameSpaceName = document.querySelector(".namespace-img").getAttribute('nsname');
    joinNamespace(endPoint, nameSpaceName);
})
