const readlineSync = require('readline-sync');

let nomeHeroi = readlineSync.question('Digite o nome do heroi: ');
let vitoriasHeroi = readlineSync.question('quantidade de vitorias do heroi?: ');
let derrotasHeroi = readlineSync.question('quantidade de derrotasHeroi do heroi?: ');
parseInt(vitoriasHeroi, derrotasHeroi)
let xpHeroi =  vitoriasHeroi - derrotasHeroi
let nivelHeroi = rankingHeroi(vitoriasHeroi, derrotasHeroi);



function rankingHeroi(xpHeroi){
    let levelHeroi = '';
    
    switch (true) {
        case xpHeroi <= 10:
            levelHeroi = 'Ferro';
            break;

        case xpHeroi <= 20:
            levelHeroi = 'Bronze';
            break;

        case xpHeroi <= 50:
            levelHeroi = 'Prata';
            break;

        case xpHeroi <= 80:
            levelHeroi = 'Ouro';
            break;

        case xpHeroi <= 90:
            levelHeroi = 'Diamante';
            break;

        case xpHeroi <= 100:
            levelHeroi = 'Lendario';
            break;

        default:
            levelHeroi = 'Imortal';
            break;
    }


		return levelHeroi
}


console.log('O ' + nomeHeroi + ' tem de saldo ' + xpHeroi + ' está no nível ' + nivelHeroi);
