let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function mostrarSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function mudarSlide(step) {
    slideIndex += step;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    mostrarSlide(slideIndex);
}

function mudarSlidePara(index) {
    slideIndex = index;
    mostrarSlide(slideIndex);
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarSlide(slideIndex);
    setInterval(() => mudarSlide(1), 4000); // Troca automática
});


// ----------------------------------DESTAQUES---------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const carrossel = document.querySelector(".carrossel");
    const rolagem = document.querySelector(".rolagem");

    // Garante que o primeiro item do carrossel seja visível no início
    carrossel.scrollLeft = 0;

    // Atualiza a rolagem ao arrastar a barra
    rolagem.addEventListener("input", (event) => {
        const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
        carrossel.scrollLeft = (maxScroll * event.target.value) / 100;
    });

    // Atualiza a barra de rolagem ao rolar o carrossel manualmente
    carrossel.addEventListener("scroll", () => {
        const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
        rolagem.value = (carrossel.scrollLeft / maxScroll) * 100;
    });
});



document.addEventListener("DOMContentLoaded", function () {
    updateCardPositions();
});

function shiftLeft() {
    const cardsContainer = document.querySelector(".carousel-cards-container");
    const lastCard = cardsContainer.lastElementChild;

    // Move o último cartão para o começo da lista instantaneamente
    cardsContainer.insertBefore(lastCard, cardsContainer.firstElementChild);
    
    // Atualiza posições
    updateCardPositions();
}

function shiftRight() {
    const cardsContainer = document.querySelector(".carousel-cards-container");
    const firstCard = cardsContainer.firstElementChild;

    // Move o primeiro cartão para o final da lista instantaneamente
    cardsContainer.appendChild(firstCard);
    
    // Atualiza posições
    updateCardPositions();
}


function updateCardPositions() {
    const cards = document.querySelectorAll(".carousel-card");

    cards.forEach(card => {
        card.classList.remove("left-card", "right-card", "center-card", "penultimate-card", "last-card");
        card.style.transform = "scale(0.80) translateX(170px)";
        card.style.zIndex = "1";
    });

    const centerIndex = Math.floor(cards.length / 2);
    const centerCard = cards[centerIndex];
    centerCard.classList.add("center-card");
    centerCard.style.transform = "scale(1.2)";
    centerCard.style.zIndex = "10";
    
    const prevCard = centerCard.previousElementSibling || cards[cards.length - 1];
    const nextCard = centerCard.nextElementSibling || cards[0];

    prevCard.classList.add("left-card");
    nextCard.classList.add("right-card");

    prevCard.style.transform = "scale(1) translateX(30px)";
    nextCard.style.transform = "scale(1) translateX(-30px)";

    // Ajuste para o primeiro e último cartão
    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];
    const penultimateCard = cards[cards.length - 2];

    firstCard.style.transform = "scale(0.9) translateX(140px)";
    lastCard.style.transform = "scale(0.9) translateX(-140px)";
    
    // Garante que o penúltimo cartão tenha um z-index maior que o último
    penultimateCard.style.zIndex = "5"; // Coloca o penúltimo à frente do último
    lastCard.style.zIndex = "4"; // Coloca o último atrás do penúltimo
}


// Carrossel automático (passa a cada 5 segundos)
let autoShift = setInterval(shiftRight, 3000);

// Pausar rotação ao passar o mouse e retomar ao sair
const carouselContainer = document.querySelector(".carousel-container");

carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoShift);
});

carouselContainer.addEventListener("mouseleave", () => {
    autoShift = setInterval(shiftRight, 5000);
});


document.addEventListener("DOMContentLoaded", () => {
    const carrossel = document.querySelector(".carrossel");
    const rolagem = document.querySelector(".rolagem");

    // Garante que o primeiro item do carrossel seja visível no início
    carrossel.scrollLeft = 0;

    // Atualiza a rolagem ao arrastar a barra
    rolagem.addEventListener("input", (event) => {
        const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
        carrossel.scrollLeft = (maxScroll * event.target.value) / 100;
    });

    // Atualiza a barra de rolagem ao rolar o carrossel manualmente
    carrossel.addEventListener("scroll", () => {
        const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
        rolagem.value = (carrossel.scrollLeft / maxScroll) * 100;
    });
});





