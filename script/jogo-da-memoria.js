function cartas_iguais(carta_1, carta_2){
    /* pegando atributos pelo nome: */
    var carta_1 = carta_1.getAttribute('nome-tribo');
    var carta_2 = carta_2.getAttribute('nome-tribo');
    
    /* se o usuário acertar, vamos manter a carta exibida, caso contrário, vamos
    escondê-la novamente removendo a classe 'virar-carta' */
    if(carta_1 == carta_2){
        carta1 = "";
        carta2= "";
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

/* estrutura de dados auxiliar */
const cartas_escolhidas = [];

/* garantindo que o usuário escolha apenas 2 cartas por vez: */
var carta1 = "";
var carta2 = "";

/* ligando o conteiner onde vamos estruturar as cartas corretamente com flexbox: */
const conteiner_cartas = window.document.querySelector("main > div.conteiner");

/* ligando as principais variáveis para realizar a correta saudação para os jogadores: */
const cabecalho = window.document.querySelector("body > header");
var saudacoes = window.document.getElementById('saudacoes');

/* primeiros elementos que vão aparecer aos players quando eles entrarem: */
const dialog = window.document.querySelector("body > dialog");
const formulario = window.document.querySelector("body > dialog > form");
const txt_nome = window.document.getElementById('nome')

/* escondendo o cabeçalho:*/
cabecalho.style.display = "none";

// exibindo a tag dialog */
dialog.style.display = "block";


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
        dialog.style.display = "none";

        /* exibindo o header com a mensagem de saudação */
        saudacoes.innerHTML = `Aproveite o Jogo ${nome}`;
        
        /* exibindo o cabeçalho: */
        cabecalho.style.display = "block";

        /* limpando o campo de input nome */
        txt_nome.value = "";

        iniciar_jogo();
    }    
});
