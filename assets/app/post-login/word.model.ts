import {Meta} from './meta.model'

export class Word {
    word: string;
    titolo: string;
    body: string;
    path: string;
    meta1?: Meta;
    meta2?: Meta;
    meta3?: Meta;
    images?: any;
    type?: string;
    wordId?: string;
   // userId?: string;
    licenza?: string;
    scuola?: string;
    controllato?: boolean;
    quality?: string;
    

    constructor(word: string, titolo: string, body: string, path: string, meta1?: Meta, meta2?: Meta, meta3?: Meta, images?: any, type?: string, wordId?: string,  licenza?: string, scuola?: string, controllato?: boolean, quality?: string) {
        this.word = word;
        this.titolo = titolo;
        this.body = body;
        this.path = path;
        this.meta1 = meta1;
        this.meta2 = meta2;
        this.meta3 = meta3;
        this.images = images;
        this.type = type;
        this.wordId = wordId;
       // this.userId = userId;
        this.licenza = licenza;
        this.scuola = scuola;
        this.controllato = controllato;
        this.quality = quality;

    }
}
