import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";

import {Sito} from "./sito.model";

import {ProgettoService} from "./progetto.service";
import {Progetto} from "./progetto.model";
import { Word } from '../post-login/word.model';


@Component({
    selector: 'app-word',
    templateUrl: './word.component.html'
})
export class WordComponent implements  OnInit{
    constructor(public route: ActivatedRoute, public router: Router,) {}

    @Input() indiceWord: number;
    @Input() word;
    @Output() deleteWords = new EventEmitter();
    

    ngOnInit(){
        
     }

     deleteWord() {
        
         this.deleteWords.emit(this.indiceWord);
     }

     goWord(word: Word) {
        this.router.navigate(['home/' + word]);
        document.getElementById("validazione").classList.toggle("active");
        document.getElementById("progetto").classList.remove("active"); 
        document.getElementById("frontend").classList.remove("active");
     }
}