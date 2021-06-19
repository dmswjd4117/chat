function joinNamespace(endpoint, nsName) {
    console.log(endpoint, nsName, "입장")

    document.querySelector(".msg-form").removeEventListener('submit',submitForm)
    document.querySelector(".msg-form").addEventListener('submit', submitForm)

    if(nsSocket){
        nsSocket.close();
    }

    nsSocket = io(`http://localhost:1000${endpoint}`);

    // 룸리스트 가져오기
    nsSocket.on('nsRoomLoad', (rooms)=>{
        console.log('nsRoomLoad')
        const roomList = document.getElementById("room-list");
        roomList.innerHTML = `
        <div>
            <label>add room </label>
            <input name="roomName" id="add-roomName" required>
            <button class="addRoomBtn"> add
        </div>
        `
        if(rooms){
            rooms.forEach((room)=>{
                console.log(room)
                let locked = false;
                if(room.privateRoom) locked = true;
                roomList.innerHTML += `
                  <li class="room">
                    <i class="fas fa-globe-asia"></i>
                    <span>${room.roomTitle}</span>
                  </li>
                ` 
            })  
        }
  

        const addRoomBtn = document.querySelector(".addRoomBtn");
        addRoomBtn.addEventListener("click", (e)=>{
            const roomTitle = document.getElementById("add-roomName").value;
            const namespace = nsName;
            
            nsSocket.emit('addRoom', {roomTitle, namespace })
        })


        //노드리스트를 반환받아, 클릭하면 해당 룸으로 이동하게 하기
        const roomNodes = document.getElementsByClassName('room');
        Array.from(roomNodes).forEach((elem)=>{
            elem.addEventListener("click",(event)=>{
                const roomName = event.target.innerText;
                initRooms(roomName)
                nsSocket.emit('joinRoom', roomName);
            })
        })

        const topRoom = document.querySelector(".room");
        if(topRoom){
            topRoomName = topRoom.innerText;
            initRooms(topRoomName)
            nsSocket.emit('joinRoom', topRoomName);
        }
    }) 


    nsSocket.on('messageFromServer', (msg)=>{
        const parent = document.getElementById("contents");
        parent.innerHTML += makeNode(msg)   
        const element = document.getElementById("contents");
        element.scrollTop = element.scrollHeight ; 
    })

    nsSocket.on('roomHistory', (datas)=>{
        const messages = document.getElementById("contents");
        messages.innerHTML = ""
        datas.forEach(data=>{
            messages.innerHTML += makeNode(data)
        })
    })

    nsSocket.on('nsNewRoomLoad', (room)=>{
        console.log(room)
        const {roomID, roomTitle} = room

        const roomList = document.getElementById("room-list");
                
        const li = document.createElement("li");
        const i = document.createElement("i")
        i.className = "fas fa-globe-asia";
        const span = document.createElement("span");
        span.innerText = room.roomTitle;
        li.appendChild(i)
        li.appendChild(span)
        li.addEventListener("click",(event)=>{
            const roomName = event.target.innerText;
            initRooms(roomName)
            nsSocket.emit('joinRoom', roomName);
        })

        roomList.appendChild(li);

        initRooms(roomTitle)
        nsSocket.emit('joinRoom', roomTitle);
    })  
}



function initRooms(roomTitle) {
    const title = document.getElementById("roomTitle");
    const messages = document.getElementById("contents");

    title.innerHTML = roomTitle;
    messages.innerHTML = "";
}


function makeNode(msg) {
    const node = `
    <div class="user-message">
        <img src="${msg.avatar || "/image/user_image.jpg"}", alt="userimg"></img>
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


function submitForm(event) {
    event.preventDefault();
    const msg = document.querySelector('#user-message').value;
    document.querySelector('#user-message').value = "";

    nsSocket.emit('messageFromClient', msg)
}


