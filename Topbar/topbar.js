document.addEventListener("click", (e) => { 
  const overlay = document.getElementById("overlay");
  const carrinhoLateral = document.getElementById("carrinhoLateral");
  const favoritosLateral = document.getElementById("favoritosLateral");

  // Sacola
  if (e.target.closest(".sacola-btn")) {
    carrinhoLateral.classList.add("aberto");
    overlay.classList.add("visivel");
  }

  // Favoritos
  if (e.target.closest(".favoritos-btn")) {
    favoritosLateral.classList.add("aberto");
    overlay.classList.add("visivel");
    carregarFavoritos(); // <-- Chama ao abrir os favoritos
  }

  // Fechar
  if (
    e.target.closest("#fecharCarrinho") ||
    e.target.closest("#fecharFavoritos") ||
    e.target === overlay
  ) {
    carrinhoLateral.classList.remove("aberto");
    favoritosLateral.classList.remove("aberto");
    overlay.classList.remove("visivel");
  }
});



// Função para carregar favoritos do localStorage no overlay
function carregarFavoritos() {
  const listaFavoritos = document.getElementById("listaFavoritos");
  listaFavoritos.innerHTML = "";

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px ;
      color: #6b7280; /* Tailwind's text-gray-500 */
      text-align: center;
      font-size: 16px;
      margin-top: 150px;
    ">
      <i class="fas fa-heart-broken" style="font-size: 36px; margin-bottom: 12px; color: #e5e7eb;"></i>
      <p style="margin: 0;">Nenhum produto favoritado.</p>
    </div>
  `;
    return;
  }

  favoritos.forEach(produto => {
    const item = document.createElement("div");
    item.setAttribute("style", `
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 12px;
      gap: 16px;
    `);
  
    item.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px;">
        <img src="${produto.img}" alt="${produto.nome}" style="
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #ccc;
        " />
        <div style="text-align: left;">
          <p style="margin: 0; font-weight: 500; color: #333; font-size: 14px;">
            ${produto.nome}
          </p>
          <p style="margin: 4px 0 8px; color: #777; font-size: 14px;">
            ${produto.preco}
          </p>
          <button class="remover-favorito" data-id="${produto.id}" style="
            color: #e53935;
            font-size: 14px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            " onmouseover="this.style.color='#b71c1c'; "
           onmouseout="this.style.color='#e53935'; this.style.textDecoration='none';
          ">
             Remover
          </button>
        </div>
      </div>
    `;
  
    listaFavoritos.appendChild(item);
  });
  
  
}

// Evento para remover favorito do localStorage
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remover-favorito")) {
    const id = e.target.dataset.id;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos = favoritos.filter(p => p.id !== id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    carregarFavoritos();

    // Atualiza botão de coração na página principal (dispara evento customizado)
    const eventoAtualizaCoração = new CustomEvent("atualizarFavoritos");
    document.dispatchEvent(eventoAtualizaCoração);
  }
});
