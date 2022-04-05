const prompt = require ('prompt-sync')();
const figlet = require ('figlet');
const colors = require ('colors');
let desejaContinuar;
do{
    //possibilidades
    let npcs = ['feiticeiro necromante','mago', 'druida da lua', 'comerciante', 'caçador de recompensas', 'viajante', 'sacerdotisa', 'elfo da floresta', 'trio de feiticeiros', 'família de halflings', 'anão guerreiro'];
    let lugares = ['floresta densa', 'templo abandonado', 'caverna', 'cabana velha', 'ruína de um castelo', 'clareira', 'vilarejo abandonado', 'acampamento abandonado', 'torre abandonada', 'laboratorio de mago esquecido', 'ruína de uma prisão'];
    let itensExistentes = ['PERGAMINHO DE MAGIA','ESPADA PODEROSA', 'MACHADO MÁGICO', 'ADAGA', 'ARCO DE COMBATE', 'MAÇA', 'MANGUAL', 'LANÇA', 'ESCUDO', 'CAJADO MÁGICO'];
    let bestiario = [
        {nome: 'grupo de goblins', dificuldade: 1, loot: sorteador(itensExistentes)}, 
        {nome: 'grupo de ladrões', dificuldade: 3, loot: sorteador(itensExistentes)}, 
        {nome: 'feiticeiro selvagem', dificuldade: 2, loot: sorteador(itensExistentes)},
        {nome: 'elfo corrompido', dificuldade: 1, loot: sorteador(itensExistentes)},
        {nome: 'mago do caos', dificuldade: 2, loot: sorteador(itensExistentes)},
        {nome: 'aranha gigante', dificuldade: 1, loot: sorteador(itensExistentes)},
        {nome: 'ogro', dificuldade: 2, loot: sorteador(itensExistentes)},
        {nome: 'fantasma', dificuldade: 2, loot: sorteador(itensExistentes)},
        {nome: 'elemental', dificuldade: 3, loot: sorteador(itensExistentes)},
        {nome: 'urso-coruja', dificuldade: 2, loot: sorteador(itensExistentes)}, 
        {nome: 'grupo pequeno de zumbis', dificuldade: 1, loot: sorteador(itensExistentes)}];
    let traidores = [sorteador(npcs), sorteador(npcs), sorteador(npcs), sorteador(npcs)];
    let morto = false;

    //tempo
    const tempo = {
        dia: 1,
        indexTempoAtual: 0,
        horarios: ['MANHÃ', 'TARDE', 'NOITE', 'MADRUGADA'],
        periodoAtual: function(){
        return this.horarios[tempo.indexTempoAtual]
        },
        avancaTempo: function(){
        this.indexTempoAtual ++;
        if (this.indexTempoAtual > 3){
            this.dia ++;
            this.indexTempoAtual = 0;
        }
        },
        amanhecer: function(){
            this.dia ++;
            this.indexTempoAtual = 0;
        }
    }

    //heroi
    const heroi = {
        vida: 4, //max = 4
        poder: 0, // max = 10
        itens: [],
        aliados: [],
        ratos: [],
        dinheiro: 0,
        mostraStatus: function(){
            console.log(`
            Sua vida é ${this.vida}/4;
            Seu poder é ${this.poder}/10
            Itens: ${this.itens}
            Aliados: ${this.aliados}
            Dinheiro: ${this.dinheiro}`.blue.bold)
            console.log();
        },
        mexeVida: function(valor = 1){
            this.vida += valor;
            if (this.vida <= 0){
                morto = true;
                console.log(`Seus pontos de vida foram reduzidos a 0 ou menos. Sua vida reiniciará e você baterá as botas.`)
                this.vida = 4;
            } else if (this.vida > 4){
                this.vida = 4;
            }
        },
        mexePoder: function(valor = 1){
                this.poder += valor;
            if (this.poder < 0){
                this.poder = 0;
            } else if (this.poder > 10){
                this.poder = 10;
            }
        } 
    }
    //funcoes para eventos aleatorios
    function aliado(){
        //gera um encontro com npc aleatorio no terminal
        let npc = sorteador(npcs);
        console.log();
        console.log(`Você encontra um(a) ${npc}. Conversando com ele(a), você
        conta seu objetivo de retomar a cidade e pode decidir
        (s) se ele vai ser seu aliado ou
        (n) se ele não vai ser seu aliado.`);
        let rep = prompt().toLowerCase();
        while (rep != 'n' && rep != 's'){
            rep = prompt("Digite uma resposta válida (s/n) ".red.bold);
        }
        if (rep == 's'){
            heroi.aliados.push(npc);
        }
    }
    function lugar(){
        //gera uma passagem por um lugar() aleatorio e pode encontrar um inimigo() ou um itemExistente aleatorio
        let lugar = sorteador(lugares);
        console.log();
        console.log(`No seu caminho, você se depara com um(a) ${lugar}. Você investiga o local mais a fundo`);
        let aux = Math.floor(Math.random() * 10);
        if (aux % 2 == 0){
            //encontra um baú
            let loot = sorteador(itensExistentes);
            console.log(`e econtra um baú. Você pode decidir se vai abrir o baú(s) ou não(n).`);
            let resposta = prompt().toLowerCase();
            if (resposta == 's'){
                let aux2 = Math.floor(Math.random() * 10);
                if (aux2 > 3){
                    if (heroi.itens.length == 0){
                        console.log(`Oh não, o baú era uma armadilha. Você perde poder`);
                        heroi.mexePoder(-1);
                    } else{
                        console.log(`Oh não, o baú era uma armadilha. Você perde um item.`);
                        heroi.itens.pop();
                    }
                } else {
                    console.log(`Você abre o baú e encontra um(a) ${loot} e leva consigo.`)
                    heroi.itens.push(loot);
                }
            } else if (resposta == 'n'){
                return
            }
        } else {
            inimigo();
        }
    }
    function inimigo(){
        //gera um encontro com um monstro aleatório no terminal
        let monstro = sorteador(bestiario);
        let recompensa = 10 * monstro.dificuldade;
        console.log();
        console.log(`Você encontra um(a) ${monstro.nome} furioso!`);
        combate(monstro, recompensa);
    }
    function sorteador(lista){
        //sorteia um item de uma lista qualquer
        let i = Math.floor(Math.random() * (lista.length))
        return lista[i]
    }
    function sorteiaEvento(){
        //sorteia entre aliado(), lugar(), e inimigo() 
        let i = Math.floor(Math.random() * 3);
        let retorno;
        if (i == 0){ 
            //evento é um monstro aleatorio
            retorno = 'monstro';
            inimigo();    
        } else if (i == 1){
            //evento é um npc aleatório
            retorno = 'npc';
            aliado();
        } else if (i == 2){
            //evento é um lugar aleatório
            retorno = 'lugar';
            lugar();
        }
        console.log();
        return retorno;
    }
    
    //funcoes de acao
    function treinar(requisito = '', bonusPoder = 0){
        //avança o tempo(), pode aparecer aliado() ou inimigo() e há ganho maior ou menor de poder, dependendo do requisito
        console.log();
        tempo.avancaTempo();
        if (heroi.itens.includes(requisito)){
            heroi.mexePoder(bonusPoder);
            console.log(`Você tem ${requisito} em seu inventário. Isso te garante mais ${bonusPoder - 1} de bônus.`);
        } else {
            heroi.mexePoder();
            console.log(`Você aumenta seu poder em 1 com seu treino`);
        }
        //aliado ou inimigo
        console.log("Durante seu treino algo inesperado acontece!");
        let aux = Math.floor(Math.random() * 10) // escolhe um numero de 0 a 10
        if (aux % 2 == 0){
            //vem monstro
            inimigo();
        } else{
        //vem npc
        aliado();
        }
    }
    function viajar(){
        tempo.avancaTempo();
        sorteiaEvento();
    }
    function loja(dia){
        tempo.avancaTempo();
        let preco = dia*10;
        let  itensDisponiveis = [
            sorteador(itensExistentes),
            sorteador(itensExistentes),
            sorteador(itensExistentes) 
        ]
        console.log(`O comerciante tem os seguintes itens disponíveis: `);
        for (let i = 0; i < itensDisponiveis.length; i++){
            console.log(`Digite (${i+1}) para comprar ${itensDisponiveis[i]} || preco: ${preco}`);
        }
        console.log("Digite (n) para não comprar nada e ir embora.");
        console.log();
        console.log(`Lembrando que seus status são:`);
        heroi.mostraStatus();
        let carrinho = prompt();
        while (carrinho != '1' && carrinho != '2' && carrinho != '3' && carrinho != 'n'){
            carrinho = prompt("Digite uma resposta válida: ".red.bold);
        }
        if (carrinho == 'n'){
            return
        } else if ((carrinho == '1' || carrinho == '2' || carrinho == '3') && heroi.dinheiro < preco){
            console.log("O comerciante diz: 'Você não tem dinheiro suficiente para comprar isso! Vá embora da minha loja!'");
            return
        } else {
            carrinho = parseInt(carrinho) - 1;
            heroi.dinheiro -= preco;
            heroi.itens.push(itensDisponiveis[carrinho]);
            console.log(`Você adiquiriu ${itensDisponiveis[carrinho]}.`);
            return
        }
    }
    
    //funcao do combate obg deus pai o melhor do mundi siii aq e luva de predeiro
    function combate(monstro, recompensa){
        // se derrotar, ganha poder, além da recompensa
        console.log(`Você precisa decidir se vai 
        -(enfrentar) tentar enfrentar o monstro
        -(fugir) ou correr dele.
        Lembrando que seus status no momento são:`);
        heroi.mostraStatus();
        let resposta = prompt().toLowerCase();
        while (resposta != 'enfrentar' && resposta != 'fugir'){
            resposta = prompt(`Digite uma resposta válida: `.red.bold);
        }
        if (resposta == 'enfrentar'){
            if (monstro.dificuldade == 3){
                ////precisa pelo menos 3 de poder ou pelo menos 3 itens para enfrentar
                //sem nenhum dos requisitos => toma mais dano e foge
                //com poder, mas sem os itens => passa com loot e recompensa e se machuca
                //com item => passa com loot e recompensa e não se machuca
                if (heroi.poder < 3 && heroi.itens.length < 3){
                    heroi.mexeVida(-2);
                    console.log(`Você é muito fraco para derrotar o(a) ${monstro.nome}. Você se machuca bastante e precisa fugir.`);
                } else if (heroi.poder >= 3 && heroi.itens.length < 3){
                    heroi.itens.push(monstro.loot);
                    heroi.mexeVida(-1);
                    heroi.dinheiro += recompensa;
                    heroi.mexePoder(1);
                    console.log(`Você consegue derrotar o monstro e recebe um(a) ${monstro.loot} e sua recompensa. Todavia, você se machuca.`);
                } else{
                    let itemPerdido1, itemPerdido2, itemPerdido3;
                    //aqui o heroi com certeza tem pelo menos 2 itens e pode ou não ter poder suficiente
                    heroi.itens.push(monstro.loot);
                    heroi.dinheiro += recompensa;
                    heroi.mexePoder(1);
                    itemPerdido1 = heroi.itens.shift();
                    itemPerdido2 = heroi.itens.shift();
                    itemPerdido3 = heroi.itens.shift();
                    console.log(`Você derrota o monstro sem se machucar e recebe um(a) ${monstro.loot} e a recompensa do monstro.
                    Você perde os itens que você usou em combate: ${itemPerdido1}, ${itemPerdido2} e ${itemPerdido3}.`);
                }
            } else if (monstro.dificuldade == 2){
                ////precisa de pelo menos 2 de poder ou pelo menos 2 item
                //sem poder nem item => toma dano, rouba o loot e foge
                //com o poder mas sem item => toma dano, derrota, pega loot
                //com o item => ganha tudo
                if(heroi.poder < 2 && heroi.itens.length < 2){
                    heroi.itens.push(monstro.loot);
                    heroi.mexePoder(1);
                    heroi.mexeVida(-1);
                    console.log(`Você tenta enfrentar o monstro, toma dano e precisa fugir, mas consegue roubar seu(a) ${monstro.loot} e
                    também ganha poder.`);
                } else if(heroi.poder >= 2 && heroi.itens.length < 2){
                    heroi.dinheiro += recompensa;
                    heroi.mexePoder(1);
                    heroi.mexeVida(-1);
                    heroi.itens.push(monstro.loot);
                    console.log(`Você derrota o monstro, mas se machuca. Você também consegue seu(a) ${monstro.loot}
                    e a recompensa.`);
                } else {
                    let itemPerdido1;
                    heroi.dinheiro += recompensa;
                    heroi.mexePoder(1);
                    heroi.itens.push(monstro.loot);
                    itemPerdido1 = heroi.itens.shift();
                    itemPerdido2 = heroi.itens.shift();
                    console.log(`Você derrota o monstro e consegue poder, a recompensa e seu(a) ${monstro.loot}. Você
                    perde os itens que usou em combate: ${itemPerdido1} e ${itemPerdido2}.`);
                }
            } else {
                //monstros de nivel 1 são faceis de derrotar, basta ter qualquer coisa ou qualquer poder
                heroi.mexePoder(1);
                if (heroi.poder <= 0 && heroi.itens.length == 0){
                    heroi.itens.push(monstro.loot);
                    console.log(`Você fraqueja em derrotar um monstro bem fraco! Você rouba o(a) ${monstro.loot} dele e foge.
                    Você ganha poder, pois a situação embaraçosa te dá experiência de combate.`);
                } else{
                    heroi.itens.push(monstro.loot);
                    heroi.dinheiro += recompensa;
                    console.log(`Você consegue derrotar o monstro e leva seu(a) ${monstro.loot} e a recompensa.`);
                }
            }
        } else if (resposta == 'fugir') {
            console.log(`Você decide fugir do monstro, então não recebe nem perde nada.`);
            return
        }
    }
    
    //funcao pra verificar o falecimento
    function verificaFalecimento(){
        if (morto){
            // renascer nesse mesmo dia
            console.log(`Você faleceu ;-; Agora, você renascerá nesse mesmo dia, para tentar novamente.
            Você perde seu poder e seu dinheiro.`);
            console.log();
            console.log();
            heroi.mexePoder(-10);
            heroi.dinheiro = 0;
            tempo.indexTempoAtual = 0;
            morto = false;
        }
        return
    }
    
    //funcao do fim do dia
    function fimDoDia(arg = 0){
        heroi.mexeVida(arg);
        heroi.mostraStatus();
        tempo.amanhecer();
        prompt("Pressione ENTER para continuar".red.bold);
        console.clear();
    }
        
    //intro
    console.clear();
    console.log(figlet.textSync(`NEVER FORGET NEVERWINTER`, {
        font: 'banner3-D',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 180,
        whitespaceBreak: true
    }).red.italic);
    console.log(`Você é o último cavaleiro defensor da cidade de Neverwinter.
    Há algumas semanas, houve um insurreição na cidade e o resultado dela foi a tomada do poder
    por 3 terroristas procurados por toda a Costa da Espada, bem como o desaparecimento
    de todos os seus companheiros cavaleiros defensores.\n
    Você, sortudo, escapou da cidade e agora precisa encontrar alianças e se fortalecer para retomar a cidade.\n`);
    console.log(`No jogo, você buscará se fortalecer (TREINAR), explorar (VIAJAR), ganhar itens e aliados para retomar a cidade. Você tem uma semana para isso.`);
    console.log(`No caminho, você precisa ter cuidado. Alguns não serão realmente seus aliados, você pode não conseguir derrotar alguns monstros
    e alguns baús podem te prejudicar.\n`)
    prompt("Pressione ENTER para continuar.".red.bold);
    console.clear();

    //dia1
    console.log(`Dia 1`);
    console.log(`Agora é ${tempo.periodoAtual()}.
    Você desperta numa carroça. Você está sendo levado por um coveiro, pois
    ele acha que você estava morto. Você
    (1) - pula da carroça ou 
    (2) - deixa o coveiro te levar até o final do percurso?`.yellow);
    let rep = prompt().toLowerCase();
    console.clear();
    while (rep != '1' && rep != '2'){
        rep = prompt("Digite uma resposta válida (1/2) ".red.bold);
    }
    if (rep == '1'){
        console.log(`Você vai mata adentro por umas horas até chegar em uma estrada e começa a seguir ela.
        Os arbustos arranharam sua pele e você se machucou um pouco.`);
        heroi.mexeVida(-1);
        tempo.avancaTempo();
    } else if (rep == '2'){
        tempo.avancaTempo();
        console.log(`Você passa um tempo na carroça e agora é de ${tempo.periodoAtual()}.
        No caminho, você conversa com o coveiro e conta a ele seu objetivo de retomar
        a cidade. Ele resolve te apoiar nessa empreitada. Ele também o revela que ele
        é, na verdade, um feiticeiro necromante. Você conseguiu um aliado!
        Ele também te dá um PERGAMINHO DE MAGIA, que te permite usar uma magia forte em combate.
        Você segue sua viagem depois disso.`);
        heroi.aliados.push(npcs[0]);
        heroi.itens.push(itensExistentes[0]);
    }
    console.log();
    tempo.avancaTempo(); //passa noite e chega a madrugada
    tempo.avancaTempo();
    console.log(`Na estrada, vc perde um tempo
    caçando, arrumando uns materiais para acampar e quando se dá conta já é ${tempo.periodoAtual()}.
    Percebendo isso, você resolve descansar até amanhã.`.yellow);
    fimDoDia();

    //loop dos dias 2 a 6
    cadaDia: while (tempo.dia != 7){
        console.log(`Dia ${tempo.dia}`);
        //INtros de cada dia
        if (tempo.dia == 2){
            console.log("Nesse dia, você pode apenas viajar.".yellow);
            console.log();
        } else if (tempo.dia == 3){
            console.log(`Você acorda na pequenina cidade. Nesse dia, você pode escolher entre
            (treinar) para tentar ganhar poder,
            (viajar) para explorar os arredores da cidade ou
            (comprar) para visitar alguma loja.`.yellow);
            console.log();
        } else if (tempo.dia == 4){
            console.log(`Nesse dia, você acorda e já cai na estrada. Você quer ir até
            Waterdeep, uma cidade grande da costa da espada. A viagem é longa, então hoje você só poderá viajar.`.yellow);
            console.log();
        } else if (tempo.dia == 5){
            console.log(`Você amanhece na grande cidade de Waterdeep. Por ser uma cidade grande, você hoje
            tem as opções de
            (viajar) - explorar o condado e a floresta perto da cidade.
            (treinar) - para adquirir poder.
            (comprar) - visitar o comércio da cidade para adquirir itens.`.yellow);
            console.log();
        } else if (tempo.dia == 6){
            console.log(`Nesse dia, você acorda e precisa se apressar para voltar a
            Neverwinter a tempo de conseguir enfrentar os 3 procurados. A viagem é longa e, por isso, você
            vai precisar passar o dia todo viajando.`.yellow);
            console.log();
        }

        //estrutura de um dia passando
        while (tempo.periodoAtual() != 'MADRUGADA'){
            console.log(`Agora é ${tempo.periodoAtual()} do dia ${tempo.dia}.`.blue.bold);
            console.log();
            if (tempo.dia == 2 || tempo.dia == 4 || tempo.dia == 6){
                //nesses dias, o personagem só viaja
                viajar();
                prompt("Pressione ENTER para continuar".red.bold);
                console.clear();
                verificaFalecimento();
            } else if (tempo.dia == 3 || tempo.dia == 5){
                //nesses dias, o personagem pode viajar, treinar ou comprar
                let rep = prompt("Digite qual ação você fará agora: (viajar, treinar ou comprar) ").toLowerCase();
                while (rep != 'treinar' && rep != 'viajar' && rep != 'comprar'){
                    rep = prompt("Digite uma ação válida(viajar/treinar/comprar): ".red.bold).toLowerCase();
                }
                console.log();
                if (rep == 'treinar'){
                    treinar();
                    prompt("Pressione ENTER para continuar.".red.bold);
                    console.clear();
                    verificaFalecimento();
                } else if (rep == 'viajar'){
                    viajar();
                    prompt('Pressione ENTER para continuar'.red.bold);
                    console.clear();
                    verificaFalecimento();
                } else if (rep == 'comprar'){
                    loja(tempo.dia);
                    prompt("Pressione ENTER para continuar".red.bold);
                    console.clear();
                }
            }
        }

        //OUTros de cada dia
        console.log(`No início da ${tempo.periodoAtual()} do dia ${tempo.dia},`.blue.bold);
        if (tempo.dia == 2){
            console.log(`você encontra uma pequena cidadezinha e resolve dormir nela até de manhã.`.yellow);
        } else if (tempo.dia == 3){
            console.log(`você está de volta à pequenina cidade e então dorme até amanhecer. Você recupera 1 ponto de vida no descanso.`.yellow);
            fimDoDia(1);
            continue cadaDia
        } else if ( tempo.dia == 4){
            console.log(`você chega nos portões de Waterdeep. Você procura um lugar qualquer para dormir e depois descansa até amanhecer.`.yellow);
        } else if (tempo.dia == 5){
            console.log(`você volta à cidade para dormir. É de bom proveito que você fique na cidade mais um dia, 
            para se fortalecer mais. Você assim faz. Você recupera 1 ponto de vida no descanso.`.yellow);
            fimDoDia(1);
            continue cadaDia
        } else if (tempo.dia == 6){
            console.log(`você chega aos portões de Neverwinter. Você precisa descansar, pois amanhã será a batalha final.
            Todos os aliados feitos no caminho (se há algum) já estão em Neverwinter esperando o ataque.
            Você recupera 2 pontos de vida.`.yellow);
            fimDoDia(2);
            continue cadaDia
        }

        //todo dia fazer isso no final
        fimDoDia();
    }

    //dia 7 batalha final
    console.clear();
    console.log(`Dia 7\n
    Hoje é o grande dia! Hoje a batalha final ocorre. Após seu descanso, você vai até a praça, onde você combinou de encontrar com seus aliados.`.yellow);
    let temTraidor;
    for (let i = 0; i < heroi.aliados.length; i++){
        if (traidores.includes(heroi.aliados[i])){
            temTraidor = true;
            heroi.ratos.push(heroi.aliados[i]);
        }
    }
    if (temTraidor){
        console.log(`Chegando na praça, alguém ou alguns dos que vc recrutou aparecem ao lado dos 3 procurados: `);
        for(rato of heroi.ratos){
            console.log(`-`, rato);
            heroi.itens.shift();
            heroi.mexePoder(-1);
        }
        console.log(`Eles logo partem pra cima de você e lhe roubam todo seu dinheiro e tentam te roubar alguns itens.
        Eles também te pegam desprevinido e você perde poder.`);
        console.log(`Traíras: ${heroi.ratos}`.red.bold);
    }
    console.log(`Esses são seus status agora:`);
    heroi.mostraStatus();
    console.log(`Após o ocorrido, o combate final de inicia.`);
    prompt('Pressione ENTER para continuar.'.red.bold);
    console.clear();
    ////o combate final
    //2 aliados  req 1
    //2 itens    req 2
    //poder > 7  req 3
    let req1 = heroi.aliados.length - heroi.ratos.length > 1;
    let req2 = heroi.poder > 7;
    let req3 = heroi.itens.length > 1;
    // o personagem precisa atender pelo menos 2 requisitos para conseguir um final bom
    if (req1 && req2 && req3 ){
        console.log(`Parabéns! Ao longo do caminho, você conseguiu se fortalecer o suficiente
        Você tem força sobrando pra batalha:
        -Vc tem pelo menos 2 aliados verdadeiros: ${req1}
        -Vc tem pelo menos 2 itens no inventário: ${req2}
        -Vc tem pelo menos 8 de poder: ${req3}\n
        Com isso, você derrota os três procurados, manda-os para a prisão perpétua pelos seus crimes e reconquista a cidade de Neverwinter, restaurando a paz!!!`);
    } else if ((!req1 && req2 && req3) ||
    (req1 && !req2 && req3) ||
    (req1 && req2 && !req3)){
        console.log(`Parabéns! Ao longo do caminho, você conseguiu se fortalecer o suficiente
        Você tem força suficiente pra batalha:
        -Vc tem pelo menos 2 aliados verdadeiros: ${req1}
        -Vc tem pelo menos 2 itens no inventário: ${req2}
        -Vc tem pelo menos 8 de poder: ${req3}\n
        Com isso, você derrota os três procurados e reconquista a cidade de Neverwinter!!!
        Contudo, nem tudo são flores. Você dispersa os procurados e eles fogem, jurando um dia se vingar.`);
    } else{
        console.log(`Azedou o caldo! Ao longo do caminho, você não conseguiu se fortalecer o suficiente
        Você não tem força suficiente pra batalha:
        -Vc tem pelo menos 2 aliados verdadeiros: ${req1}
        -Vc tem pelo menos 2 itens no inventário: ${req2}
        -Vc tem pelo menos 8 de poder: ${req3}\n
        Com isso, você é derrotado pelos três procurados, é encarcerado e a cidade de Neverwinter viverá tempos difíceis!!!`);
    }

    console.log();
    console.log();
    console.log(figlet.textSync(`FIM DE JOGO`, {
        font: 'banner3-D',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 180,
        whitespaceBreak: true
    }).red.italic);
    desejaContinuar = prompt("Digite (s) se deseja continuar ou (n) se deseja encerrar: ".red.bold).toLowerCase();
    while(desejaContinuar !='s' && desejaContinuar != 'n'){
        desejaContinuar = prompt("digite uma resposta válida: ".red.bold).toLowerCase();
    }
}while (desejaContinuar == 's')