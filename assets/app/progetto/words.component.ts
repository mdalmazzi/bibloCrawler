import {Component, Input, OnInit} from '@angular/core';
import {Sito} from "./sito.model";

import {ProgettoService} from "./progetto.service";
import {Progetto} from "./progetto.model";


@Component({
    selector: 'app-words',
    templateUrl: './words.component.html'
})
export class WordsComponent implements  OnInit{
    constructor(private progettoService: ProgettoService) {}

    @Input() indiceWord: number;
    @Input() words: string[];
    @Input() progetto: Progetto;

    editorPlaceholder = "Scrivi la keyword qui...";

    ngOnInit(){
        
     }
   
    wordMedium: string = '';
    

    OneditorModelChangeWord(event) { 
      
        console.log('event medium: ', event);
        this.wordMedium = event;
     }

     addWord() {

        console.log('progetto - wordMedium: ',this.wordMedium, this.progetto);

        this.words.push(this.wordMedium.replace(/<(?:.|\n)*?>/gm, ''));
        this.wordMedium = '';
        // console.log(this.words);
     }

     deleteWords(indice) {
         this.words.splice(indice, 1)
     }

     onSubmit() {
            
        // const sito = new Sito(this.fonteUrl.replace(/<(?:.|\n)*?>/gm, ''), this.typeFonte[0], this.typeLicenza[0], this.typeSchool, this.typeLanguage, this.typeMateria);

        this.progetto.words = this.words;

        console.log('this.progetto: ', this.progetto);

        console.log('Submit: sito >>', this.words);
           this.progettoService.onUpdateWords(this.progetto)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
    }

    
}