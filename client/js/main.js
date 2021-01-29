const clock = document.getElementById("clock-container");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close");
const loginBlock = document.querySelector(".pop-up__login");
const loginBrn = document.querySelector(".login_click");

const registerBtn = document.querySelector(".register_click");
const registerBlock = document.querySelector(".pop-up__register");

if(loginBrn){
    loginBrn.addEventListener("click", (event)=>{
        loginBlock.classList.remove("hidden")
        overlay.classList.remove("hidden")
    })
}

if(registerBtn){
    registerBtn.addEventListener("click", (event)=>{
        registerBlock.classList.remove("hidden")
        overlay.classList.remove("hidden")
    })
}


window.addEventListener("click", (event)=>{
    console.log(event.target)
    removeModal(event)
})


function removeModal(event) {
    const name = event.target.className;
    if(name === "overlay" 
    || name == "far fa-times-circle close"){
        loginBlock.classList.add("hidden")
        registerBlock.classList.add("hidden")
        overlay.classList.add("hidden")
    }
}

if(clock){
    console.log("CLOCK")
    setTime();
    setInterval(setTime, 1000*60);
}

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


