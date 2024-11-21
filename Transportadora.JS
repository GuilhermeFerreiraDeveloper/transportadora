const prompt = require("prompt-sync")();

let idCaminhao = 0;
let modelo = "";
let cargaTotal = 0;
let escolhaCaminhao = "";
const caminhoes = [];
let estacionadoPatio = true;
let _idEncomenda ="";

function AdicionarCaminhoes() {
    let sair = false;
    do {
        escolhaCaminhao = prompt("Deseja adicionar um novo caminhão? [s]- Sim   //   [n]- Não: ").toLowerCase();
        switch (escolhaCaminhao) {
            case "s":
                idCaminhao = prompt("Número do ID do caminhão: ");
                modelo = prompt("Modelo do caminhão: ");
                cargaTotal = prompt("Peso total do caminhão: ");
                caminhoes.push({ idCaminhao, modelo, cargaTotal, estacionadoPatio, idMotorista: null, _idEncomenda});
                console.log("Caminhões adicionados:");
                caminhoes.forEach(caminhao => {
                    console.log(`ID do caminhão: ${caminhao.idCaminhao} \n   Modelo do caminhão: ${caminhao.modelo} \n   Peso em Tonelada: ${caminhao.cargaTotal} \n`);
                });
                break;
            case "n":
                sair = true;
                break;
            default:
                console.log("Opção inválida.");
                break;
        }
    } while (!sair);
}

function AdicionarMotorista() {
    let sair = false;
    do {
        const escolhaMotorista = prompt("Deseja adicionar um novo motorista? [s]-Sim  //  [n]- Não: ").toLowerCase();
        switch (escolhaMotorista) {
            case "s":
                const idMotorista = prompt("Número do ID do Motorista: ");
                const nomeMotorista = prompt("Nome do Motorista: ");

                let validacaoIDCaminhao = false;
                let caminhaoSelecionado = null;

                do {
                    console.log("Caminhões no Estacionamento:");
                    caminhoes.forEach(caminhao => console.log(`ID: ${caminhao.idCaminhao}`));

                    const selecaoIdCaminhao = prompt("Informe o ID do caminhão para associar o motorista: ");

                    caminhaoSelecionado = caminhoes.find(caminhao => caminhao.idCaminhao === selecaoIdCaminhao);

                    if (caminhaoSelecionado) {
                        validacaoIDCaminhao = true;
                        console.log(`Caminhão ${caminhaoSelecionado.idCaminhao} selecionado.`);

                        caminhaoSelecionado.idMotorista = idMotorista;
                        caminhaoSelecionado.nomeMotorista = nomeMotorista;
                        console.log(`Motorista ${nomeMotorista} adicionado ao caminhão ${caminhaoSelecionado.idCaminhao}.`);
                    } else {
                        console.log("ID do caminhão inválido. Tente novamente.");
                    }
                } while (!validacaoIDCaminhao);
                break;

            case "n":
                sair = true;
                break;

            default:
                console.log("Opção inválida.");
                break;
        }
    } while (!sair);
}

function RegistroDeEncomendas() {
    let sairRegistro = false;
    entradaIdEncomenda = prompt("Informe o ID da encomenda: "); //id de encomenda
    do {
        let pesoPermitidoNaEntrega = null;
        let validacaoEncomenda = false;
        console.log("Lista de Caminhoes: ");
        caminhoes.forEach(caminhao => console.log(`Caminhao ID: ${caminhao.idCaminhao}  Peso do caminhão: ${caminhao.cargaTotal}  Motorista Registrado: ${caminhao.nomeMotorista}`));

        do {
            const pesoEncomenda = parseFloat(prompt("Informe o Peso da encomenda: ")); // Convertendo para número
            const idCaminhaoParaEncomenda = prompt("Selecione o ID do caminhão: ");

            pesoPermitidoNaEntrega = caminhoes.find(caminhao => caminhao.idCaminhao === idCaminhaoParaEncomenda);

            if (pesoPermitidoNaEntrega) {
                if (pesoPermitidoNaEntrega.cargaTotal >= pesoEncomenda) {
                    validacaoEncomenda = true;
                    console.log(`Encomenda registrada com sucesso! Caminhão ID: ${pesoPermitidoNaEntrega.idCaminhao} Saindo com destino a Entrega.`);
                    pesoPermitidoNaEntrega.estacionadoPatio = false;
                    pesoPermitidoNaEntrega._idEncomenda = entradaIdEncomenda;
                } else {
                    console.log("Peso da encomenda excede o limite do caminhão.");
                }
            } else {
                console.log("Caminhão não encontrado");
            }
        } while (!validacaoEncomenda);

        const continuar = prompt("Deseja registrar outra encomenda? [s]-Sim  //  [n]- Não: ").toLowerCase();
        sairRegistro = continuar !== 's';
    } while (!sairRegistro);
}

function ListarCaminhoes() {
    console.log("Lista de caminhôes da empresa:");
    caminhoes.forEach(caminhao => console.log(`ID caminhão: ${caminhao.idCaminhao} 
                                             \n     Modelo: ${caminhao.modelo}
                                             \nCarga Total: ${caminhao.cargaTotal}`));
}

function ListarCaminhoesEMotoristas() {
    const caminhoesNaEstrada = caminhoes.filter(caminhao => !caminhao.estacionadoPatio);
    caminhoesNaEstrada.forEach(caminhao => {
        console.log(`O caminhão ID: [${caminhao.idCaminhao}], está atribuído ao motorista ID: [${caminhao.idMotorista}]`);
    });
}

function ListarCaminhoesEncomendas() {
    const caminhoesNaEstrada = caminhoes.filter(caminhao => !caminhao.estacionadoPatio);
    caminhoesNaEstrada.forEach(caminhao => {
        console.log(`O caminhão ID: [${caminhao.idCaminhao}], está transportando a encomenda ID: [${caminhao.idEncomenda}]`);
    });
}

let repetirMenu = false;

do {
    console.log(" \nMenu da Transportadora JS");

    console.log("[1] - Adicionar Caminhões.\n" +
        "[2] - Adicionar Motorista.\n" +
        "[3] - Registrar Encomenda e Atribuir a um Caminhão.\n" +
        "[4] - Listar todos os Caminhões.\n" +
        "[5] - Listar todos os Motoristas e Caminhões que estão na Estrada.\n" +
        "[6] - Listar todas as Encomendas e Caminhões que estão na Estrada.\n" +
        "[7] - Sair.\n");
    let entradaMenu = parseInt(prompt("Selecione a Opção:"))

    switch (entradaMenu) {
        case 1:
            AdicionarCaminhoes();
            break;
        case 2:
            AdicionarMotorista();
            break;
        case 3:
            RegistroDeEncomendas();
            break;
        case 4:
            ListarCaminhoes();
            break;
        case 5:
            ListarCaminhoesEMotoristas();
            break;
        case 6:
            ListarCaminhoesEncomendas();
            break;
        case 7:
            repetirMenu = true;
            break;
        default:
            console.log("Opção inválida, tente novamente!");
            break;
    }
} while (!repetirMenu);
