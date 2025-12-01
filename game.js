// CONFIG
const NUM_EDIFICACOES = 20;
let destruidos = 0;
let playerLife = 100;

// IMAGENS
const imgEdificacao =
  "https://theriagames.com/wp-content/uploads/2025/02/King_Tower_Red_Active-1.webp";

// imagem de explosão estática
const imgExplosao =
  "https://elements-resized.envatousercontent.com/elements-video-cover-images/video-previews/0e400de8-86b2-434e-8c93-393b170829fa/3wcFLmLSRUW5imTe2GlI_2uvxsr9wQSmLy7G8E58A_Explosion_v01__render_all_37.png?w=500&cf_fit=cover&q=85&format=auto&s=94c84f1b5c167eb0c93eae6646e5f43fb984ff761a806dd6ad09f8ceb8b028c1";

const campo = document.getElementById("campo");
const tela = document.getElementById("tela");

// === GERAR 20 EDIFICAÇÕES EM POSIÇÕES ALEATÓRIAS ===
for (let i = 1; i <= NUM_EDIFICACOES; i++) {
    const div = document.createElement("div");
    div.className = "edificacao";
    div.id = "ed" + i;

    div.dataset.life = 100;

    const maxX = campo.offsetWidth - 90;
    const maxY = campo.offsetHeight - 90;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    div.style.left = x + "px";
    div.style.top = y + "px";

    div.innerHTML = `
        <div class="lifeBar"><div class="lifeFill"></div></div>
        <img id="img-ed${i}" src="${imgEdificacao}">
    `;

    div.onclick = () => atacarEdificacao(div);

    campo.appendChild(div);
}

// === ATAQUE AO CLICAR ===
function atacarEdificacao(div) {
    let life = parseInt(div.dataset.life);
    life -= 20;
    div.dataset.life = life;

    const fill = div.querySelector(".lifeFill");
    fill.style.width = Math.max(life, 0) + "%";

    if (life <= 0 && !div.dataset.dead) {
        div.dataset.dead = "true";

        // mostrar explosão
        div.querySelector("img").src = imgExplosao;

        // depois de meio segundo some
        setTimeout(() => {
            div.style.opacity = "0";
            div.style.pointerEvents = "none";
        }, 500);

        destruidos++;

        if (destruidos === NUM_EDIFICACOES) abrirModal();
    }
}

// === ATAQUES DO INIMIGO A CADA 2 SEGUNDOS ===
setInterval(() => {

    tela.style.borderColor = "red";

    setTimeout(() => {
        tela.style.borderColor = "#444";
    }, 500);

    playerLife -= 5;
    document.getElementById("playerLifeBar").style.width = playerLife + "%";
    
}, 2000);

// === MODAL ===
function abrirModal() {
    document.getElementById("winModal").style.display = "flex";
}

document.getElementById("nextBtn").onclick = () => {
    window.location.href = "congratulations.html";
};
