function joinRoom(roomName) {
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


