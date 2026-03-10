const cargasDisponiveis = [
    {
        id: 1,
        origem: "Dionísio Cerqueira - SC",
        destino: "Belo Horizonte - MG",
        tipo: "Eletrônicos",
        peso: "1.5 ton",
        valor: "R$ 3.800,00",
        empresa: "TechLog",
        data: "20/11/2025"
    },
    {
        id: 2,
        origem: "Curitiba - PR",
        destino: "Porto Alegre - RS",
        tipo: "Grãos (Soja)",
        peso: "25 ton",
        valor: "R$ 6.500,00",
        empresa: "AgroMais",
        data: "21/11/2025"
    },
    {
        id: 3,
        origem: "Rio de Janeiro - RJ",
        destino: "Vitória - ES",
        tipo: "Alimentos Congelados",
        peso: "8 ton",
        valor: "R$ 2.900,00",
        empresa: "FrioMax",
        data: "22/11/2025"
    },
    {
        id: 4,
        origem: "São Paulo - SP",
        destino: "Campinas - SP",
        tipo: "Têxteis",
        peso: "10 ton",
        valor: "R$ 30.200,00",
        empresa: "ModaLeve",
        data: "20/11/2025"
    },
    {
        id: 5,
        origem: "Aparecida de Goiânia - GO",
        destino: "Porto Velho - RO",
        tipo: "Farinha",
        peso: "35 ton",
        valor: "R$ 120.000,00",
        empresa: "Moinho Vitória",
        data: "26/11/2025"
    },
    {
        id: 6,
        origem: "Planaltina - DF",
        destino: "Goiânia - GO",
        tipo: "Café em grão",
        peso: "40 ton",
        valor: "R$ 1.050.000,00",
        empresa: "Sitari",
        data: "15/11/2025"
    },
];

// Quando a página carrega, faz tudo funcionar
window.onload = () => {
    verificarProtecao(); 
    ajustarHeader();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                buscarCargas();
            }
        });
    }
    
    if (document.getElementById('cargas-list')) {
        renderizarCargas(cargasDisponiveis);
    }

    carregarHistorico();
};

// Cria um card (caixa) com os dados de uma carga
function criarCardCarga(carga) {
    return `
        <div class="card-carga">
            <h3><i class="fas fa-box"></i> ${carga.tipo}</h3>
            <p><span class="origem-destino">${carga.origem}</span> <i class="fas fa-arrow-right"></i> <span class="origem-destino">${carga.destino}</span></p>
            <p>Peso: <strong>${carga.peso}</strong></p>
            <p>Empresa: ${carga.empresa}</p>
            <p>Data Limite: ${carga.data}</p>
            <div class="valor">
                Frete: ${carga.valor}
            </div>
            <button onclick='negociarCarga(${JSON.stringify(carga)})'>
            Negociar Carga
            </button>
        </div>
    `;
}

// Monta os cards das cargas e coloca elas na tela
function renderizarCargas(cargas) {
    const container = document.getElementById('cargas-list');
    container.innerHTML = '';

    if (cargas.length === 0) {
        container.innerHTML = '<p id="loading-message">Nenhuma carga encontrada para os critérios de busca. Tente novamente.</p>';
        return;
    }

    cargas.forEach(carga => {
        container.innerHTML += criarCardCarga(carga);
    });
}

// Busca cargas pelo que o usuário digitou na caixa de busca
function buscarCargas() {
    const input = document.getElementById('searchInput');
    const termoBusca = input.value.toLowerCase().trim();

    if (!termoBusca) {
        renderizarCargas(cargasDisponiveis);
        return;
    }

    const resultados = cargasDisponiveis.filter(carga => {
        return carga.origem.toLowerCase().includes(termoBusca) ||
               carga.destino.toLowerCase().includes(termoBusca) ||
               carga.tipo.toLowerCase().includes(termoBusca) ||
               carga.empresa.toLowerCase().includes(termoBusca);
    });

    renderizarCargas(resultados);
}

// Simula uma negociação: avisa que entrou em contato com a empresa
function simularNegociacao(cargaId) {

    const carga = cargasDisponiveis.find(c => c.id === cargaId);

    if (carga) {

        alert(`NEGOCIAÇÃO INICIADA: Você está entrando em contato com a empresa ${carga.empresa} para o frete de ${carga.tipo}.`);

        let historico = JSON.parse(localStorage.getItem("historicoCargas")) || [];
        historico.push(carga);
        localStorage.setItem("historicoCargas", JSON.stringify(historico));
    }
}