// -------------------------------POPULARES - barra------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".carrossel-container");

    containers.forEach(container => {
        const carrossel = container.querySelector(".carrossel");
        const rolagem = container.querySelector(".rolagem");

        // Início com scroll 0
        carrossel.scrollLeft = 0;

        // Atualiza carrossel ao mexer na barra
        rolagem.addEventListener("input", (event) => {
            const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
            carrossel.scrollLeft = (maxScroll * event.target.value) / 100;
        });

        // Atualiza barra ao rolar o carrossel
        carrossel.addEventListener("scroll", () => {
            const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
            rolagem.value = (carrossel.scrollLeft / maxScroll) * 100;
        });
    });
});




// -------------------------------Armazenamento e remoção de produtos - favoritos------------------------------------------


document.addEventListener("DOMContentLoaded", () => {
    const btnsFavorito = document.querySelectorAll(".btn-favorito");
    const usuarioLogado = sessionStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
        console.warn("Usuário não está logado. Favoritos não serão salvos.");
        return;
    }

    let favoritosSalvos = JSON.parse(localStorage.getItem(`favoritos_${usuarioLogado}`)) || [];

    btnsFavorito.forEach((btn) => {
        const produto = btn.closest(".produto-item");
        const id = produto.dataset.id;

        // Atualiza ícone se o item já está nos favoritos
        if (favoritosSalvos.find(p => p.id === id)) {
            btn.querySelector("i").classList.remove("fa-regular");
            btn.querySelector("i").classList.add("fa-solid");
        }

        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const nome = produto.querySelector(".produto-descricao").innerText;
            const preco = produto.querySelector(".produto-preco").innerText;
            const img = produto.querySelector("img").src;
            const marca = produto.querySelector(".produto-marca").innerText;
            const link = produto.href || "#";

            const favorito = { id, nome, preco, img, marca, link };
            const index = favoritosSalvos.findIndex(p => p.id === id);

            if (index === -1) {
                favoritosSalvos.push(favorito);
                btn.querySelector("i").classList.remove("fa-regular");
                btn.querySelector("i").classList.add("fa-solid");
            } else {
                favoritosSalvos.splice(index, 1);
                btn.querySelector("i").classList.remove("fa-solid");
                btn.querySelector("i").classList.add("fa-regular");
            }

            localStorage.setItem(`favoritos_${usuarioLogado}`, JSON.stringify(favoritosSalvos));
            atualizarOverlayFavoritos();
        });
    });

    atualizarOverlayFavoritos(); // Executa ao carregar
});

// 🔁 Atualiza o conteúdo do overlay lateral com os favoritos
function atualizarOverlayFavoritos() {
    const container = document.querySelector(".overlay-favoritos-lista");
    const usuarioLogado = sessionStorage.getItem("usuarioLogado");
    if (!usuarioLogado || !container) return;

    const favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuarioLogado}`)) || [];

    container.innerHTML = favoritos.map(produto => `
        <div class="item-favorito" data-id="${produto.id}">
            <a href="${produto.link}" class="favorito-link">
                <img src="${produto.img}" alt="${produto.nome}" />
                <div class="favorito-info">
                    <p class="favorito-marca">${produto.marca}</p>
                    <p class="favorito-nome">${produto.nome}</p>
                    <p class="favorito-preco">${produto.preco}</p>
                </div>
            </a>
            <button class="remover-favorito">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join("");

    // Adiciona evento aos botões de remover
    document.querySelectorAll(".remover-favorito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const item = btn.closest(".item-favorito");
            const id = item.dataset.id;

            let favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuarioLogado}`)) || [];
            favoritos = favoritos.filter(p => p.id !== id);
            localStorage.setItem(`favoritos_${usuarioLogado}`, JSON.stringify(favoritos));

            atualizarOverlayFavoritos();
            atualizarIconeCoração(id, false);
        });
    });
}

// 🔁 Atualiza o ícone de coração de um produto na página inicial
function atualizarIconeCoração(id, favoritado) {
    const produto = document.querySelector(`.produto-item[data-id="${id}"]`);
    if (!produto) return;

    const btn = produto.querySelector(".btn-favorito i");
    if (!btn) return;

    if (favoritado) {
        btn.classList.remove("fa-regular");
        btn.classList.add("fa-solid");
    } else {
        btn.classList.remove("fa-solid");
        btn.classList.add("fa-regular");
    }
}
