// ---------- DADOS ----------
const catalogoPlanos = [
    { nome: "Plano Raiz", modalidade: "presencial", preco: 200, duracaoMeses: 1 },
    { nome: "Plano Florescer", modalidade: "presencial", preco: 540, duracaoMeses: 3 },
    { nome: "Plano Plenitude", modalidade: "presencial", preco: 900, duracaoMeses: 6 },
    { nome: "Plano Raiz", modalidade: "online", preco: 170, duracaoMeses: 1 },
    { nome: "Plano Florescer", modalidade: "online", preco: 460, duracaoMeses: 3 },
    { nome: "Plano Plenitude", modalidade: "online", preco: 760, duracaoMeses: 6 }
];

const rotulosFaixa = {
    economico: "Econômico",
    intermediario: "Intermediário",
    premium: "Premium"
};

// ---------- FUNÇÕES QUE CALCULAM ----------

// Processa: devolve o preço por mês. O desconto é opcional (valor padrão 0).
function calcularPrecoMensal(preco, meses, desconto = 0) {
    const precoComDesconto = preco - preco * desconto;
    return precoComDesconto / meses;
}

// Classifica: devolve a faixa, testando da menor para a maior.
function classificarFaixa(precoMensal) {
    if (precoMensal <= 140) {
        return "economico";
    } else if (precoMensal <= 175) {
        return "intermediario";
    } else {
        return "premium";
    }
}

// Formata: número vira texto em reais (ex.: R$ 180,00).
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Resume: média do preço mensal, usando reduce.
function calcularMediaMensal(planos) {
    if (planos.length === 0) {
        return 0;
    }
    const soma = planos.reduce((acumulado, plano) => acumulado + plano.precoMensal, 0);
    return soma / planos.length;
}

// ---------- FUNÇÕES QUE MEXEM NA PÁGINA ----------

// Monta o elemento de UM plano e devolve (não insere em lugar nenhum).
function criarElementoPlano(plano) {
    const item = document.createElement("article");
    item.classList.add("plano-item", `faixa-${plano.faixa}`);

    const titulo = document.createElement("h3");
    titulo.textContent = `${plano.nome} (${plano.modalidade})`;

    const detalhe = document.createElement("p");
    detalhe.textContent = `${formatarPreco(plano.preco)} | Duração (meses): ${plano.duracaoMeses} | ${formatarPreco(plano.precoMensal)} por mês`;

    const rotulo = document.createElement("p");
    rotulo.textContent = `Faixa: ${rotulosFaixa[plano.faixa]}`;

    item.append(titulo, detalhe, rotulo);
    return item;
}

// Monta a linha de resumo e devolve.
function criarResumo(planos) {
    const media = calcularMediaMensal(planos);
    const qtdPremium = planos.filter((plano) => plano.faixa === "premium").length;

    const resumo = document.createElement("p");
    resumo.classList.add("resumo");
    resumo.textContent = `${planos.length} planos analisados. Preço mensal médio: ${formatarPreco(media)}. Planos na faixa premium: ${qtdPremium}.`;
    return resumo;
}

// Insere o resumo e um elemento por plano dentro da área.
function mostrarResultado(area, planos) {
    area.append(criarResumo(planos));
    for (const plano of planos) {
        area.append(criarElementoPlano(plano));
    }
}

// ---------- USO ----------

const planosAnalisados = catalogoPlanos.map((plano) => {
    const precoMensal = calcularPrecoMensal(plano.preco, plano.duracaoMeses);
    return {
        nome: plano.nome,
        modalidade: plano.modalidade,
        preco: plano.preco,
        duracaoMeses: plano.duracaoMeses,
        precoMensal: precoMensal,
        faixa: classificarFaixa(precoMensal)
    };
});

// sort altera o array, então ordenamos uma CÓPIA (slice) e o original fica intacto
const planosOrdenados = planosAnalisados.slice().sort((a, b) => a.precoMensal - b.precoMensal);

const areaResultado = document.querySelector("#resultado");

if (areaResultado === null) {
    console.error("Área #resultado não encontrada no HTML.");
} else {
    mostrarResultado(areaResultado, planosOrdenados);
}