function joinNamespace(endpoint) {
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
                joinRoom(event.target.innerHTML);
            })
        })

        const topRoomName = document.querySelector(".room").innerText;
        joinRoom(topRoomName);

    })
}


// document.getElementsByClassName()은 요소가 아니라
// 노드리스트 객체를반환한다. 

// 한 요소를 반환하기 위해선
// document.getElementById(),document.querySelector()이용하기