import {Component, OnInit} from '@angular/core';

import {ProgettoService} from "./progetto.service";
import {Progetto} from "./progetto.model";

@Component({
    selector: 'app-progetto',
    templateUrl: './progetto.component.html',
    styleUrls: ['./progetto.component.css']
})
export class ProgettoComponent {
    constructor(private progettoService: ProgettoService) {}

    public progetti: Progetto[] = [];
    public progetto: Progetto;

    placeholderVar = "Scrivi il nome del progetto qui..."
    nomeProgetto: string = '';


    OneditorModelAddProgetto(event) {
        this.nomeProgetto = event;
    }

    selectProgetto(event:MouseEvent) {
        console.log('myDropdownProgetti');
        document.getElementById("myDropdownProgetti").classList.toggle("show");  
    }


    setColorProgetto(progettoName: string, i: number) {
        // console.log(progettoName, i);
        if (this.progetto.name === this.progetti[i].name) {
        
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    setProgetto( i: number) {
        console.log('setta progetto');
        this.progetto = this.progetti[i];
    }

    closeProgetto(event) {
        
        if (!event.target.matches('.dropbtn')) {        
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        } 
    } 
    

    ngOnInit(){
        
        this.progettoService.getProgetto()
        
        .subscribe(
            (progetto: Progetto[]) => {
                this.progetti = progetto;
                this.progetto = this.progetti[0]
                console.log('Elenco progetti: ', progetto);
            }
        );
      
     }

     addProgetto() {

        const newProgetto = new Progetto(this.nomeProgetto.replace(/<(?:.|\n)*?>/gm, ''));

        this.progetti.push(newProgetto);
        
        this.progettoService.addProgetto(newProgetto)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );

        this.nomeProgetto = '';

     }

    

   
}