async function login() {
    const name = document.querySelector("#name").value
    const password = document.querySelector("#password").value

    if(name === "" || password === "") {
        alert("Preencha todos os campos!")
        return
    }

    const user = {
        name,
        password
    }

    const response = await fetch("https://projeto-edutec-backend.vercel.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    }).then(response => response.json())

    if (response.ok) {
        console.log(response.token)
        localStorage.setItem("token", response.token)
        window.location.href = "../../index.html"
        return
    }

    alert(response.message)
    window.location.reload()
}

const button = document.querySelector("div button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    login()
})