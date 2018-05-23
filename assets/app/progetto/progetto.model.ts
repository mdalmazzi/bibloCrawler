import {Sito} from './sito.model'

export class Progetto {
    
    name: string;
    sito?: [Sito];
    words?: string[];

    constructor( name: string, sito?: [Sito], words?: string[]) {
       
        this.name = name;
        this.sito = sito; 
        this.words = words; 


    }
}
