import {Component, Input, OnInit} from '@angular/core';

import {ProgettoService} from "./progetto.service";
import {Sito} from "./sito.model";

@Component({
    selector: 'app-modify-fonte',
    templateUrl: './modifica-fonte.component.html',
    styleUrls: ['./add-fonte.component.css']
})
export class ModifyFonteComponent implements  OnInit{
    constructor(private progettoService: ProgettoService) {}

    @Input() sito: Sito;
    @Input() indiceFonte: number;

    placeholderVar = "Scrivi URL fonte qui..."

    fonteUrl: string;
    addFonteVisibility: boolean = false;
    //SCHOOLTYPE
    typeSchool: string[] = [];
    typeSchool2String: string = '';
    typeSchoolValue: string[] = ['Primaria', 'Secondaria Primo Grado', 'Secondaria Secondo Grado'];

    //LANGUAGETYPE
    typeLanguage: string[] = [];
    typeLanguage2String: string = '';
    typeLanguageValue: string[] = ['Italiano', 'Francese', 'Inglese', 'Tedesco', 'Spagnolo'];

    //LICENZATYPE
    typeLicenza: string[] = [];
    typeLicenza2String: string = '';
    typeLicenzaValue: string[] = ['copyright', 'creative commons', 'pubblico dominio']; 

    //FONTETYPE
    typeFonte: string[] = [];
    typeFonte2String: string = '';
    typeFonteValue: string[] = ['Editore', 'Blog', 'MOOC']; 

    //MATERIATYPE
    typeMateria: string[] = [];
    typeMateria2String: string = '';
    typeMateriaValue: string[] = ['Matematica', 'Fisica', 'Geografia']; 
    

    changeCompleted(event) {
        this.sito.completed = ! this.sito.completed;
    }

    ngOnInit(){

        if (this.sito.text) {
            this.fonteUrl = this.sito.text;
        }
        
        if (this.sito.scuola) {
            this.typeSchool = this.sito.scuola;
            this.typeSchool2String = this.typeSchool.join(', ');
        }
      
        if (this.sito.licenza) {
            this.typeLicenza[0] = this.sito.licenza;
            this.typeLicenza2String = this.typeLicenza[0];
        }
        
        if (this.sito.tipologia) {
            this.typeFonte[0] = this.sito.tipologia;
            this.typeFonte2String = this.typeFonte.join(', ');
        }

        if (this.sito.lingua) {
            this.typeLanguage = this.sito.lingua;
            this.typeLanguage2String = this.typeLanguage[0];
        }

        if (this.sito.materia) {
            this.typeMateria = this.sito.materia;
            this.typeMateria2String = this.typeMateria.join(', ');
        }
     
        console.log('modifica fonte:', this.sito);
      
     }

    AddFonte() {
        this.addFonteVisibility = !this.addFonteVisibility;
    }

    selectSchool(event:MouseEvent) {
        
        document.getElementById("myDropdownSchool").classList.toggle("show");
        
    }

    selectLanguage(event:MouseEvent) {
        
        document.getElementById("myDropdownLanguage").classList.toggle("show");  
    }

    selectLicenza(event:MouseEvent) {
        
        document.getElementById("myDropdownLicenza").classList.toggle("show");  
    }

    selectFonte(event:MouseEvent) {
        
        document.getElementById("myDropdownFonte").classList.toggle("show");  
    }

    selectMateria(event:MouseEvent) {
        
        document.getElementById("myDropdownMateria").classList.toggle("show");  
    }

    closeSchool(event) {
        
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

    closeLanguage(event) {
        
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

    closeLicenza(event) {
        
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

    closeFonte(event) {
        
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

    closeMateria(event) {
        
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

    setSchool(typeSchool: string) {
        
        if (this.typeSchool.indexOf(typeSchool) == -1 || this.typeSchool.length == 0 ) {
            this.typeSchool.push(typeSchool);
            this.typeSchool2String = this.typeSchool.join(', ');
               

        } else {
            this.typeSchool.splice(this.typeSchool.indexOf(typeSchool), 1);
            this.typeSchool2String = this.typeSchool.join(', ');
               
            
        }
        
    }

    setLanguage(typeLanguage: string) {
        
        if (this.typeLanguage.indexOf(typeLanguage) == -1 || this.typeLanguage.length == 0 ) {
            this.typeLanguage.push(typeLanguage);
            this.typeLanguage2String = this.typeLanguage.join(', ');         

        } else {
            this.typeLanguage.splice(this.typeLanguage.indexOf(typeLanguage), 1);
            this.typeLanguage2String = this.typeLanguage.join(', ');
                   
        }
    }

    setLicenza(typeLicenza: string) {
        
        if (this.typeLicenza.indexOf(typeLicenza) == -1 || this.typeLicenza.length == 0 ) {
            this.typeLicenza.push(typeLicenza);
            this.typeLicenza2String = this.typeLicenza.join(', ');         

        } else {
            this.typeLicenza.splice(this.typeLicenza.indexOf(typeLicenza), 1);
            this.typeLicenza2String = this.typeLicenza.join(', ');
                   
        }
    }

    setFonte(typeFonte: string) {
        
        if (this.typeFonte.indexOf(typeFonte) == -1 || this.typeFonte.length == 0 ) {
            this.typeFonte.push(typeFonte);
            this.typeFonte2String = this.typeFonte.join(', ');         

        } else {
            this.typeFonte.splice(this.typeFonte.indexOf(typeFonte), 1);
            this.typeFonte2String = this.typeFonte.join(', ');
                   
        }
    }

    setMateria(typeMateria: string) {
        
        if (this.typeMateria.indexOf(typeMateria) == -1 || this.typeMateria.length == 0 ) {
            this.typeMateria.push(typeMateria);
            this.typeMateria2String = this.typeMateria.join(', ');         

        } else {
            this.typeMateria.splice(this.typeMateria.indexOf(typeMateria), 1);
            this.typeMateria2String = this.typeMateria.join(', ');              
        }
    }

    setColorSchool(typeSchool: string) {
        if (this.typeSchool.indexOf(typeSchool) > -1) {
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    setColorLanguage(typeLanguage: string) {
        if (this.typeLanguage.indexOf(typeLanguage) > -1) {
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    setColorLicenza(typeLicenza: string) {
        if (this.typeLicenza.indexOf(typeLicenza) > -1) {
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    setColorFonte(typeFonte: string) {
        if (this.typeFonte.indexOf(typeFonte) > -1) {
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    setColorMateria(typeMateria: string) {
        if (this.typeMateria.indexOf(typeMateria) > -1) {
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    OneditorModelChangeUrl(event) { 
        ///console.log(event.replace(/<(?:.|\n)*?>/gm, ''));    
        this.fonteUrl = event;        
     }

   

    onUpdate() {
            
             const sito = new Sito(this.fonteUrl.replace(/<(?:.|\n)*?>/gm, ''), this.typeFonte[0], this.typeLicenza[0], this.typeSchool, this.typeLanguage, this.typeMateria, this.sito._id, this.sito.completed);

             this.progettoService.onUpdate(sito, this.sito._id)
                 .subscribe(
                     result => console.log(result)
 
                 );
        }

    onDelete() {

        this.progettoService.progetto.sito.splice(this.progettoService.progetto.sito.indexOf(this.sito), 1);
           
            this.progettoService.onDelete(this.sito._id)
                .subscribe(
                    result => console.log(result)

                );
       }
}