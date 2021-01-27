class Room{
    constructor(roomId, roomTitle, namespace, privateRoom=false){
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.privateRoom = privateRoom;
        this.history = [ 
        // {
        //     content : "msg",
        //     time : "2020",
        //     name : "asd",
        //     avatar : 'https://via.placeholder.com/30'
        // } , 
        // {
        //     content : "msg2",
        //     time : "2020",
        //     name : "asd",
        //     avatar : 'https://via.placeholder.com/30'
        // }
    ];
    }
    addMessage(msg){
        this.history.push(msg);
    }
    clearHistory(){
        this.history = [];
    }
}

const schema = {
    content : "msg",
    time : "2020",
    name : "asd",
    avatar : 'https://via.placeholder.com/30'
}


export default Room;