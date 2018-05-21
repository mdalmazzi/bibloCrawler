import {Component,  OnInit} from '@angular/core';
import {ProgettoService} from "./progetto.service";

import {Sito} from "./sito.model";


@Component({
    selector: 'app-lista-siti',
    templateUrl: './lista-siti.component.html'
})
export class ListaSitiComponent implements  OnInit {
    constructor(private progettoService: ProgettoService) {}

    public siti: Sito[] = [];
 

    ngOnInit(){
        
        this.progettoService.getElencoSiti()
        
        .subscribe(
            (siti: Sito[]) => {
                this.siti = siti;
                console.log('Elenco siti crawler: ',  this.siti);
            }
        );
      
     }


   
}