import {Component, Input, OnInit} from '@angular/core';
import {Sito} from "./sito.model";




@Component({
    selector: 'app-sito',
    templateUrl: './sito.component.html'
})
export class SitoComponent implements  OnInit{
    constructor() {}

    ngOnInit(){
        
        
     }

    @Input() sito: Sito;
}