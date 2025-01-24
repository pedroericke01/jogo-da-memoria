/* função para formatação correta da exibição do temporizador para os usuários: */
function formatar_dados(dado){
    if(dado < 10){
        return `0${dado}`;
    }else{
        return dado;
    }
}

/* função de controle do temporizador no sistema: */
function iniciar_temporizador(){
    /* atribuindo ao temporizador a função callback SetInterval, que me permite 
    criar um loop infinito onde em determinado numero de milesegundos executar alguma
    operação: */
    temporizador = setInterval(()=>{
        /* acrescentando 10 novos milesegundos válidos: */
        quant_milesegundos += 10;

        /* 1 segundo equivale a 1000 milesegudos: */
        if(quant_milesegundos == 1000){
            /* acrescentando 1 novo segundo válido: */
            quant_segundos += 1;

            /* zerando a quantidade de milesegundos antiga, visando iniciar outra 
            nova: */
            quant_milesegundos = 0;
        }

        /* 1 minuto equivale a 60 segundos: */
        if(quant_segundos == 60){
            /* acrescentando 1 novo minuto válido: */
            quant_minutos += 1;

            /* zerando a quantidade de segundos: */
            quant_segundos = 0;
        }

        /* 1 hora equivale a 60 minutos */
        if(quant_minutos == 60){
            /* acrescentando 1 hora válida: */
            quant_horas += 1;

            /* zerando a quantidade de minutos antiga: */
            quant_minutos = 0;
        }

        /* exibir os dados para o usuário: */
        horas.innerHTML = `${formatar_dados(quant_horas)}`;
        minutos.innerHTML = `${formatar_dados(quant_minutos)}`;
        segundos.innerHTML = `${formatar_dados(quant_segundos)}`;

    }, 10);
}

function parar_temporizador(){
    /* zerar os dados do temporizador no ultimo jogo */
    quant_milesegundos = 0;
    quant_segundos = 0;
    quant_minutos = 0;
    quant_horas = 0;

    /* parando a execução do temporizador: */
    clearInterval(temporizador);
}

function cartas_iguais(carta_1, carta_2){
    /* pegando atributos pelo nome: */
    var carta_1 = carta_1.getAttribute('nome-tribo');
    var carta_2 = carta_2.getAttribute('nome-tribo');
    
    /* se o usuário acertar, vamos manter a carta exibida, caso contrário, vamos
    escondê-la novamente removendo a classe 'virar-carta' */
    if(carta_1 == carta_2){
        /* adicionar o par das cartas iguais encontradas na estrutura dos dados
        auxiliar: */
        cartas_encontradas.push(carta_1);

        /*  */
        if(cartas_encontradas.length == 12){
            finalizar_jogo();
        }else{
            /* limpando a variável global, isso me permitirá clicar em outras cartas: */
            carta1 = "";
            carta2= "";
        }
        }else{
        /* caso o usuário erre as cartas, vamos esperar 500 milesegundos para esconder
        as cartas novamente */
        setTimeout(()=>{
            carta1.classList.remove('virar-carta');
            carta2.classList.remove('virar-carta');

            /* limpando as variáveis das cartas escolhidas: */
            carta1 = "";
            carta2 = "";

        }, 700);
    }
}

/* será necessário trabalhar com DOM para manipular elementos no front end com o 
javascript: 
o target, representa o carta-front, por padrão*/
function virar_carta(target){

    /* acessando o elemento pai, nessa caso é a div carta: */
    /* console.log(target.target.parentNode); */

    /* verificando se o elemento pai, ja possui a classe 'virar-carta' */
    if(target.target.parentNode.className.includes('virar-carta')){
        return 0;
    }else{
        
        if(carta1 == ""){
            /* atribuindo ao elemento pai, a classe 'virar-carta' pelo DOM, a qual vai fazer o giro
            de 180° no momento que o usuário clicar nela: */
            target.target.parentNode.classList.add('virar-carta');
            
            /* passando para a variável carta1 os dados dessa 1 carta virada: */
            carta1 = target.target.parentNode;

        }else if(carta2 == ""){
            /* virando a 2 carta */
            target.target.parentNode.classList.add('virar-carta');

            /* passando para a variável carta2 os dados dessa 2 carta virada */
            carta2 = target.target.parentNode;
            
            /* chamada a função de validação das cartas: */
            cartas_iguais(carta1, carta2);
        }
    }
}

