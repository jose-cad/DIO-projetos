const readlineSync = require('readline-sync');



class heroi{
    
    constructor(nome, idade, classe){
        this.nome = nome; 
        this.idade = idade; 
        this.classe = classe;                 
    }
    
    atacar(){
        switch(this.classe) {
            case 'guerreiro':
                return 'o ' + this.classe + ' atacou usando espada'; 
                break; 
            
            case 'mago':
                return 'o ' + this.classe + ' atacou usando magia'
                break; 
  
            case 'monge':
                return 'o ' + this.classe + ' atacou usando artes marciais'; 
                break; 
            
            case 'ninja':
                return 'o ' + this.classe + ' atacou usando shuriken'; 
                break; 
                
            default:
                return 'classe desconhecida, deve ter morrido'
            
        }

    }
    
    
}


let nomeHeroi = readlineSync.question('Nome do heroi?: ');
let idadeHeroi = readlineSync.question('Idade do heroi?: ');
let classeHeroi = readlineSync.question('Classe do heroi?: ');

novoHeroi = new heroi(nomeHeroi, idadeHeroi, classeHeroi); 

const ataque = novoHeroi.atacar();




console.log(ataque);
