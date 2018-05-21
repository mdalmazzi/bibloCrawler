import {Component, Input, OnInit} from '@angular/core';
import {Sito} from "./sito.model";


@Component({
    selector: 'app-fonte',
    templateUrl: './fonte-progetto.component.html'
})
export class FonteComponent implements OnInit {
    constructor() {}

    // @Input() sito: Sito[] = [];
    @Input() sito: Sito;
    @Input() indiceFonte: number;

    ngOnInit(){

        //this.fonteUrl = this.sito[this.indiceFonte].text;
        console.log('fonte-progetto:', this.sito, this.indiceFonte);
    
    }
    
}