/* função que cria a carta: */
function criar_carta(tribo, callback){
    if(callback == true){
        /* criando tags dinâmicamente: */
        const carta = window.document.createElement("div");
        const carta_front = window.document.createElement("div")
        const carta_back = window.document.createElement("div");

        /* atribuindo uma classe para a variável carta: */
        carta.className = "carta";
        carta_front.className = "carta-front";
        carta_back.className = "carta-back";

        /* criando o atributo que será o nome da tribo que a carta pertence, visando
        identificar as cartas corretamente: */
        carta.setAttribute('nome-tribo', tribo);

        carta_back.style.backgroundImage = `url(../images/${tribo}.png)`

        /* criando a estrutura da carta: */
        carta.appendChild(carta_front);
        carta.appendChild(carta_back);

        /* determinando que todas as cartas vão ter um escutador de cliques para
        ativar a função callback de virar a carta: */
        carta.addEventListener("click", virar_carta);

        return carta;
    }else{
        return false;
    }
}

/* função que me garante que existam até 2 repetições de 1 carta específica na
estrutura dos dados: */
function buscar_carta (estrutura, carta){
    /* variável acumulativa */
    var quant_repeticao = 0;

    /* loop que percorre toda a extensão da estrutura dos dados: */
    for(let cont=0; cont < estrutura.length; cont+=1){
        /* verificando se a carta passada como parâmetro da função, existe ou não dentro
        da minha estrutura: */
        if(estrutura[cont] == carta){
            quant_repeticao += 1;
        }
    }

    /* validando e controlando que so pode existir ate 2 repetições de uma mesma 
    carta no sistema */
    if(quant_repeticao >= 2){
        return false;
    }else{
        return true;
    }
}

/* função para validação do nome: */
function nome_valido(nome){
    const lista_base = [0,1,2,3,4,5,6,7,8,9,10];

    /* variável acumulativa que caso existam dados numéricos no nome, essa variável
    vai acumular 1 ponto: */
    var quant_inválido = 0;

    /* loop que percorre toda a extensão do nome: */
    for(let cont=0;cont<nome.length;cont+=1){
        /* buscando valores numéricos no nome */
        if(lista_base.indexOf(Number(nome[cont])) != -1){
            quant_inválido += 1;
        }
    }
    if(quant_inválido > 0){
        return false;
    }else{
        return true;
    }

}

/* função para iniciar o jogo: */
function iniciar_jogo(){

    /* chamada para iniciar o temporizador do game: */
    iniciar_temporizador();

    for(let cont=0; cont < tribos.length; cont +=1){
        
        /* módulo math.random() que ecolhe um numero aleatório, nesse caso
        será escolhido 24 numeros aleatórios*/
        var escolha = parseInt(Math.random() * tribos.length);

        var nova_carta = criar_carta(tribos[escolha], buscar_carta(cartas_escolhidas, tribos[escolha]));
    
        if(nova_carta != false){
            /* adicionando o nome da carta na lista auxiliar visando garantir um 
            controle para seguir a regra do negócio */
            cartas_escolhidas.push(tribos[escolha]);
            /* exibindo minha carta no front end: */
            conteiner_cartas.appendChild(nova_carta);
        }else{
            /* vamos realizar outra escolha: */
            cont -= 1;
        }
    }

}

