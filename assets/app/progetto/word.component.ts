import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Sito} from "./sito.model";

import {ProgettoService} from "./progetto.service";
import {Progetto} from "./progetto.model";


@Component({
    selector: 'app-word',
    templateUrl: './word.component.html'
})
export class WordComponent implements  OnInit{
    constructor() {}

    @Input() indiceWord: number;
    @Input() word: string;
    @Output() deleteWords = new EventEmitter();
    

    ngOnInit(){
        
     }

     deleteWord() {
        
         this.deleteWords.emit(this.indiceWord);
     }
}