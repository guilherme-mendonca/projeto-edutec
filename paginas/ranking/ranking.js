import { verifyToken } from "../../utils/verify-token.js"
import { getName } from "../../utils/get-name.js"

const url = "../login/login.html"

verifyToken(url)

//Nao sei, copiei do benones e modifiquei algumas coisas
// Função para buscar e exibir o ranking dos usuários
async function fetchRanking() {
    try {
        const token = localStorage.getItem("token"); // Recupera o token do localStorage

        const response = await fetch("http://localhost:3000/ranking", {
            headers: { "Authorization": token }
        });

        if (response.ok) {
            const rankingData = await response.json();
            const rankingTable = document.getElementById("rankingTable");
            const tbody = rankingTable.querySelector("tbody");

            // Limpa a tabela antes de preenchê-la com novos dados
            tbody.innerHTML = "";

            // Preenche a tabela com os dados de ranking
            rankingData.forEach((item) => {
                const row = document.createElement("tr");
                const usernameCell = document.createElement("td");
                const scoreCell = document.createElement("td");

                usernameCell.textContent = item.name; // Nome do usuário
                scoreCell.textContent = item.scores; // Pontuação

                row.appendChild(usernameCell);
                row.appendChild(scoreCell);
                tbody.appendChild(row);
            });

            rankingTable.style.display = "table"; // Exibe a tabela
        } else {
            alert("Erro ao buscar o ranking."); // Exibe erro se a busca falhar
        }
    } catch (error) {
        console.error("Erro:", error); // Loga erros no console
    }
}

fetchRanking()
getName()

// const li = document.querySelector("li")

// p.innerTEXT = `${namep}`
// span.innerTEXT = `${pontos}`
