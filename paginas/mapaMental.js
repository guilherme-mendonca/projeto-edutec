function abrirModal(imagem) {
    const modal = document.getElementById("modal");
    const imagemGrande = document.getElementById("imagem-grande"); // ,-, lagrimas

    modal.style.display = "block";
    imagemGrande.src = imagem.src;

    downloadBtn.href = imagem.src;
    downloadBtn.download = "imagem-download";
}

function fecharModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

