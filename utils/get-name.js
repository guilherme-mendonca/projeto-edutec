export async function getName() {
    const token = localStorage.getItem("token")

    if (!token) {
        return
    }

    const response = await fetch("http://localhost:3000/getname", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    }).then(response => response.json())

    //vai pegar o nome do usuario e inserir no paragrafo
    const nameP = document.querySelector("p")
    nameP.innerText = `${response.name}`
}