class Orcamento {
    constructor(nome, descricao, custoHora, horasEstimadas) {
        this.nome = nome;
        this.descricao = descricao;
        this.custoHora = parseFloat(custoHora);
        this.horasEstimadas = parseFloat(horasEstimadas);
        this.dataCriacao = new Date().toLocaleString(); // Data e hora do registro
    }

    get calcularCustoTotal() {
        return this.custoHora * this.horasEstimadas;
    }
}

class GerenciadorDeOrcamentos {
    constructor() {
        this.orcamentos = [];
        this.tabela = document.getElementById("lista-orcamentos");
    }

    adicionarOrcamento(orcamento) {
        this.orcamentos.push(orcamento);
        this.atualizarTabelaOrcamentos();
    }

    editarOrcamento(index, orcamentoAtualizado) {
        this.orcamentos[index] = orcamentoAtualizado;
        this.atualizarTabelaOrcamentos();
    }

    removerOrcamento(index) {
        this.orcamentos.splice(index, 1);
        this.atualizarTabelaOrcamentos();
    }

    atualizarTabelaOrcamentos() {
        this.tabela.innerHTML = "";
        this.orcamentos.forEach((orcamento, index) => {
            this.tabela.innerHTML += `
                <tr style="color: #333;">
                    <td>${orcamento.nome}</td>
                    <td>${orcamento.descricao}</td>
                    <td>R$ ${orcamento.custoHora.toFixed(2)}</td>
                    <td>${orcamento.horasEstimadas}</td>
                    <td>R$ ${orcamento.calcularCustoTotal.toFixed(2)}</td>
                    <td>${orcamento.dataCriacao}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarOrcamentoFormulario(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="removerOrcamentoFormulario(${index})">Remover</button>
                    </td>
                </tr>
            `;
        });
    }
}

const gerenciadorDeOrcamentos = new GerenciadorDeOrcamentos();
const formOrcamento = document.getElementById("form-orcamento");
const campoIndexId = document.getElementById("index-id");
const campoNome = document.getElementById("nome");
const campoDescricao = document.getElementById("descricao");
const campoCustoHora = document.getElementById("custoHora");
const campoHorasEstimadas = document.getElementById("horasEstimadas");

formOrcamento.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const descricao = campoDescricao.value.trim();
    const custoHora = campoCustoHora.value.trim();
    const horasEstimadas = campoHorasEstimadas.value.trim();
    const id = campoIndexId.value;

    const orcamento = new Orcamento(nome, descricao, custoHora, horasEstimadas);

    if (id === "") {
        gerenciadorDeOrcamentos.adicionarOrcamento(orcamento);
    } else {
        gerenciadorDeOrcamentos.editarOrcamento(id, orcamento);
        campoIndexId.value = "";
    }

    formOrcamento.reset();
});

function removerOrcamentoFormulario(index) {
    gerenciadorDeOrcamentos.removerOrcamento(index);
}

function editarOrcamentoFormulario(index) {
    const orcamento = gerenciadorDeOrcamentos.orcamentos[index];

    campoNome.value = orcamento.nome;
    campoDescricao.value = orcamento.descricao;
    campoCustoHora.value = orcamento.custoHora;
    campoHorasEstimadas.value = orcamento.horasEstimadas;
    campoIndexId.value = index;
}