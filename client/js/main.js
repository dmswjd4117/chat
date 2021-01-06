import clock from "/public/clock.js";
import todo from "/public/todo.js";
import one from "/public/shortcut.js"


/*
const userBox = document.getElementById("user-box")

function logoutHandler(params) {
    fetch("/user/logout")
}


function registerHandler(params) {
    window.location.href = "/user/register";
}


function loginHandler() {
    window.location.href = "/user/login";
}

function getUSer() {
    fetch("/user/auth")
    .then(values=>values.json())
    .then(values => {
        if(values.login){
            const button = document.createElement("button")
            button.innerHTML = "로그아웃"
            button.addEventListener("click",logoutHandler);
            userBox.appendChild(button)
        }else{
            const registerButton = document.createElement("button")
            registerButton.innerText = "회원가입"
            registerButton.addEventListener("click",registerHandler);
    
            const loginButton = document.createElement("button")
            loginButton.innerText = "로그인"
            loginButton.addEventListener("click",loginHandler);
    
            userBox.appendChild(registerButton)
            userBox.appendChild(loginButton)
        }
    })
}


if(userBox){
    getUSer();
}



        const newLocal = `
            <button onclick="registerHandler()"> 회원가입 </button>
            <button onclick="loginHandler()"> 로그인 </button>`
        userBox.innerHTML = newLocal
*/