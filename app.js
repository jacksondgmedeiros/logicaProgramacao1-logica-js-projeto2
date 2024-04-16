
// !-- inicio 
//  define variável para pegar a tag e inserir um texto
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
// --! fim 
let listaDeNumerosSorteados = [];
let numeroLimite = 5;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){

    // selecionar a tag
    let campo = document.querySelector(tag);

    // escrever na tag
    campo.innerHTML = texto;

    // habilita o responsive voice lá do html para ler o que está escrito
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

// cria uma função que será chamada no html, dentro da tag button com a class container__botao
function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');

        // operador ternário 
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
        exibirTextoNaTela('p', mensagemTentativas);

        // remover o atributo do id 
        document.getElementById("reiniciar").removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'o número secreto é menor');
        } else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }

}

function gerarNumeroAleatorio() {

    // gerar um número inteiro
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        console.log(listaDeNumerosSorteados);
        // para adicionar no final um item no array, para remover, usa pop
        listaDeNumerosSorteados.push(numeroEscolhido);
        
        return numeroEscolhido;
    }
    
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();

    // adicionar um atributo no id do html
    document.getElementById("reiniciar").setAttribute('disabled', true);
}