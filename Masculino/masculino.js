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


document.addEventListener("DOMContentLoaded", () => {
    const btnsFavorito = document.querySelectorAll(".btn-favorito");
    
    let favoritosSalvos = JSON.parse(localStorage.getItem("favoritos")) || [];

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

            localStorage.setItem("favoritos", JSON.stringify(favoritosSalvos));
            atualizarOverlayFavoritos();
        });
    });

    atualizarOverlayFavoritos(); // Executa ao carregar
});

// 🔁 Atualiza o conteúdo do overlay lateral com os favoritos
function atualizarOverlayFavoritos() {
    const container = document.querySelector(".overlay-favoritos-lista");
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!container) return;

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

            // Remove do localStorage
            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            favoritos = favoritos.filter(p => p.id !== id);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            // Atualiza overlay e ícone de coração
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
