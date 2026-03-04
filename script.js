// --- 1. Dados Fictícios (Simulando um Banco de Dados) ---
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
        peso: "3 ton",
        valor: "R$ 1.200,00",
        empresa: "ModaLeve",
        data: "20/11/2025"
    },
];

//Gerar o HTML do Card de Carga
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
            <button onclick="simularNegociacao(${carga.id})">Negociar Frete</button>
        </div>
    `;
}

function renderizarCargas(cargas) {
    const container = document.getElementById('cargas-list');
    container.innerHTML = ''; // Limpa a mensagem de carregamento ou resultados anteriores

    if (cargas.length === 0) {
        container.innerHTML = '<p id="loading-message">Nenhuma carga encontrada para os critérios de busca. Tente novamente.</p>';
        return;
    }

    cargas.forEach(carga => {
        container.innerHTML += criarCardCarga(carga);
    });
}

//Função de Busca
function buscarCargas() {
    const input = document.getElementById('searchInput');
    // Converte a busca para minúsculas e remove espaços para facilitar a comparação
    const termoBusca = input.value.toLowerCase().trim();

    if (!termoBusca) {
        // Se o campo estiver vazio, mostra todas as cargas
        renderizarCargas(cargasDisponiveis);
        return;
    }

    const resultados = cargasDisponiveis.filter(carga => {
        // Verifica se o termo de busca está em qualquer um dos campos relevantes
        return carga.origem.toLowerCase().includes(termoBusca) ||
               carga.destino.toLowerCase().includes(termoBusca) ||
               carga.tipo.toLowerCase().includes(termoBusca) ||
               carga.empresa.toLowerCase().includes(termoBusca);
    });

    renderizarCargas(resultados);
}

//Função de Simulação de Negociação
function simularNegociacao(cargaId) {
    const carga = cargasDisponiveis.find(c => c.id === cargaId);
    if (carga) {
        alert(`NEGOCIAÇÃO INICIADA: Você está entrando em contato com a empresa ${carga.empresa} para o frete de ${carga.tipo} (R$ ${carga.valor}).\n\n A empresa aceitou sua proposta e enviará os detalhes por e-mail!`);
    }
}

//Inicialização
window.onload = () => {
    // Adiciona o evento de 'Enter' na barra de busca
    document.getElementById('searchInput').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            buscarCargas();
        }
    });
    
    // Renderiza a lista inicial
    renderizarCargas(cargasDisponiveis);
};
