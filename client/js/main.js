const clock = document.getElementById("clock-container");


function setTime() {
    const time =  new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    
    if(hour === 0){
        hour = 12
    }else if(hour > 12){
        hour -= 12
    }else if(hour < 10){
        hour = '0' + hour
    }
    if(minutes < 10){
        minutes = '0' + minutes
    }
    

    clock.innerHTML = `${hour + ' : ' + minutes }`
}

if(clock){
    console.log("CLOCK")
    setTime();
    setInterval(setTime, 1000*60);
}

export default clock;