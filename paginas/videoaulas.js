import { verifyToken } from "../utils/verify-token.js"
import { getName } from "../utils/get-name.js"

const url = "./login/login.html"

verifyToken(url)
getName()

function abrirMiniplayer(videoUrl) {
    const miniplayer = document.getElementById('miniplayer');
    const iframe = document.getElementById('miniplayer-video');
    const abrirNovaGuia = document.getElementById('abrir-em-nova-guia');
    
    iframe.src = videoUrl;
    abrirNovaGuia.href = videoUrl;
    
    miniplayer.style.display = 'block';
}

function fecharMiniplayer() {
    const miniplayer = document.getElementById('miniplayer');
    const iframe = document.getElementById('miniplayer-video');
    
    iframe.src = '';
    miniplayer.style.display = 'none';
}