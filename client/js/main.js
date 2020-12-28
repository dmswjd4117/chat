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
        userBox.innerHTML = `
            <button onclick="logoutHandler()"> 로그아웃 </button>
            <div id="user-greeting">
                hello user!
            </div>`
    }
    else{
        const newLocal = `
            <button onclick="registerHandler()"> 회원가입 </button>
            <button onclick="loginHandler()"> 로그인 </button>`
        userBox.innerHTML = newLocal
    }
}