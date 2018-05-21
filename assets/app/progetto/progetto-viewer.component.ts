import {Component, Input} from '@angular/core';


import {Progetto} from "./progetto.model";


@Component({
    selector: 'app-progetto-viewer',
    templateUrl: './progetto-viewer.component.html',
    styleUrls: ['./progetto-viewer.component.css']
})
export class ProgettoViewerComponent {
    constructor() {}

    @Input() progetto: Progetto;

    progettoMedium = '';

    editorPlaceholder = "Scrivi Sotto Progetto qui...";

    sottoProgetto = ["Area Scientifica"];
    typeMateriaValue: string[] = ["Area Scientifica", "Area Umanistica", "Area Tecnica"]; 
   

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
        
        // if (this.typeMateria.indexOf(typeMateria) == -1 || this.typeMateria.length == 0 ) {
        //     this.typeMateria.push(typeMateria);
        //     this.typeMateria2String = this.typeMateria.join(', ');         

        // } else {
        //     this.typeMateria.splice(this.typeMateria.indexOf(typeMateria), 1);
        //     this.typeMateria2String = this.typeMateria.join(', ');
                   
        // }
    }
   
}