import {Component, ViewChild} from '@angular/core';
import {PostLoginServiceF} from "./post-login.service";
import { ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';
import {NgForm} from '@angular/forms';

import {Word} from "./word.model";
//Per YOUTube

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {ViewEncapsulation} from '@angular/core';

import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyCRJqo_zdv1gDIsSkczJOFTnKcm2coSWEA';

//Per YOUTube

@Component({
    selector: 'app-listmappe-f',
    templateUrl: './list-mappe.component.html',
    styleUrls: ['./list-mappe.component.css', './youtube.component.scss'],
    //Per YOUTube
    encapsulation: ViewEncapsulation.None,
    //Per YOUTube
})
export class ListMappeComponentF {
    //Per YOUTube
    searchForm: FormGroup;
    results: Observable<{}>;    

    searchFormBis: FormGroup;
    
    resultsBis: Observable<{}>;    
    resultsBis_Sub;  
    resultsBis_1: Observable<{}>;  
    resultsBis_2: Observable<{}>; 
    resultsBis_3: Observable<{}>; 
    // resultsBis_1;  
    // resultsBis_2; 
    
    // resultsBis;     
    // resultsBis_1;   
    // resultsBis_2;  

    trasformedYouTubeItems = [];
    transformedWords: Word[] = [];
    // public words: Word[] = [];

    // private path_to_server: string = 'http://localhost:3000';
    private path_to_server: string = 'http://localhost:8880';

    //Per YOUTube

    @ViewChild('f') signupForm: NgForm;

    constructor( public router: Router, private route: ActivatedRoute, private boxService: PostLoginServiceF, private formBuilder: FormBuilder, private http: Http) {

        this.transformedWords = [];    
        
        // this.resultsBis =  Observable.forkJoin([this.resultsBis_1, this.resultsBis_2])
        // .map(responses => {
        //     console.log('response forkJoin: ', responses)
        //    // responses[0] => cars
        //    // responses[1] => bikes
        // });
      
    
        //Per YOUTube
        this.searchForm = this.formBuilder.group({
            search: ['', Validators.required],
          });
        
          this.results = this.searchForm.controls.search.valueChanges
        // this.words = this.searchForm.controls.search.valueChanges
          
          .filter(value => value.length > 4)
          .debounceTime(500)
          //use distictUntilChanged: Only emit when the current value is different than the last.
          .distinctUntilChanged()
          //use Switchmap: it works perfect for scenarios like typeaheads
          //where you are no longer concerned with the response of the previous request when a new input arrives.
          .switchMap(searchTerm =>

            this.http.get(this.path_to_server + '/home-info/' + searchTerm + '/' + 'all' + '/' + 'all' + '/' + 'all' + '/' + 'all' + '/' + 'all')
            // this.http.get(
            //   `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=10&part=snippet&type=video`
            // )
          )
        //   .map(res => res.json().items);
        .map((response: Response) => {
            const words = response.json().obj;
            console.log('words', words);

            this.transformedWords = [];
            
            for (let word of words) {

                this.transformedWords.push(new Word(word.word, word.titolo, word.body, word.path, word.meta1, word.meta2, word.meta3, word.images, word.type, word._id, word.licenza, word.scuola, word.controllato, word.quality))}

                this.words = this.transformedWords;
                console.log('Trasformed: ', this.words);
                
                return this.transformedWords;
        })

       

        // this.searchFormBis = this.formBuilder.group({
        //     search: ['', Validators.required],
        //   });
        
          this.resultsBis_1 = this.searchForm.controls.search.valueChanges
           
          .filter(value => value.length > 4)
          .debounceTime(500)
          //use distictUntilChanged: Only emit when the current value is different than the last.
          .distinctUntilChanged()
          //use Switchmap: it works perfect for scenarios like typeaheads
          //where you are no longer concerned with the response of the previous request when a new input arrives.

          .switchMap(searchTerm => {
            //    let search1 = this.http.get(
            //   `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=10&part=snippet&type=video&channelId=UCbFv_gbFN9UvNHJJjGavF6g`);

            let search1 = this.http.get(
                `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=10&part=snippet&type=video&relevanceLanguage=it&safeSearch=strict`);
             
               return search1
            })

          .map(res => {
            //   let solo_zani = [];
             
            //   for (let item of res.json().items) {
            //       let array_edi = ['UCbFv_gbFN9UvNHJJjGavF6g', 'UCofo3ZNdYI5CqNgmMyF_7Cw', 'UCA1t5LNIyfmXZqGuUaY2oww' ]
              

            //     if (array_edi.includes(item.snippet.channelId)) {
            //         solo_zani.push(item);
            //     }

            //   }
            return res.json().items
            // console.log('solo_zani: ', solo_zani);
            // return solo_zani
          }
            );

        //     this.resultsBis_2 = this.searchForm.controls.search.valueChanges
           
        //   .filter(value => value.length > 2)
        //   .debounceTime(500)
        //   //use distictUntilChanged: Only emit when the current value is different than the last.
        //   .distinctUntilChanged()
        //   //use Switchmap: it works perfect for scenarios like typeaheads
        //   //where you are no longer concerned with the response of the previous request when a new input arrives.

        //   .switchMap(searchTerm => {
             
        //       let search2 = this.http.get(
        //         `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&channelId=UCofo3ZNdYI5CqNgmMyF_7Cw`)
                     
        //        return search2
        //     })

        //   .map(res => {
            
        //     let solo_monda = [];
             
        //     for (let item of res.json().items) {
        //         if(item.snippet.channelId == 'UCofo3ZNdYI5CqNgmMyF_7Cw') {
        //             solo_monda.push(item);
        //         }
        //     }
        //   //   return res.json().items
        //   console.log('solo_zani: ', solo_monda);
        //   return solo_monda
        //         // return res.json().items
        //       }
        //     );

            
          
            //this.resultsBis = this.resultsBis_2;
            // this.resultsBis = this.resultsBis.concat(this.resultsBis_1);

         

            // this.resultsBis = this.resultsBis_1
            // this.resultsBis_1
            //     .concat(this.resultsBis_2)
            //     .subscribe(results => {
            //         console.log('Subscribe: ', results);
            //         this.resultsBis = results;
            //     })

            // this.resultsBis = Observable
            // .concat(this.resultsBis_1, this.resultsBis_2)
            // .subscribe(results => {
            //     return results
            // })


           
            

            // this.resultsBis = Observable.forkJoin(this.resultsBis_1, this.resultsBis_2)            
            
            // .subscribe(results => {

            //     // this.resultsBis = this.resultsBis_1;
            //     console.log('forkJoin: ', results);
                

            //     // for (let word of this.resultsBis_2) {
            //     return this.resultsBis = this.resultsBis_1.concat(this.resultsBis_2);   
            //     //     this.resultsBis.push(word)
            //     // }
            
            //   })
              
          

              
              

          

       //Per YOUTube
       
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

    private array_scuola = ["Infanzia", "Primaria", "Secondaria Primo Grado", "Secondaria Secondo Grado", 'Universita'];

    private array_risorsa = ["Page", "Image", "Video", "charset=UTF-8", "text\/html; charset=utf-8", "image/jpeg", "image/png", "video/mp4", "image/gif", "PDF", "pdf", "Pdf", "image"];

    private array_fonte = ["Editore", "Blog", "MOOC"];

    private array_materia = ['Matematica', 'Fisica', 'Geografia', 'Storia', 'Italiano', 'Scienze', 'Inglese', 'Francese', 'Tedesco', 'Spagnolo', 'Tecnologia', 'Arte e Immagine', 'Scienze motorie e sportive', 'Latino', 'Informatica', 'Filosofia', 'Musica', 'Religione', 'Scienze delle Terra', 'Biologia', 'Chimica', 'Diritto ed economia', 'Psicologia', 'Antropologia', 'Pedagogia', 'Sociologia', 'Disegno', 'Greco', 'Geostoria'];

    private array_licenza = ['copyright', 'creative commons', "pubblico dominio"];


    

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

        // console.log('this.signupForm.value: ',this.signupForm.value)

       /*  if (this.search_scuola === 'all') {
            this.search_scuola = ''
        }

        if (this.search_risorsa === 'all') {
            this.search_risorsa = ''
        } */

   
      //  var i= 1
        
        for(var key in this.signupForm.value) {
                 

            if (this.signupForm.value[key]) {
                
                console.log('Quelli settati sono: ', key);

                if ((this.array_scuola.indexOf(key)) != -1) { 
                    this.search_scuola = this.search_scuola + '&'+ key;    
                     console.log('Key', key, this.search_scuola)    
                } else {}

                if ((this.array_risorsa.indexOf(key)) != -1) { 
                    
                    this.search_risorsa = this.search_risorsa + '&'+ key;       
                    
                    console.log('key: ', key, this.search_risorsa);
                } else {}

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

        }
       
       /*  this.router.navigate(['home/' + this.search_word + '/' + this.search_scuola + '/' + this.search_risorsa]); */

        // this.doSearch(this.boxService.search_word, this.search_scuola, this.search_risorsa, this.search_fonte, this.search_materia, this.search_licenza);


        this.doSearch(this.boxService.search_word, this.search_scuola, this.search_risorsa, this.search_fonte, this.search_materia, this.search_licenza);
        
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

    replaceAt(index, replacement, stringa) {
        // let string_replace = stringa.substr(0, index)  + stringa.substr(index );

        let string_clean = stringa.slice(0, index);

        // console.log('Inside replace string_replace: ', string_clean);
        return string_clean;
    }

    private res;
    private res_risorsa;

    doSearch(search_word: string, search_scuola: string, search_risorsa: string, search_fonte: string, search_materia: string, search_licenza: string) {

        console.log('Parametro iniziale search_scuola: ', search_scuola, search_risorsa);
        
        this.search_scuola_FE = this.remove(this.search_scuola.split("&"), "");

        this.search_scuola_FE.toString().replace('all,', '');  
        
        this.res = this.search_scuola.replace("all&", "");

        this.res_risorsa = this.search_risorsa.replace("all&", "");
        // let res_risorsa = this.search_risorsa;

        this.search_clean = (search_word.replace(/<(?:.|\n)*?>/gm, '')).toLowerCase();

       
        if (this.res_risorsa.charAt(this.res_risorsa.length - 1) == "&") {
                var search_risorsa_clean = this.replaceAt(this.res_risorsa.length-1, '', this.res_risorsa);
                console.log('Search_risorsa_clean: ', search_risorsa_clean);
                
        } else {
                console.log('Search_risorsa_clean: ', search_risorsa_clean);
                search_risorsa_clean = this.res_risorsa;
        }

        if (this.res.charAt(this.res.length - 1) == "&") {
                var search_scuola_clean = this.replaceAt(this.res.length-1, '', this.res);
                console.log('Search_scuola_clean: ', search_scuola_clean);
                
        } else {
            console.log('search_scuola_clean: ', search_scuola_clean);
            search_scuola_clean = this.res;
        } 
      
        if (this.search_clean != "") {

            this.boxService.getBoxes(this.search_clean, search_scuola_clean, search_risorsa_clean, search_fonte, search_materia, search_licenza)
        
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