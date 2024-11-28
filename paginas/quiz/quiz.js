import { verifyToken } from "../../utils/verify-token.js"

const url = "../login/login.html"

verifyToken(url)


let quiz = {}
let pontos = 0
let pergunta = 1
let resposta = ""
let idInputResposta = ""
let respostaCorretaId = ""

async function buscarPerguntas() {
    const urlDados = "../../data.json"

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            quiz = dado
        })
    })
}

function montarPergunta() {
    const main = document.querySelector("main")

    main.innerHTML = `
                <div class="caixa">
            <p> ${pergunta}/10</p>
            <h2>${quiz.questions[pergunta - 1].question}</h2>

            <div class="alternativas">
                <label for="alternativa_a">
                    <input type="radio" name="value_radio" id="alternativa_a" value="${quiz.questions[pergunta - 1].options[0]}">    
                    ${quiz.questions[pergunta - 1].options[0]}
                </label>
                
                <label for="alternativa_b">
                    <input type="radio" name="value_radio" id="alternativa_b" value="${quiz.questions[pergunta - 1].options[1]}">
                    ${quiz.questions[pergunta - 1].options[1]}
                </label>

                <label for="alternativa_c">
                    <input type="radio" name="value_radio" id="alternativa_c" value="${quiz.questions[pergunta - 1].options[2]}">
                    ${quiz.questions[pergunta - 1].options[2]}
                </label>
            </div>

    
            <button>Responder</button>
        </div>
    `
}

function guardarResposta(evento) {
    resposta = evento.target.value
    idInputResposta = evento.target.id

    const botaoEnviar = document.querySelector(".caixa button");
    botaoEnviar.addEventListener("click", validarResposta);
}

function validarResposta() {
    const botaoEnviar = document.querySelector(".caixa button");
    botaoEnviar.innerText = "Próxima";
    botaoEnviar.removeEventListener("click", validarResposta);

    // Identificar o container das alternativas
    const alternativasContainer = document.querySelector(".alternativas");

    // Remover mensagens anteriores, se existirem
    const feedbackAnterior = document.querySelectorAll('.certa, .errada');
    feedbackAnterior.forEach(elemento => elemento.remove());

    // Verificar se a resposta está correta
    if (resposta === quiz.questions[pergunta - 1].answer) {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta");

        // Criar e adicionar a span de feedback positivo
        const spanCerta = document.createElement('span');
        spanCerta.classList.add('certa');
        spanCerta.innerText = "Parabéns!";
        alternativasContainer.appendChild(spanCerta);
        //lagrimas
        pontos += 1;
    } else {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "errada");
        document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id", "correta");

        // Criar e adicionar a span de feedback negativo
        const spanErrada = document.createElement('span');
        spanErrada.classList.add('errada');
        spanErrada.innerText = "Resposta Errada";
        alternativasContainer.appendChild(spanErrada);
    }

    if (pergunta === 10) {
        botaoEnviar.innerText = "Finalizar";
        botaoEnviar.addEventListener("click", finalizar);
    } else {
        // Preparar para a próxima pergunta
        pergunta += 1;
        botaoEnviar.addEventListener("click", proximaPergunta);
    }
}

function finalizar() {
    localStorage.setItem("pontos", pontos)

    window.location.href = "../resultado/quiz-resultado.html"
}

//sei um pouco, copiei do benones e modifiquei algumas coisas
//Envia a pontuação para o back-end
try {
    const response = await fetch("http://localhost:3000/save-score", {
        method: "POST", // Método HTTP POST para envio de dados
        headers: {
            "Content-Type": "application/json", // Cabeçalho indicando JSON
            "Authorization": token // Cabeçalho de autorização com token JWT
        },
        body: JSON.stringify({ pontos }) // Corpo da requisição com a pontuação do usuário
    });

    // Verifica se a pontuação foi salva com sucesso
    if (response.ok) {
        alert("Pontuação salva com sucesso!");
    } else {
        alert("Erro ao salvar a pontuação!");
    }
} catch (error) {
    console.error("Erro:", error); // Exibe erros no console
}


function proximaPergunta() {
    montarPergunta()
    adicionarEventoInputs()
}

function adicionarEventoInputs() {
    const inputsResposta = document.querySelectorAll(".caixa input")
    inputsResposta.forEach(input => {
        input.addEventListener("click", guardarResposta)

        if (input.value === quiz.questions[pergunta - 1].answer) {
            respostaCorretaId = input.id
        }
    })
}

async function iniciar() {
    await buscarPerguntas()
    montarPergunta()
    adicionarEventoInputs()
}

iniciar()