function finalizar_jogo(){

    /* criando a mensagem de sucesso dinÂmicamente: */
    mensagem_final.innerText = `Parabens, Seu tempo record foi ${formatar_dados(quant_horas)}:${formatar_dados(quant_minutos)}:${formatar_dados(quant_segundos)}`;
    
    /* vamos parar o temporizador */
    parar_temporizador();

    /* ocultando o contêner das cartas: */
    conteiner_cartas.style.display = "none";

    /* vamos exibir o dialogo de parabens com a mensagem de finalização
    para o usuário: */
    dialog_final.style.display = "flex";

}
/* essa função vai simplesmente fazer um reload no nosso sistema: */
function reiniciar_jogo(){
    /* fazer o reload com javascript: */
    window.location.reload();
}

/* principal base de dados que vai me permitir percorrer e gerar todas as imagens
dinâmicamente no front end para usuários: */
const tribos = [
   "asser",
   "benjamim",
   "efraim",
   "gade",
   "issacar",
   "juda",
   "levi",
   "manasses",
   "naftali",
   "ruben",
   "simeao",
   "zebulom",
    "asser",
   "benjamim",
   "efraim",
   "gade",
   "issacar",
   "juda",
   "levi",
   "manasses",
   "naftali",
   "ruben",
   "simeao",
   "zebulom"
];

/* estrutura de dados auxiliar, onde o sistema vai automaticamente controlar sua 
escolha das 2 cartas, sem haver uma 3 repetição:*/
const cartas_escolhidas = [];

/* estrutura de dados auxiliar, onde no momento que o usuário encontrar 1 par igual, 
o nome da carta será adicionado nessa estrutura: */
var cartas_encontradas = [];

/* garantindo que o usuário escolha apenas 2 cartas por vez: */
var carta1 = "";
var carta2 = "";

/* variavel global que me permitira controlar o correto funcionamento do temporizador: */
var quant_milesegundos = 0;
var quant_segundos = 0;
var quant_minutos = 0;
var quant_horas = 0;
var temporizador = 0;

/* ligando as variáveis interativas do temporizador ao javascript: */
var horas = window.document.getElementById("horas");
var minutos = window.document.getElementById("minutos");
var segundos = window.document.getElementById("segundos");

/* ligando o conteiner onde vamos estruturar as cartas corretamente com flexbox: */
const conteiner_cartas = window.document.querySelector("main > div.conteiner");

/* ligando as principais variáveis para realizar a correta saudação para os jogadores: */
const cabecalho = window.document.querySelector("body > header");
var nome_jogador = window.document.getElementById('nome-jogador');

/* atualização de amanhã */
var mensagem_final = window.document.getElementById("mensagem_final");

/* primeiros elementos que vão aparecer aos players quando eles entrarem
o formulário: */
const dialog_inicio = window.document.querySelector("body > dialog#comeco");
const dialog_final = window.document.querySelector("body > dialog#final");
const formulario = window.document.querySelector("body > dialog > form");
const txt_nome = window.document.getElementById('nome');

const jogar_novamente = window.document.querySelector("dialog#final > input");

/* escondendo o cabeçalho:*/
cabecalho.style.display = "none";

// exibindo a tag dialog */
dialog_inicio.style.display = "block";

/* envio de dados pelo formulário: */
formulario.addEventListener("submit", (event)=>{
    
    event.preventDefault();

    /* captar o dado da variável nome */
    const nome = String(txt_nome.value).trim().toLowerCase();
    
    /* validando o nome: */
    const resultado_nome = nome_valido(nome);
    
    if(resultado_nome == false){
        window.alert('[erro!]Nome inválido, tente novamente!');
    }else{
        /* salvando o nome no localStorage */
        localStorage.setItem("player", nome);

        /* ocultando a tag dialog: */
        dialog_inicio.style.display = "none";

        /* exibindo o header com a mensagem de saudação */
        nome_jogador.innerHTML = `${nome}`;
        
        /* exibindo o cabeçalho: */
        cabecalho.style.display = "flex";

        /* limpando o campo de input nome */
        txt_nome.value = "";

        iniciar_jogo();
    }    
});

/* adicionando um ouvidor de eventos de clique no botão de jogar novamente: */
jogar_novamente.addEventListener("click", reiniciar_jogo);
