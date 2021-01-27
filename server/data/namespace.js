import Namespace from "../classes/Namespace";
import Room from "../classes/Room";
//constructor(id, nsTitle, img, endpoint)
//constructor(roomId, roomTitle, namespace, privateRoom=false) 

let namespaces = [];

let cat = new Namespace(0, "CAT", "image1.jpg","/cat")
let linuxNs = new Namespace(2,'Linux','image2.jpg','/linux');

namespaces.push(cat,linuxNs);

cat.addRoom(new Room(0, "cute", "cat"))
cat.addRoom(new Room(0, "food", "cat"))

linuxNs.addRoom(new Room(1,'Red Hat','Linux'));

export default namespaces;