const shortLink = document.getElementById("short-cut-add");
const shortForm = document.getElementById("shortcut-add-from")

shortLink.addEventListener("click", (e)=>{
    console.log("short")
    const form = `
    <form action="/shortcut/add" method="POST">
        <input name="name" placeholder="name" required>
        <input name="link" placeholder="link" required>
        <button>입력</button>
    </form>
    `
    shortForm.innerHTML = form;
})

const one = '1';

export default one;