import {Component, Input, OnInit} from '@angular/core';


import {Progetto} from "./progetto.model";


@Component({
    selector: 'app-progetto-viewer',
    templateUrl: './progetto-viewer.component.html',
    styleUrls: ['./progetto-viewer.component.css']
})
export class ProgettoViewerComponent implements  OnInit{
    constructor() {}

    @Input() progetto: Progetto;

    progettoMedium = '';

    editorPlaceholder = "Scrivi Sotto Progetto qui...";

    sottoProgetto = ["Area Scientifica"];
    typeMateriaValue: string[] = ["Area Scientifica", "Area Umanistica", "Area Tecnica"]; 
   

    ngOnInit(){
        console.log('Viewer this.progetto: ', this.progetto);  
     }

    OneditorModelChangeWord(event) {
        // da inserire
    }

    selectSottoProgetto(event:MouseEvent) {
        
        document.getElementById("myDropdownProgetto").classList.toggle("show");  
    }


    setColorSottoProgetto(sottoProgetto: string) {
        if (this.sottoProgetto.indexOf(sottoProgetto) > -1) {
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    closeSottoProgetto(event) {
        
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

    setSottoProgetto(typeMateria: string) {
        
      
    }
   
}