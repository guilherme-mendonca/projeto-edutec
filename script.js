import { verifyToken } from "./utils/verify-token.js"
import { getName } from "./utils/get-name.js"
import { logout } from "./utils/logout.js"

const url = "./paginas/login/login.html"


//Header animado
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop < lastScrollTop) {
        // Se a página está sendo rolada para cima, mostra o header
        header.style.transform = 'translateY(0)';
        header.classList.add('rolagem'); // Adiciona a classe para mudar a cor
    } else {
        // Se a página está sendo rolada para baixo, esconde o header
        header.style.transform = 'translateY(-100%)';
        header.classList.remove('rolagem'); // Remove a classe para voltar à cor original
    }
    
    lastScrollTop = scrollTop;
});

verifyToken(url)
getName()
logout()