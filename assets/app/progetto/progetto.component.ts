import {Component, OnInit} from '@angular/core';

import {ProgettoService} from "./progetto.service";
import {Progetto} from "./progetto.model";

@Component({
    selector: 'app-progetto',
    templateUrl: './progetto.component.html'
})
export class ProgettoComponent {
    constructor(private progettoService: ProgettoService) {}

    public progetti: Progetto;

    ngOnInit(){
        
        this.progettoService.getProgetto()
        
        .subscribe(
            (progetto: Progetto) => {
                this.progetti = progetto;

                console.log('Elenco siti progetto: ', progetto);
            }
        );
      
     }

    

   
}