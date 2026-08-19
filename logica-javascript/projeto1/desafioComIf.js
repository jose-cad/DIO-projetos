const readlineSync = require('readline-sync');

let nomeHeroi = readlineSync.question('Digite o nome do heroi: ');
let xpHeroi = readlineSync.question('Digite o XP do heroi: ');

let levelHeroi = '';

if (xpHeroi <= 1000) {
	levelHeroi = 'Ferro';

}else if (xpHeroi > 1000 && xpHeroi <= 2000) {
	levelHeroi = 'Bronze';


}else if (xpHeroi > 2000 && xpHeroi <= 5000) {
	levelHeroi = 'Prata';

}else if (xpHeroi > 5000 && xpHeroi <= 7000) {
	levelHeroi = 'Ouro';

}else if (xpHeroi > 7000 && xpHeroi <= 8000) {
	levelHeroi = 'Platina';

}else if(xpHeroi > 8000 && xpHeroi <= 9000) {
	levelHeroi ='Ascendente';

}else if(xpHeroi > 9000 && xpHeroi <= 10000) {
	levelHeroi = 'Imortal';

}else {
	levelHeroi = 'Radiante';
}


console.log('o heroi ' + nomeHeroi + ' esta no level ' + levelHeroi);
