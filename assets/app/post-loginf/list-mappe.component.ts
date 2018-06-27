import {Component, ViewChild} from '@angular/core';
import {PostLoginServiceF} from "./post-login.service";
import { ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';
import {NgForm} from '@angular/forms';

import {Word} from "./word.model";


@Component({
    selector: 'app-listmappe-f',
    templateUrl: './list-mappe.component.html',
    styleUrls: ['./list-mappe.component.css']
})
export class ListMappeComponentF {

    @ViewChild('f') signupForm: NgForm;

    constructor( public router: Router, private route: ActivatedRoute, private boxService: PostLoginServiceF) {
       
        this.route.params.subscribe (
            params => {
                this.search_word = params['word'];
                this.search_scuola = params['scuola'];
                this.search_risorsa = params['risorsa'];
                this.search_fonte = params['fonte'];
                this.search_materia = params['materia'];
                this.search_licenza = params['licenza'];
                

              
                // this.doSearch(this.search_word, this.search_scuola, this.search_risorsa, this.search_fonte, this.search_materia,this.search_licenza, )
              
            }
        );

        if (this.boxService.page != 1) {
            this.p = this.boxService.page
        }
        
    }

    public words: Word[] = [];
    private array_scuola = ['Infanzia', 'Primaria','Secondaria Primo Grado', 'Secondaria Secondo Grado', 'Università', , 'Universita'];
    private array_risorsa = ['Immagini', 'Video','Esercizi', 'esercizi', 'Pagina Web', 'Web page', 'web page', 'Immagine', 'video', 'immagine', 'PDF', 'pdf', 'Pdf'];

    private array_fonte = ['treccani', 'oilproject'];
    private array_materia = ['scienze', 'fisica', 'storia' , 'matematica', 'italiano', 'inglese'];
    private array_licenza = ['copyright', 'Creative Commons', 'Copyright'];

    //private search_word: string; // inutilizzata
    public search_word: string = "";
    public search_scuola: string = "";
    public search_risorsa: string = "";
    public search_fonte: string = "";
    public search_materia: string = "";
    public search_licenza: string = "";
    public search_clean: string = "";

    public search_scuola_v = true;
    public search_lingua_v = true;
    public search_risorsa_v = true;
    public search_licenza_v = true;
    public search_fonti_v = true;
    public search_materia_v = true;
    public search_elementare_v = false;
    public search_primo_v = false;
    public search_secondo_v = false;
    public search_editori_v = false;
    public ricerca_v = true;
    public placeholderVar = "Cerca";

    public search_scuola_FE: string = "";

    

    public change_mouse: string;

    // paginazione
    p: number = 1;
    collection: any[] = this.words;  

    // paginazione

    set_ricerca() {
        this.ricerca_v = !this.ricerca_v
    }

    set_scuola_v() {
        this.search_scuola_v = !this.search_scuola_v
    }

    set_elementare_v() {
        this.search_elementare_v = !this.search_elementare_v
    }

    set_primo_v() {
        this.search_primo_v = !this.search_primo_v
    }

    set_secondo_v() {
        this.search_secondo_v = !this.search_secondo_v
    }

    set_editori_v() {
        this.search_editori_v = !this.search_editori_v
    }

    set_lingua_v() {
        this.search_lingua_v = !this.search_lingua_v
    }

    set_risorsa_v() {
        this.search_risorsa_v = !this.search_risorsa_v
    }

    set_licenza_v() {
        this.search_licenza_v = !this.search_licenza_v
    }

    set_fonti_v() {
        this.search_fonti_v = !this.search_fonti_v
    }

    set_materia_v() {
        this.search_materia_v = !this.search_materia_v
    }

    OnMouseEnter($event) {
        this.change_mouse = 'pointer'
    }

    OnMouseLeave($event) {
        this.change_mouse = 'default'
    }

   /*  onSubmit(form: NgForm) {
        console.log('Submitted!!!', form)
    } */

    onSubmit(f) {
        
        
        this.search_scuola = "";
        this.search_risorsa = ""; 
        this.search_fonte = ""; 
        this.search_materia = ""; 
        this.search_licenza = ""; 

       /*  if (this.search_scuola === 'all') {
            this.search_scuola = ''
        }

        if (this.search_risorsa === 'all') {
            this.search_risorsa = ''
        } */

   
      //  var i= 1
        if (this.signupForm) {} else {
           // console.log('caspita')
        }
        for(var key in this.signupForm.value) {
       
         //   var value = ;
            if (this.signupForm.value[key]) {
                if ((this.array_scuola.indexOf(key)) != -1) { 
                    this.search_scuola = this.search_scuola + '&'+ key + '&';       
                }
                if ((this.array_risorsa.indexOf(key)) != -1) { 
                    this.search_risorsa = this.search_risorsa + '&'+ key + '&';        
                }
                if ((this.array_fonte.indexOf(key)) != -1) { 
                    this.search_fonte = this.search_fonte + '&'+ key ;        
                }
                if ((this.array_materia.indexOf(key)) != -1) { 
                    this.search_materia = this.search_materia + '&'+ key ;        
                }
                if ((this.array_licenza.indexOf(key)) != -1) { 
                    this.search_licenza = this.search_licenza + '&'+ key ;        
                }
            }
            
            //console.log(this.search_fonte);

            //console.log(this.search_licenza);

            if (this.boxService.search_word == '') {
                this.boxService.search_word = 'all'
            }
            

            if (this.search_scuola == '') {
                this.search_scuola = 'all'
            }

            if (this.search_risorsa == '') {
                this.search_risorsa = 'all'
            }

            if (this.search_fonte == '') {
                this.search_fonte = 'all'
            }

            if (this.search_materia == '') {
                this.search_materia = 'all'
            }

            if (this.search_licenza == '') {
                this.search_licenza = 'all'
            }

            
           /*  if (value) {
               if (i==1) { (this.search_scuola = 'Infanzia')} ;  
               if (i==2) { (this.search_scuola = this.search_scuola + '&' + 'Primaria')} ;    
               if (i==3) { (this.search_scuola = this.search_scuola + '&' +'Secondaria Primo Grado')} ; 
               if (i==4) { (this.search_scuola = this.search_scuola + '&' +'Secondaria Secondo Grado')} ; 
               if (i==5) { (this.search_scuola = this.search_scuola + '&' +'Università')} ; 
            } */
      //      i++
        }
       
       /*  this.router.navigate(['home/' + this.search_word + '/' + this.search_scuola + '/' + this.search_risorsa]); */

        // this.doSearch(this.boxService.search_word, this.search_scuola, this.search_risorsa, this.search_fonte, this.search_materia, this.search_licenza);


        this.doSearch(this.boxService.search_word, this.search_scuola, this.search_risorsa, this.search_fonte, this.search_materia, this.search_licenza);
      //  console.log(this.search_fonte.split("&"), this.search_fonte.split("&").length)
        
    }
    
    ngOnInit(){
        /* this.boxService.search_word = this.search_word;
        this.boxService.search_scuola = this.search_scuola; */
        
       /*  this.boxService.getBoxes(this.search_word, this.search_scuola, this.search_risorsa)
            .subscribe(
                (words: Word[]) => {
                    this.words = words;            
                }
            ); */
            
    }

    OneditorModelChangeSEARCH(event: any) {
        
        //this.doSearch(event, this.search_scuola, this.search_risorsa);
        
        this.boxService.search_word = event.replace(/<(?:.|\n)*?>/gm, '').toLowerCase();
        
       
    } 

    remove(array, element) {
        return array.filter(e => e !== element);
        
    }

    doSearch(search_word: string, search_scuola: string, search_risorsa: string, search_fonte: string, search_materia: string, search_licenza: string) {

        
        //this.search_scuola_FE = this.search_scuola.split("&");
       // this.remove(this.search_scuola.split("&"), "");
        this.search_scuola_FE = this.remove(this.search_scuola.split("&"), "");
       
        this.search_scuola_FE.toString().replace('all,', '');  
        //this.search_scuola_FE.toString().replace('All,', '');   

        this.search_clean = (search_word.replace(/<(?:.|\n)*?>/gm, '')).toLowerCase();
       
      
        if (this.search_clean != "") {

            this.boxService.getBoxes(this.search_clean, search_scuola, search_risorsa, search_fonte, search_materia, search_licenza)
        
                .subscribe(
                    (words: Word[]) => {
                        this.words = words;    
                        console.log(this.words)                        
                    }
                )
        }


   
        // this.router.navigate(['home/' + search_clean + '/' + search_scuola + '/' + search_risorsa]);    
        
    }
}