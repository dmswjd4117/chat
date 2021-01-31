function joinRoom(roomName) {
    const messages = document.getElementById("contents");


}


function makeHistoryNode(obj) {
    const { avataUrl , history : msg}  = obj;
    const node = `
    <div class="user-message">
        <img src="${avataUrl}", alt="userimg"></img>
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
