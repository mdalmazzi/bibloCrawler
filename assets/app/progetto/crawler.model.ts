import {Progetto} from './progetto.model'

export class Crawler {
    
    name: string;
    progetti?: [Progetto];


    constructor( name: string, progetti?: [Progetto]) {
       
        this.name = name;
        this.progetti = progetti; 
        
    }
}
