import {Component, Input, OnInit} from '@angular/core';
import {Sito} from "./sito.model";
import {ProgettoService} from "./progetto.service";



@Component({
    selector: 'app-sito',
    templateUrl: './sito.component.html'
})
export class SitoComponent implements  OnInit{
    constructor(private progettoService: ProgettoService) {}

    ngOnInit(){
        
      //  
     }

    @Input() sito: Sito;


    onSubmit() {
            
        const sito = this.sito;
        console.log('this.sito: ', this.sito);

        const progettoName = this.progettoService.progetto.name;
           
        this.progettoService.progetto.sito.push(sito);
        const progetto = this.progettoService.progetto;
        

        this.progettoService.addTodo(sito, progettoName)
            .subscribe(
                data => {
                    console.log(data);
                    // alert(`Sito aggiunto: ${JSON.stringify(data, undefined, 2)}`);
                },
                error => console.error(error)
            );
    }
}