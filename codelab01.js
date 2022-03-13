/* -------------GUERRA ESTELAR-----------------
você é um ser da raça Plink, uma raça alienígena de pele rosa. Você trabalha no setor de inteligência do governo e suas atividades nessa função são:
decifrar mensagens interceptadas, investigar possíveis espiôes, propor estratégias de ação e reportar tudo ao seu superior. O planeta dos Plink está em guerra com
o planeta dos Tuk, uma raça de seres grandes e aparência similar a de uma toupeira.
Durante um dia no trabalho, um chefe te pede para você reportar o que descobriu essa semana. Você lembra de algumas mensagens que ainda não foram decifradas, mas acha que elas não devem ser
importantes, pois elas foram interceptadas de uma nave civil Tuk.

P1) Você reporta essas mensagens ao superior?
P2) Você assiste o noticiário?
P3) Você vai ao trabalho?
P4) Você enfrenta o oponente?
P5) Você volta para sua casa?

*/

const prompt = require("prompt-sync")();
console.clear();
let conta_sims = 0;

//intro
console.log(`-------------GUERRA ESTELAR----------------- \nVocê é um ser da raça Plink, uma raça alienígena de pele rosa.\nVocê trabalha no setor de inteligência do governo e suas atividades nessa função são: decifrar mensagens interceptadas, investigar possíveis espiôes, propor estratégias de ação e reportar tudo ao seu superior.\nO planeta dos Plink está em guerra com o planeta dos Tuk, uma raça de seres grandes e aparência similar a de uma toupeira.`);
console.log();
console.log(`Durante um dia no trabalho, um chefe te pede para você reportar o que descobriu essa semana.\nVocê lembra de algumas mensagens que ainda não foram decifradas, mas acha que elas não devem ser importantes, pois elas foram interceptadas de uma nave civil Tuk.`);
console.log();
console.log();

//primeira pergunta
const rep1 = prompt("Você reporta a mensagem ao seu chefe?(sim/nao)   ").toLowerCase();
if (rep1 == "sim"){
    conta_sims ++;
}
console.log();
console.log();

//segunda pergunta
console.log("Na manhã seguinte, você está tomando seu café da manhâ em sua casa.");
console.log();
const rep2 = prompt("Você liga a televisão, para ver o noticiário?(sim/nao)   ").toLowerCase();
if (rep2 == "sim"){
    conta_sims++;
}
console.clear();

//terceira pergunta
console.log("Você sai um pouco atrasado para o trabalho e perde o ônibus. Por sorte, um amigo passa e te oferece carona.");
console.log();
const rep3 = prompt("Você aceita a carona e vai ao trabalho, ao invés de voltar pra casa?(sim/nao)   ").toLowerCase();
if (rep3 == "sim"){
    conta_sims ++;
}
console.log();
console.log();

//quarta pergunta
console.log("Dois dias depois, enquanto você está no trabalho, sua cidade é invadida pelos Tuks. O prédio onde vc trabalha está sendo atacado.");
console.log();
const rep4 = prompt("Um tuk entra e começa a bater nas pessoas. Você enfrenta o Tuk?(sim/nao)   ").toLowerCase();
if (rep4 == "sim"){
    conta_sims ++;
}
console.clear();

// quinta pergunta
console.log("Alguns minutos mais tarde, você recebe uma ligação. É um Tuk que diz que sequestrou sua família e está mantendo eles como reféns em sua casa.");
console.log();
const rep5 = prompt("Você volta à sua casa, para tentar impedir o Tuk?(sim/nao)   ").toLowerCase();
if (rep5 == "sim"){
    conta_sims ++;
}
console.clear();

//finais
console.clear();

