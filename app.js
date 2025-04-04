// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do numero secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

function exibirNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  // responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});      Não tem mais permissão de uso kkkkkkkkk
  campo.innerHTML = texto;
  if ('speechSynthesis' in window) {
      let utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR'; 
      utterance.rate = 1.2; 
      window.speechSynthesis.speak(utterance); 
  } else {
      console.log("Web Speech API não suportada neste navegador.");
  }
} 

function exibirMensagemInicial() {
  exibirNaTela('h1', 'Jogo do numero secreto');
  exibirNaTela('p', 'Escolha um numero entre 1 e 10');
}
exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector('input').value; // Uma pessoa coloca o valor (.value)
  if (chute == numeroSecreto) {
    let palavraTentativa = tentativa > 1 ? 'Tentativas' : 'Tentativa';
    let mensagemTentativas = `Voce descobriu a mensagem secreta com ${tentativa} ${palavraTentativa}`;
    exibirNaTela('h1', 'Acertou!');
    exibirNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else if (chute > numeroSecreto) {
    exibirNaTela('p', 'O numero secreto é menor');
  } else {
    exibirNaTela('p', 'O numero secreto é maior');
  } tentativa++;
  limparCampo();
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativa = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}