// Mostra as cargas que o usuário já clicou em "Negociar"
function carregarHistorico(){
    const historico = JSON.parse(localStorage.getItem("historicoCargas")) || [];
    const container = document.getElementById("historico-container");

    if(!container) return;
    if(historico.length === 0){
        container.innerHTML = "<p>Nenhuma carga negociada ainda.</p>";
        return;
    }

    let html = '';
    historico.forEach(carga => {
        html += `
        <div class="card-carga">
            <h3><i class="fas fa-box"></i> ${carga.tipo}</h3>
            <p><span class="origem-destino">${carga.origem}</span> <i class="fas fa-arrow-right"></i> <span class="origem-destino">${carga.destino}</span></p>
            <p>Peso: <strong>${carga.peso}</strong></p>
            <p>Empresa: ${carga.empresa}</p>
            <p>Data Limite: ${carga.data}</p>
            <p>Frete: ${carga.valor}</p>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

// Quando o usuário clica em "Negociar Carga", salva a carga no histórico
function negociarCarga(carga){
    let historico = JSON.parse(localStorage.getItem("historicoCargas")) || [];
    historico.push(carga);
    localStorage.setItem("historicoCargas", JSON.stringify(historico));
    alert("Carga negociada com sucesso! Adicionada ao histórico.");
}

// Deleta todas as cargas do histórico
function limparHistorico(){
    localStorage.removeItem("historicoCargas");
    location.reload();
}

// Transforma "R$ 1.000,00" em número (1000) para fazer contas
function converterValorParaNumero(valorTexto) {
    return parseFloat(valorTexto.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
}

function criarCardCarga(carga) {
    const valorNumerico = converterValorParaNumero(carga.valor);
    let corValor = "#28a745";
    let estiloExtra = "";

    if (valorNumerico >= 1000000) {
        corValor = "#d4af37";
        estiloExtra = "font-weight: bold; font-size: 1.2em;";
    } else if (valorNumerico >= 100000) {
        corValor = "#ff8c00";
    }

    return `
        <div class="card-carga">
            <h3><i class="fas fa-box"></i> ${carga.tipo}</h3>
            <p><i class="fas fa-map-marker-alt"></i> <span class="origem-destino">${carga.origem}</span> <i class="fas fa-arrow-right"></i> <span class="origem-destino">${carga.destino}</span></p>
            <p><i class="fas fa-weight-hanging"></i> Peso: <strong>${carga.peso}</strong></p>
            <p><i class="fas fa-building"></i> Empresa: ${carga.empresa}</p>
            <p><i class="fas fa-calendar-alt"></i> Data Limite: ${carga.data}</p>
            <div class="valor" style="color: ${corValor}; ${estiloExtra}">
                <i class="fas fa-coins"></i> Frete: ${carga.valor}
            </div>
            <button onclick='negociarCarga(${JSON.stringify(carga)})'>
                <i class="fas fa-handshake"></i> Negociar Carga
            </button>
        </div>
    `;
}

// Faz login: pega o usuário e senha, verifica se estão corretos
function realizarLogin() {
    const usuario = document.getElementById("InputUsuario").value;
    const senha = document.getElementById("InputSenha").value;

    if(usuario === "motorista@teste.com" && senha === "123456") {
        localStorage.setItem("logado", "true");
        localStorage.setItem("usuario", usuario);
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha incorretos! // Tente: motorista@teste.com / 123456");
    }
}

// Faz logout: apaga os dados do usuário e volta para a página de login
function logout() {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}

// Bloqueia acesso: se o usuário não está logado, volta para o login
function verificarProtecao() {
    const estaLogado = localStorage.getItem("logado");
    const paginaAtual = window.location.pathname;

    if (estaLogado !== "true" && !paginaAtual.includes("login.html")) {
        window.location.href = "login.html";
    }
}

// Se usuário está logado, mostra o botão de "Sair" no topo
function ajustarHeader() {
    const estaLogado = localStorage.getItem("logado");
    const header = document.querySelector('header');
    if (estaLogado === "true") {
        const logoutLink = document.createElement('a');
        logoutLink.href = "#";
        logoutLink.onclick = logout;
        logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Sair';
        logoutLink.style.marginLeft = 'auto';
        logoutLink.style.color = 'var(--text-light)';
        logoutLink.style.textDecoration = 'none';
        logoutLink.style.fontSize = '1em';
        logoutLink.style.padding = '5px 10px';
        logoutLink.style.borderRadius = '5px';
        logoutLink.style.transition = 'background-color 0.3s';
        logoutLink.style.backgroundColor = 'var(--secondary-color)';
        logoutLink.onmouseover = () => logoutLink.style.backgroundColor = 'var(--primary-color)';
        logoutLink.onmouseout = () => logoutLink.style.backgroundColor = 'var(--secondary-color)';
        header.appendChild(logoutLink);
    }
}
