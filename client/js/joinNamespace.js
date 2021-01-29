function joinNamespace(endpoint) {

    document.querySelector(".msg-form").removeEventListener('submit',submitForm)
    document.querySelector(".msg-form").addEventListener('submit', submitForm)

    if(nsSocket){
        nsSocket.close();
    }

    nsSocket = io(`http://localhost:1000${endpoint}`);

    // 룸리스트 가져오기
    nsSocket.on('nsRoomLoad', (rooms)=>{
        const roomList = document.getElementById("room-list");
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
    })


    nsSocket.on('messageFromServer', (msg)=>{
        const parent = document.getElementById("contents");
        console.log(msg.content, parent)
        parent.innerHTML += makeNode(msg)   
        const element = document.getElementById("contents");
        element.scrollTop = element.scrollHeight ; 
    })

}


function submitForm(event) {
    event.preventDefault();
    const msg = document.querySelector('#user-message').value;
    document.querySelector('#user-message').value = "";

    nsSocket.emit('messageFromClient', msg)
}


function makeNode(msg) {
    const node = `
    <div class="user-message">
        <img src="${msg.avatar}", alt="userimg"></img>
        <div class="container">
            <div class="info">
                <div class="name"> ${msg.name} </div>
                <div class="time"> ${msg.time} </div>
            </div>
            <div class="content"> ${msg.content} </div>
            <i id="delete" class="far fa-trash-alt"></i>
    </div>
    `
    return node;
}
