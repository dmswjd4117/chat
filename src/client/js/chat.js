const socket =  io(`http://localhost:1000/`);
const input = document.getElementById("msg");
const chatForm = document.getElementById("chat-form");
const charInput = document.getElementById("#msg")
const chatMessage = document.querySelector(".chat-messages")
const body = document.getElementsByTagName("body");
const addPopup = document.querySelector(".add-spaceroom-box");
const closePopup = document.querySelector(".popup-close");
const addSpaceBtn = document.querySelector(".add-spaceroom-btn");

let nsSocket = "";


closePopup.addEventListener("click", (e)=>{
    addPopup.id = "popup-hide";
})


addSpaceBtn.addEventListener("click", (event)=>{
     const nsName = document.querySelector(".space-name-input").value;
     console.log(nsName)
     socket.emit('addNs', {nsName})
})



// 서버에서 네임스페이스 리스트 받아옴
socket.on('nsList', (nsData) => {
    const div = document.querySelector(".namespace");
    div.innerHTML = "<img id='add-namespace' class='img' src='/image/plus.svg' />";
    nsData.forEach(ns=>{
        div.innerHTML +=  
        `<img class="img namespace-img" nsTitle=${ns.nsTitle} nsend=${ns.endpoint} src=/image/${ns.img} />
        <div class="nsTitle">${ns.nsTitle}</div>
        `
    })

    const addBtn = document.querySelector("#add-namespace");
    addBtn.addEventListener("click", (e)=>{
        if(addPopup.id){
            addPopup.id = ""
        }else{
            addPopup.id = "popup-hide"
        }
    })

    // 클릭하면 네임스페이스에 연결
    Array.from(document.getElementsByClassName('namespace-img')).forEach((elem)=>{
        elem.addEventListener("click", (event)=>{
            const endPoint = elem.getAttribute('nsend');
            const nameSpaceName = elem.getAttribute('nsTitle')
            joinNamespace(endPoint, nameSpaceName);
        })
    })

    //처음엔 위에있는 네임스페이스로 연결
    const endPoint = document.querySelector(".namespace-img").getAttribute('nsend');
    const nameSpaceName = document.querySelector(".namespace-img").getAttribute('nsTitle');
    joinNamespace(endPoint, nameSpaceName);
})  
  

socket.on('newNsLoad', (ns)=>{
    const { nsTitle, endPoint, img} = ns;
    const div = document.querySelector(".namespace");
    // div.innerHTML +=  


    const img_element = document.createElement("img");
    img_element.className = "img namespace-img";
    img_element.src = `/image/${img}`;
    img_element.addEventListener("click", (event)=>{
        joinNamespace(endPoint, nsTitle);
    })

    const name_element = document.createElement("div");
    name_element.className = "nsTitle";
    name_element.innerHTML = ns.nsTitle;

    div.append(img_element);
    div.append(name_element);

    addPopup.id = "popup-hide";
})