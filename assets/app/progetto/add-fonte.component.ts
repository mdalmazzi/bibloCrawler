import {Component, Input, OnInit} from '@angular/core';

import {Progetto} from "./progetto.model";
import {ProgettoService} from "./progetto.service";
import {Sito} from "./sito.model";


@Component({
    selector: 'app-add-fonte',
    templateUrl: './add-fonte.component.html',
    styleUrls: ['./add-fonte.component.css']
})

export class AddFonteComponent implements  OnInit{
    constructor(private progettoService: ProgettoService) {}

    editorPlaceholder = "Scrivi URL della fonte qui...";

    fonteUrl: string = '';
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
    
    @Input() progetto: Progetto;
    //@Input() sito: Sito[] = [];

    ngOnInit(){
       // console.log('Add this.progetto: ', this.progettoService.progetto);
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


    onSubmit() {
            
            const sito = new Sito(this.fonteUrl.replace(/<(?:.|\n)*?>/gm, ''), this.typeFonte[0], this.typeLicenza[0], this.typeSchool, this.typeLanguage, this.typeMateria);

            sito.completed = false;

            const progettoName = this.progettoService.progetto.name;
            // console.log('this.progetto.name', progettoName, this.progetto, sito);
            //const progettoName = this.progetto.name;
            
            this.progettoService.progetto.sito.push(sito);
            this.progetto = this.progettoService.progetto;
            console.log('Submit: sito >>', sito);

            this.progettoService.addTodo(sito, progettoName)
                .subscribe(
                    data => {
                        console.log(data);
                        alert(`Sito aggiunto: ${JSON.stringify(data, undefined, 2)}`);
                    },
                    error => console.error(error)
                );
        }

}