async function register() {
    const name = document.querySelector("#name").value
    const password = document.querySelector("#password").value
    const confirmationPassword = document.querySelector("#confirmationPassword").value

    if (name === "" ||  password === "" || confirmationPassword === "") {
        alert("Preencha todas as informações!")
        return
    }

    if (password !== confirmationPassword) {
        alert("As senhas não conferem!")
        document.querySelector("#password").value = ""
        document.querySelector("#confirmationPassword").value = ""
        return
    }

    const user = {
        name,
        password,
    }

    const response = await fetch("http://localhost:3000/register", { //Enviar o objeto user para o backend
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    }).then(response => response.json())

    alert(response.message)

    if(response.userExists) {
        window.location.reload()
        return
    }

    window.location.href = "../login/login.html"
}

const button = document.querySelector("div button")

// Previne que a página seja recarregada quando o botão e pressionado
button.addEventListener("click", (event) => {
    event.preventDefault()
    register()
})