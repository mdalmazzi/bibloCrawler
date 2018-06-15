import {Meta} from './meta.model'

export class Sito {
    // word?: string;
    text: string;
    tipologia: string;
    licenza?: any;
    scuola?: string[];
    lingua?: string[];
    materia?: string[];
    _id?:string;  
    completed?: boolean;
    quality?: number;
    

    constructor( text?: string, tipologia?: string, licenza?: string, scuola?: string[], lingua?: string[], materia?: string[], _id?:string, completed?: boolean, quality?: number) {
       
        this.text = text;
        this.tipologia = tipologia;
        this.licenza = licenza;
        this.scuola = scuola;
        this.lingua = lingua;
        this.materia = materia;
        this.completed = completed;
        this.quality = quality;

    }
}
