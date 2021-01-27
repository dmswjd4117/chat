function joinNamespace(endpoint) {
    if(nsSocket){
        nsSocket.close();
        // document.querySelector('#user-message').removeEventListener('submit',submitForm)
    }

    nsSocket = io(`http://localhost:1000${endpoint}`);

    // 룸리스트 가져오기
    nsSocket.on('nsRoomLoad', (rooms)=>{
        const roomList = document.getElementById("room-list");
        console.log(roomList)
        roomList.innerHTML = "";
        rooms.forEach((room)=>{
            let locked = false;
            if(room.privateRoom) locked = true;
            roomList.innerHTML += `
              <li class="room">
                <i class="fas fa-globe-asia"></i>
                <span>${room.roomTitle}</span>
              </li>
            `
        })

        //노드리스트를 반환받아, 클릭하면 해당 룸으로 이동하게 하기
        const roomNodes = document.getElementsByClassName('room');
        Array.from(roomNodes).forEach((elem)=>{
            elem.addEventListener("click",(event)=>{
                joinRoom(event.target.innerText);
            })
        })

        const topRoomName = document.querySelector(".room").innerText;
        joinRoom(topRoomName);

        // const parent = document.querySelector("#contents");
        nsSocket.on('messageFromServer', (msg)=>{
            const parent = document.getElementById("contents");
            console.log(msg.content, parent)
            parent.innerHTML += makeNode(msg)    
        })

    })

    console.log("지우기")
    document.querySelector(".msg-form").removeEventListener('submit',submitForm)

    console.log("붙이기")
    document.querySelector(".msg-form").addEventListener('submit', submitForm)
}


function submitForm(event) {
    event.preventDefault();
    const msg = document.querySelector('#user-message').value;
    nsSocket.emit('messageFromClient', msg)
}

// function paintNode(msg) {
//     const parent = document.querySelector("#contents");
//     parent.innerHTML += makeNode(msg)    
// }

function makeNode(msg) {
    const node = `
    <div class="user-message">
        <img src="/public/user_image.jpg", alt="userimg"></img>
        <div class="container">
            <div class="info">
                <div class="name"> ${msg.name} </div>
                <div class="time"> ${msg.time} </div>
            </div>
            <div class="content"> ${msg.content} </div>
    </div>
    `
    return node;
}

// document.getElementsByClassName()은 요소가 아니라
// 노드리스트 객체를반환한다. 

// 한 요소를 반환하기 위해선
// document.getElementById(),document.querySelector()이용하기