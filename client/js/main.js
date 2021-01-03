import clock from "/public/clock.js";
import todo from "/public/todo.js";
import one from "/public/shortcut.js"

const userBox = document.getElementById("user-box")
let isitLoginied = false;

function logoutHandler(params) {
    console.log('params')
}


function registerHandler(params) {
    window.location.href = "/user/register";
}


function loginHandler() {
    window.location.href = "/user/login";
}


if(userBox){
    if(isitLoginied){
        const button = document.createElement("button")
        button.addEventListener("click",logoutHandler);
        userBox.appendChild(button)
    }
    else{
        const registerButton = document.createElement("button")
        registerButton.innerText = "회원가입"
        registerButton.addEventListener("click",registerHandler);

        const loginButton = document.createElement("button")
        loginButton.innerText = "로그인"
        loginButton.addEventListener("click",loginHandler);

        userBox.appendChild(registerButton)
        userBox.appendChild(loginButton)
    }
}


/*
        const newLocal = `
            <button onclick="registerHandler()"> 회원가입 </button>
            <button onclick="loginHandler()"> 로그인 </button>`
        userBox.innerHTML = newLocal
*/