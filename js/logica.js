/*
  TEMA: análise dos planos de acompanhamento nutricional da Amanda Janine.

  ENTRADA: valor máximo (em reais) que a pessoa quer pagar, digitado via prompt.

  PROCESSAMENTO: classificar cada plano por faixa de preço, tratar cada
  modalidade (presencial/online), contar planos dentro do orçamento
  e descobrir o plano mais caro.

  SAÍDA: frases no console e uma tabela-resumo com console.table.

  PSEUDOCÓDIGO:
  1. Criar a lista de planos
  2. Perguntar o valor máximo e validar a resposta
  3. Para cada plano da lista:
     3.1 classificar o preço (acessível, intermediário ou premium)
     3.2 conferir a modalidade
     3.3 se couber no orçamento, contar e somar
     3.4 guardar o plano mais caro visto até agora
  4. Mostrar o resumo
*/

// ----- DADOS -----
const planos = [
  { nome: "Plano Raiz", preco: 200, modalidade: "presencial" },
  { nome: "Plano Florescer", preco: 540, modalidade: "presencial" },
  { nome: "Plano Plenitude", preco: 900, modalidade: "presencial" },
  { nome: "Plano Raiz", preco: 170, modalidade: "online" },
  { nome: "Plano Florescer", preco: 460, modalidade: "online" },
  { nome: "Plano Plenitude", preco: 760, modalidade: "online" }
];

// ----- ENTRADA E VALIDAÇÃO -----
const resposta = prompt ("Digite o valor máximo (em reais) que você quer pagar pelo plano de acompanhamento nutricional:");
const numero = Number(resposta);

let orcamento = 0;
let entradaValida = false;

if (resposta === null) {
    console.log("Você cancelou a operação.");
    } else if (resposta.trim() === "") {
    console.log("Você não digitou nada. Recarregue a página e digite um valor válido.");
    } else if (Number.isNaN(numero)) {
    console.log("Isso não é um número. Recarregue a página e digite só números.");
    } else if (numero < 100 || numero > 1000) {
    console.log("Valor fora da faixa. Digite um valor entre 100 e 1000. Recarregue a página e tente novamente.");
    } else {
    orcamento = numero;
    entradaValida = true;
}

// ----- ANÁLISE -----
if (entradaValida === true) {
  let qtdDentro = 0;   //contador
  let somaDentro = 0;   //acumulador
  let maiorPreco = 0;   //máximo
  let nomeMaisCaro = "";
  const relatorio = [];
  
  for (let i = 0; i < planos.length; i++) {
    const plano = planos[i];

    // Classificação por faixa
    let faixa = "";
    if (plano.preco <= 200) {
      faixa = "acessível";
    } else if (plano.preco <= 540) {
      faixa = "intermediário";
    } else {
      faixa = "premium";
    }

    // Descrição por modalidade
    let descricao = "";
    switch (plano.modalidade) {
      case "presencial":
        descricao = "Atendimento presencial, com avaliação antropométrica.";
        break;
      case "online":
        descricao = "Atendimento online, sem avaliação antropométrica.";
        break;
      default:
        descricao = "Modalidade desconhecida.";
    }

    // Contador e acumulador
    const cabeNoOrcamento = plano.preco <= orcamento;
    if (cabeNoOrcamento === true) {
      qtdDentro++;
      somaDentro += plano.preco;
    }

    // Máximo
    if (plano.preco > maiorPreco) {
      maiorPreco = plano.preco;
      nomeMaisCaro = `${plano.nome} (${plano.modalidade})`;
    }

    console.log(`${plano.nome} (${plano.modalidade}): R$ ${plano.preco} - faixa ${faixa}. ${descricao}.`);

    relatorio.push({
      plano: plano.nome,
      modalidade: plano.modalidade,
      preco: plano.preco,
      faixa: faixa,
      cabeNoOrcamento: cabeNoOrcamento
    });
  }

  // ----- RESUMO -----
  console.table(relatorio);
  console.log(`Orçamento informado: R$ ${orcamento}`);
  console.log(`Planos dentro do orçamento: ${qtdDentro} de ${planos.length}`);

  if (qtdDentro > 0) {
    const media = somaDentro / qtdDentro;
    console.log(`Preço médiodos planos dentro do orçamento: R$ ${media.toFixed(2)}`);
  } else {
    console.log("Não há planos dentro do orçamento.");
  }

// ----- CONSULTA POR MODALIDADE -----
const textoMenu = `Consultar preços por modalidade. Digite "presencial", "online" ou "sair":`;
let comando = prompt(textoMenu);

while (comando !== null && comando.trim().toLowerCase() !== "sair") {
    const modalidadeEscolhida = comando.trim().toLowerCase();
    let encontrados = 0;

    for (const item of planos) {
        if (item.modalidade === modalidadeEscolhida) {
            console.log(`${item.nome} - R$ ${item.preco}`);
            encontrados++;
        }
    }

    if (encontrados === 0) {
    console.log(`Não entendi "${comando}". Digite presencial, online ou sair.`);
    }

    comando = prompt(textoMenu); //atualiza a condição, senão o laço nunca termina
}

console.log("Consulta encerrada");

}
