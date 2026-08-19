const readlineSync = require('readline-sync');

let nomeHeroi = readlineSync.question('Digite o nome do heroi: ');
let xpHeroi = readlineSync.question('Digite o XP do heroi: ');

let levelHeroi = '';

switch (true) {
        case xpHeroi <= 1000:
            levelHeroi = 'Ferro';
            break;

        case xpHeroi <= 2000:
            levelHeroi = 'Bronze';
            break;

        case xpHeroi <= 5000:
            levelHeroi = 'Prata';
            break;

        case xpHeroi <= 7000:
            levelHeroi = 'Ouro';
            break;

        case xpHeroi <= 8000:
            levelHeroi = 'Platina';
            break;

        case xpHeroi <= 9000:
            levelHeroi = 'Ascendente';
            break;

        case xpHeroi <= 10000:
            levelHeroi = 'Imortal';
            break;

        default:
            levelHeroi = 'Radiante';
            break;
    }

    console.log('o heroi ' + nomeHeroi + ' esta no level ' + levelHeroi);
