
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      mostrarSecao(this.getAttribute("data-secao"));
    });
  });

  mostrarSecao("home");
});

function mostrarSecao(id) {
  document.querySelectorAll(".secao").forEach(secao => {
    secao.classList.remove("ativa");
  });
  document.getElementById(id).classList.add("ativa");
}

function carregarMesas() {
  fetch("/mesas")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("mesas-container");
      container.innerHTML = data.map(mesa => 
        `<div class="mesa-card">
          <h3>Mesa ${mesa.numero}</h3>
          <p class="${mesa.status === 'disponível' ? 'mesa-disponivel' : 'mesa-ocupada'}">
            ${mesa.status}
          </p>
          ${mesa.status === 'ocupada' ? `<button onclick="fecharConta(${mesa.id})">Fechar Conta</button>` : ''}
        </div>`
      ).join('');
    });
}

function carregarCardapio() {
  fetch("/cardapio")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("cardapio-container");
      container.innerHTML = data.map(item =>
        `<div class="mesa-card">
          <h4>${item.nome}</h4>
          <p>R$ ${item.preco.toFixed(2)} - ${item.categoria}</p>
        </div>`
      ).join('');
    });
}

function fecharConta(mesaId) {
  fetch(`/fechar-conta/${mesaId}`, { method: "POST" })
    .then(res => res.json())
    .then(msg => {
      alert(msg.mensagem);
      carregarMesas();
    });
}
