function joinRoom(roomName) {
    console.log(roomName)
    document.getElementById("roomTitle").innerHTML = roomName;

    nsSocket.emit('joinRoom', roomName)

    nsSocket.on('roomHistory', (history)=>{
        const messages = document.getElementById("contents");
        messages.innerHTML = "";
    
        history.forEach((elem)=>{
            messages.innerHTML += makeNode(elem);
        })

        messages.scrollTo(0,messages.scrollHeight);
    })
}


