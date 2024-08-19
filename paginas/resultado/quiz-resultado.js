const botaoJogarNovamente = document.querySelector("button")

botaoJogarNovamente.addEventListener("click", jogarNovamente)

function inserirResultado() {
    const pontuacao = document.querySelector("span")
    const pontos = localStorage.getItem("pontos")

    pontuacao.innerHTML = `
        Você acertou ${pontos} de 10
    `
}

function jogarNovamente() {
    localStorage.removeItem("pontos")

    window.location.href = "../quiz/quiz.html"
}

inserirResultado()