if (conta_sims == 5){
    console.log(`Você é um herói! Quando você reportou a mensagem ao seu superior, a Inteligência descobriu que a Nave civil Tuk levava armamentos secretamente, o que é um perigo.\n
    Essas informações ajudaram as autoridades a mitigar os impactos do ataque Tuk.\n
    Quando você assiste o noticiário, você vê a notícia de que a guerra possivelmente chegaria à sua cidade e você avisa sua família para tomarem cuidado.\n
    Quando você decidiu ir ao trabalho com a carona, todos te parabenizaram e você foi promovido\n
    Quando você enfrentou o Tuk, sua força de vontade te deu uma força inexplicável e você o neutralizou com seu poder\n
    Por fim, quando você decidiu voltar para sua casa, você não teve dificuldades para salvar sua família, graças à sua nova força e graças ao cuidado e calma que seus familiares tiveram, pois você os avisou sobre a guerra poder chegar na cidade.`);
}
else if(conta_sims == 4){
    console.log(`Você é muito esforçado e merece respeito!`);
    console.log();
    //descobrir qual foi a pergunta que faltou o sim

    if (rep1 == "nao"){
        console.log(`Seu erro foi não informar os superiores sobre a mensagem. Acontece que lá haviam informações que poderiam mitigar os impactos da guerra.\n
        Quando você assiste o noticiário, você vê a notícia de que a guerra possivelmente chegaria à sua cidade e você avisa sua família para tomarem cuidado.\n
        Quando você decidiu ir ao trabalho com a carona, você tem um dia normal, sem nenhuma bronca do chefe.\n
        Quando você enfrentou o Tuk, sua força de vontade te deu uma força inexplicável e você o neutralizou com seu poder\n
        Por fim, quando você decidiu voltar para sua casa, você não teve dificuldades para salvar sua família, graças à sua nova força e graças ao cuidado e calma que seus familiares tiveram, pois você os avisou sobre a guerra poder chegar na cidade.`);
    }
    else if (rep2 == "nao"){
        console.log(`Seu erro foi não se informar sobre a chegada da guerra na sua cidade, o que vai causar um quadro de ansiedade em você e em sua família pr alguns meses.\n
        Quando você reportou a mensagem ao seu superior, a Inteligência descobriu que a Nave civil Tuk levava armamentos secretamente, o que é um perigo.\n
        Essas informações ajudaram as autoridades a mitigar os impactos do ataque Tuk.\n
        Quando você decidiu ir ao trabalho com a carona, todos te parabenizaram e você foi promovido\n
        Quando você enfrentou o Tuk, sua força de vontade te deu uma força inexplicável e você o neutralizou com seu poder\n
        Por fim, quando você decidiu voltar para sua casa, você não teve dificuldades para salvar sua família, graças à sua nova força.`);
    }
    else if (rep3 == "nao"){
        console.log(`Seu erro foi não ir ao trabalho. Seu chefe te intimou pela falta e seus colegas não te reconhecem pelo seu feito.\n
        Quando você reportou a mensagem ao seu superior, a Inteligência descobriu que a Nave civil Tuk levava armamentos secretamente, o que é um perigo.\n
        Essas informações ajudaram as autoridades a mitigar os impactos do ataque Tuk.\n
        Quando você assiste o noticiário, você vê a notícia de que a guerra possivelmente chegaria à sua cidade e você avisa sua família para tomarem cuidado.\n
        Quando você enfrentou o Tuk, sua força de vontade te deu uma força inexplicável e você o neutralizou com seu poder\n
        Por fim, quando você decidiu voltar para sua casa, você não teve dificuldades para salvar sua família, graças à sua nova força e graças ao cuidado e calma que seus familiares tiveram, pois você os avisou sobre a guerra poder chegar na cidade.`);
    }
    else if (rep4 == "nao"){
        console.log(`Seu erro foi não enfrentar o perigo e o medo. Você não ganha nenhuma força física e nem experiência de combate.\n
        Quando você reportou a mensagem ao seu superior, a Inteligência descobriu que a Nave civil Tuk levava armamentos secretamente, o que é um perigo.\n
        Essas informações ajudaram as autoridades a mitigar os impactos do ataque Tuk.\n
        Quando você assiste o noticiário, você vê a notícia de que a guerra possivelmente chegaria à sua cidade e você avisa sua família para tomarem cuidado.\n
        Quando você decidiu ir ao trabalho com a carona, todos te parabenizaram e você foi promovido\n
        Por fim, quando você decidiu voltar para sua casa, você não teve dificuldades para salvar sua família por meio de negociação, graças ao cuidado e calma que seus familiares tiveram, pois você os avisou sobre a guerra poder chegar na cidade.`);
    }
    else if (rep5 == "nao"){
        console.log(`Seu erro foi não se importar com sua família no momento do desespero.\n
        Quando você reportou a mensagem ao seu superior, a Inteligência descobriu que a Nave civil Tuk levava armamentos secretamente, o que é um perigo.\n
        Essas informações ajudaram as autoridades a mitigar os impactos do ataque Tuk.\n
        Quando você assiste o noticiário, você vê a notícia de que a guerra possivelmente chegaria à sua cidade e você avisa sua família para tomarem cuidado.\n
        Quando você decidiu ir ao trabalho com a carona, todos te parabenizaram e você foi promovido\n
        Quando você enfrentou o Tuk, sua força de vontade te deu uma força inexplicável e você o neutralizou com seu poder\n
        Por fim, sua família foi levada para o planeta Tuk como refém pelos Tuks. Vai ser uma dor de cabeça salvá-los dessa.`);
    }
}
else if(conta_sims == 3){
    console.log(`Dá pra ver que você é esforçado, e parece uma boa pessoa, no geral. Contudo, para ser um verdadeiro herói, você precisa ser mais corajoso no seu dia a dia.\n
    Suas ações definitivamente evitaram o pior, mas não foram as melhores possíveis.`);
}
else if(conta_sims == 2 || conta_sims == 1){
    console.log(`Você é bem preguiçoso pelo jeito. Sua atitude pode até ter evitado situações piores, mas dá pra ver que sua situação não é boa`);
}
else{
    console.log(`Você é um fracasso! O fato de você não avisar seus superiores sobre a mensagem interceptada, fez com que o governo não descobrisse informações importantes sobre o ataque Tuk.\n
    Quando você não ligou o noticiário, você e a sua família deixaram de ficar sabendo que a guerra poderia chegar à sua cidade e não esperavam um sequestro, nem um ataque.\n
    Quando você escolheu não ir ao trabalho, seu chefe decidiu te intimar e te rebaixar de cargo, por achar você um desleixado.\n
    Quando você não enfrentou o Tuk, você não parou ele, e ele roubou diversas informações de inteligência e também espancou vários de seus colegas, que agora te acham um fracote.\n
    Por fim, os Tuks sequestram sua família e os levam para o planeta Tuk. Sua família agora se questiona sobre sua falta de amor para com eles.\n`);
}

console.log();
console.log();