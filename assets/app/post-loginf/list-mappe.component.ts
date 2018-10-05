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
    
   // resultsBis: Observable<{}>;  
    resultsBis;  
    resultsBis_Sub;  
    resultsBis_1;
    //
    resultsSum = [];
    resultsSum_NO = [];
    
    resultsBis_2; 
  
    resultsBis_3; 
    resultsBis_4;
    resultsBis_5;
    resultsBis_6;
    resultsBis_7;
    // resultsBis_1;  
    // resultsBis_2; 
    
    // resultsBis;     
    // resultsBis_1;   
    // resultsBis_2;  

    trasformedYouTubeItems = [];
    transformedWords: Word[] = [];
    // public words: Word[] = [];
    nextPage: string = null;

    pageTokenValue = ['CAAQAA', 'CAEQAA', 'CAIQAA', 'CAMQAA', 'CAQQAA', 'CAUQAA', 'CAYQAA', 'CAcQAA'];

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
            // console.log('typed: ', this.searchForm.controls.search.valueChanges, this.searchForm.controls.search);
            this.transformedWords = [];
           
            // for (let word of words) {
                for (var i=0; i<(words.length-1); i++) 
                {
                // var word = words[i];
                if ( (words[i+1].titolo == words[i].titolo )) {}
                else {
                // this.transformedWords.push(new Word(word.word, word.titolo, word.body, word.path, word.meta1, word.meta2, word.meta3, word.images, word.type, word._id, word.licenza, word.scuola, word.controllato, word.quality))

                this.transformedWords.push(new Word(words[i].word, words[i].titolo, words[i].body, words[i].path, words[i].meta1, words[i].meta2, words[i].meta3, words[i].images, words[i].type, words[i]._id, words[i].licenza, words[i].scuola, words[i].controllato, words[i].quality))
            
            }

                // this.words = this.transformedWords;           
                // return this.transformedWords;

            }
            // console.log('Trasformed: ', this.transformedWords);
               
            return this.transformedWords;
        })    

//search multiplo partendo da TUTTO YOUTube
        // this.searchForm.controls.search.valueChanges.subscribe((valueSearch) => {
        //     this.boxService.getYouTube(valueSearch, 'CAAQAA')
        
        //   .subscribe(
        //       (search) => {
        //         console.log('da service1', search, search.length);
        //         this.resultsBis_1 = search;      
        //         this.nextPage = search.nextPageToken      
        //       })

        //       for (var i=0; i<(this.pageTokenValue.length-1); i++) {         

        //         if (i==0) {
        //           this.boxService.getYouTube(this.searchForm.controls.search.value, this.pageTokenValue[i])
        //           .subscribe(
        //               (search) => {
        //                 console.log('da service2', search, search.length);
                       
        //                 this.resultsBis_2 = search;      
        //                 this.nextPage = search.nextPageToken       
        //                   })
        //                   }
        //           if (i==1) {
        //           this.boxService.getYouTube(this.searchForm.controls.search.value, this.pageTokenValue[i])
        //               .subscribe(
        //                   (search) => {
        //                   console.log('da service2', search, search.length);
                        
        //                   this.resultsBis_3 = search;      
        //                   this.nextPage = search.nextPageToken       
        //                   })
        //                   }
        //                   if (i==2) {
        //                     this.boxService.getYouTube(this.searchForm.controls.search.value, this.pageTokenValue[i])
        //                         .subscribe(
        //                             (search) => {
        //                             console.log('da service2', search, search.length);
                                  
        //                             this.resultsBis_4 = search;      
        //                             this.nextPage = search.nextPageToken       
        //                             })
        //                             }
        //                     if (i==3) {
        //                                 this.boxService.getYouTube(this.searchForm.controls.search.value, this.pageTokenValue[i])
        //                                     .subscribe(
        //                                         (search) => {
        //                                         console.log('da service2', search, search.length);
                                              
        //                                         this.resultsBis_5 = search;      
        //                                         this.nextPage = search.nextPageToken       
        //                                         })
        //                                         }
        //         }
        // })

//search multiplo partendo da TUTTO YOUTube
        
    // this.resultsBis_1 = this.searchForm.controls.search.valueChanges 
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
            
            this.resultsSum = [];
            // this.resultsSum_NO = [];

            let search1 = this.http.get(
                `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UCbFv_gbFN9UvNHJJjGavF6g`);                  
            
                return search1

            })

          .map(res => {
            //   let solo_zani = [];
             
            //   for (let item of res.json().items) {
            //       let array_edi = ['UCbFv_gbFN9UvNHJJjGavF6g', 'UCofo3ZNdYI5CqNgmMyF_7Cw', 'UCA1t5LNIyfmXZqGuUaY2oww',  ]       

            //     if (array_edi.includes(item.snippet.channelId)) {
            //         solo_zani.push(item);
            //     }

            //   }
            // this.boxService.nextPage = res.json().nextPageToken;

            // console.log('YouTube1', res.json().items, 'Page: ', res.json().pageInfo, res.json().nextPageToken, this.boxService.nextPage);
            // // return res.json().items
            // console.log('solo_zani1: ', solo_zani);
            // console.log('Zanichelli', res.json().items);
            return res.json().items
                  })
            .subscribe(response => {
                    for (let item of response) {
                        // console.log(item.snippet.description);
                        if ((item.snippet.description.search(this.searchForm.controls.search.value) != -1) || (item.snippet.title.search(this.searchForm.controls.search.value) != -1)) {this.resultsSum.push(item)}
                        // else {
                        //     this.resultsSum_NO.push(item)
                        // }
                    }
                    // let results_FilterSearch = this.resultsSum.filter(item => {
                    //     item.snippet.description.search(this.searchForm.controls.search.value)
                    // })
                    // this.resultsSum.concat(this.resultsSum_NO)
                    // console.log('Outside this.resultsBis_1: ', this.resultsSum);
    
                })

           

    //per testare merge forkjoin di due Observable

    // let resultsBis_1 = this.http.get(
    //                  `${API_URL}?q=${this.searchForm.controls.search.value}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UCbFv_gbFN9UvNHJJjGavF6g`).map(res => res.json());
    // let resultsBis_2 = this.http.get(`${API_URL}?q=${this.searchForm.controls.search.value}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UCofo3ZNdYI5CqNgmMyF_7Cw`).map(res => res.json());


    //         Observable.forkJoin(resultsBis_1, resultsBis_2).subscribe(results => {
    //             // results[0] is our character
    //             // results[1] is our character homeworld
    //             console.log('Observable', results);
    //             this.resultsBis_1 = resultsBis_1
    //             return this.resultsBis_1
    //           });

//per testare merge forkjoin di due Observable
     
            
            this.resultsBis_2 = this.searchForm.controls.search.valueChanges
              .filter(value => value.length > 4)
              .debounceTime(500)
              //use distictUntilChanged: Only emit when the current value is different than the last.
              .distinctUntilChanged()
              //use Switchmap: it works perfect for scenarios like typeaheads
              //where you are no longer concerned with the response of the previous request when a new input arrives.

              .switchMap(searchTerm => {
             
                
                let search2 = this.http.get(
                    `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UCofo3ZNdYI5CqNgmMyF_7Cw`)

            
               return search2
                })

              .map(res => {
                // console.log('Mondadori', res.json().items);

            //   let solo_zani = [];
            //   console.log('In loop');
             
            //   for (let item of res.json().items) {
            //       let array_edi = ['UCbFv_gbFN9UvNHJJjGavF6g', 'UCofo3ZNdYI5CqNgmMyF_7Cw', 'UCA1t5LNIyfmXZqGuUaY2oww',  ]
              

            //         if (array_edi.includes(item.snippet.channelId)) {
            //             solo_zani.push(item);
            //         }
            //       }         

            //   if (res.json().items.length == 0) {
            //     this.boxService.nextPage = null;
            //     }
            //   else {
            //     this.boxService.nextPage = res.json().nextPageToken;       
            //         }

            //   console.log('YouTube2', res.json().items, 'Page: ', res.json().pageInfo, this.boxService.nextPage);
       
            //     // return res.json().items
            //     console.log('solo_zani2: ', solo_zani);
                
               return res.json().items
               
              })
            .subscribe(response => {
                for (let item of response) {
                    // console.log(item.snippet.description);
                    if ((item.snippet.description.search(this.searchForm.controls.search.value) != -1) || (item.snippet.title.search(this.searchForm.controls.search.value) != -1)) {this.resultsSum.push(item)}
                    // else {
                    //     this.resultsSum_NO.push(item)
                    // }
                    
                }
                // let results_FilterSearch = this.resultsSum.filter(item => {
                //     item.snippet.description.includes(this.searchForm.controls.search.value)
                // })
                // this.resultsSum.concat(this.resultsSum_NO)
                // console.log('Outside this.resultsBis_2: ', this.resultsSum);

            })

            this.resultsBis_3 = this.searchForm.controls.search.valueChanges
              .filter(value => value.length > 4)
              .debounceTime(500)
              //use distictUntilChanged: Only emit when the current value is different than the last.
              .distinctUntilChanged()
              //use Switchmap: it works perfect for scenarios like typeaheads
              //where you are no longer concerned with the response of the previous request when a new input arrives.

              .switchMap(searchTerm => {       
                
                let search2 = this.http.get(
                    `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UCA1t5LNIyfmXZqGuUaY2oww`)
 
               return search2
                })

              .map(res => {
                // console.log('Skuola', res.json().items);

            //   let solo_zani = [];
            //   console.log('In loop');
             
            //   for (let item of res.json().items) {
            //       let array_edi = ['UCbFv_gbFN9UvNHJJjGavF6g', 'UCofo3ZNdYI5CqNgmMyF_7Cw', 'UCA1t5LNIyfmXZqGuUaY2oww',  ]
              

            //         if (array_edi.includes(item.snippet.channelId)) {
            //             solo_zani.push(item);
            //         }
            //       }         

            //   if (res.json().items.length == 0) {
            //     this.boxService.nextPage = null;
            //     }
            //   else {
            //     this.boxService.nextPage = res.json().nextPageToken;       
            //         }

            //   console.log('YouTube2', res.json().items, 'Page: ', res.json().pageInfo, this.boxService.nextPage);
       
            //     // return res.json().items
            //     console.log('solo_zani2: ', solo_zani);
                
               return res.json().items
               
              })
            .subscribe(response => {
                for (let item of response) {
                    // console.log(item.snippet.description);
                    if ((item.snippet.description.search(this.searchForm.controls.search.value) != -1) || (item.snippet.title.search(this.searchForm.controls.search.value) != -1)) {this.resultsSum.push(item)}
                    // else {
                    //     this.resultsSum_NO.push(item)
                    // }
                    
                }
                // let results_FilterSearch = this.resultsSum.filter(item => {
                //     item.snippet.description.includes(this.searchForm.controls.search.value)
                // })
                // this.resultsSum.concat(this.resultsSum_NO)
                // console.log('Outside this.resultsBis_3: ', this.resultsSum);

            })


            this.resultsBis_4 = this.searchForm.controls.search.valueChanges
              .filter(value => value.length > 4)
              .debounceTime(500)
              //use distictUntilChanged: Only emit when the current value is different than the last.
              .distinctUntilChanged()
              //use Switchmap: it works perfect for scenarios like typeaheads
              //where you are no longer concerned with the response of the previous request when a new input arrives.

              .switchMap(searchTerm => {       
                
                let search2 = this.http.get(
                    `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UC8gOYnHAEY31dqrmYFX0tJg`)
 
               return search2
                })

              .map(res => {
                // console.log('Kha', res.json().items);

            //   let solo_zani = [];
            //   console.log('In loop');
             
            //   for (let item of res.json().items) {
            //       let array_edi = ['UCbFv_gbFN9UvNHJJjGavF6g', 'UCofo3ZNdYI5CqNgmMyF_7Cw', 'UCA1t5LNIyfmXZqGuUaY2oww',  ]
              

            //         if (array_edi.includes(item.snippet.channelId)) {
            //             solo_zani.push(item);
            //         }
            //       }         

            //   if (res.json().items.length == 0) {
            //     this.boxService.nextPage = null;
            //     }
            //   else {
            //     this.boxService.nextPage = res.json().nextPageToken;       
            //         }

            //   console.log('YouTube2', res.json().items, 'Page: ', res.json().pageInfo, this.boxService.nextPage);
       
            //     // return res.json().items
            //     console.log('solo_zani2: ', solo_zani);
                
               return res.json().items
               
              })
            .subscribe(response => {
                for (let item of response) {
                    // console.log(item.snippet.description);
                    if ((item.snippet.description.search(this.searchForm.controls.search.value) != -1) || (item.snippet.title.search(this.searchForm.controls.search.value) != -1)) {this.resultsSum.push(item)}
                    // else {
                    //     this.resultsSum_NO.push(item)
                    // }
                    
                }
                // let results_FilterSearch = this.resultsSum.filter(item => {
                //     item.snippet.description.includes(this.searchForm.controls.search.value)
                // })
                // this.resultsSum.concat(this.resultsSum_NO)
                // console.log('Outside this.resultsBis_4: ', this.resultsSum);

            })

            this.resultsBis_5 = this.searchForm.controls.search.valueChanges
            .filter(value => value.length > 4)
            .debounceTime(500)
            //use distictUntilChanged: Only emit when the current value is different than the last.
            .distinctUntilChanged()
            //use Switchmap: it works perfect for scenarios like typeaheads
            //where you are no longer concerned with the response of the previous request when a new input arrives.

            .switchMap(searchTerm => {       
              
              let search2 = this.http.get(
                  `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UCz0FXf3xffWcu4038J7k17w`)

             return search2
              })

            .map(res => {
            //   console.log('Studenti.it', res.json().items);
            
             return res.json().items
             
            })
          .subscribe(response => {
              for (let item of response) {
                //   console.log(item.snippet.description);
                  if ((item.snippet.description.search(this.searchForm.controls.search.value) != -1) || (item.snippet.title.search(this.searchForm.controls.search.value) != -1)) {this.resultsSum.push(item)}
                  
                  
              }
              
            //   console.log('Outside this.resultsBis_5: ', this.resultsSum);

          })


          this.resultsBis_7 = this.searchForm.controls.search.valueChanges
            .filter(value => value.length > 4)
            .debounceTime(500)
            //use distictUntilChanged: Only emit when the current value is different than the last.
            .distinctUntilChanged()
            //use Switchmap: it works perfect for scenarios like typeaheads
            //where you are no longer concerned with the response of the previous request when a new input arrives.

            .switchMap(searchTerm => {       
              
              let search2 = this.http.get(
                  `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UCZTPemJj_RULY9L_rnpGgEQ`)

             return search2
              })

            .map(res => {
            //   console.log('De Agostini', res.json().items);
            
             return res.json().items
             
            })
          .subscribe(response => {
              for (let item of response) {
                //   console.log(item.snippet.description);
                  if ((item.snippet.description.search(this.searchForm.controls.search.value) != -1) || (item.snippet.title.search(this.searchForm.controls.search.value) != -1)) {this.resultsSum.push(item)}
                  
                  
              }
              
            //   console.log('Outside this.resultsBis_6: ', this.resultsSum);

          })
            
          this.resultsBis_6 = this.searchForm.controls.search.valueChanges
          .filter(value => value.length > 4)
          .debounceTime(500)
          //use distictUntilChanged: Only emit when the current value is different than the last.
          .distinctUntilChanged()
          //use Switchmap: it works perfect for scenarios like typeaheads
          //where you are no longer concerned with the response of the previous request when a new input arrives.

          .switchMap(searchTerm => {       
            
            let search2 = this.http.get(
                `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&channelId=UCZTPemJj_RULY9L_rnpGgEQ`)

           return search2
            })

          .map(res => {
            // console.log('Treccani', res.json().items);
          
           return res.json().items
           
          })
        .subscribe(response => {
            for (let item of response) {
                // console.log(item.snippet.description);
                if ((item.snippet.description.search(this.searchForm.controls.search.value) != -1) || (item.snippet.title.search(this.searchForm.controls.search.value) != -1)) {this.resultsSum.push(item)}
                
                
            }
            
            // console.log('Outside this.resultsBis_7: ', this.resultsSum);

        })
            ////INIZIO
        //     this.resultsBis_3 = this.searchForm.controls.search.valueChanges
           
        //   .filter(value => value.length > 4)
        //   .debounceTime(500)
        //   //use distictUntilChanged: Only emit when the current value is different than the last.
        //   .distinctUntilChanged()
        //   //use Switchmap: it works perfect for scenarios like typeaheads
        //   //where you are no longer concerned with the response of the previous request when a new input arrives.

        //   .switchMap(searchTerm => {
        //     //    let search1 = this.http.get(
        //     //   `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=10&part=snippet&type=video&channelId=UCbFv_gbFN9UvNHJJjGavF6g`);
        //     console.log('this.nextPage', this.nextPage);
        //     let search3 = this.http.get(
        //         `${API_URL}?q=${searchTerm}&key=${API_KEY}&maxResults=50&part=snippet&type=video&relevanceLanguage=it&pageToken=CAIQAA`);   
                
        //         // CGQQAA`);        
             
        //        return search3

        //     })

        //   .map(res => {
        //       let solo_zani_bis = [];
             
        //       for (let item of res.json().items) {
        //           let array_edi = ['UCbFv_gbFN9UvNHJJjGavF6g', 'UCofo3ZNdYI5CqNgmMyF_7Cw', 'UCA1t5LNIyfmXZqGuUaY2oww',  ]       

        //         if (array_edi.includes(item.snippet.channelId)) {
        //             solo_zani_bis.push(item);
        //         }

        //       }
        //     console.log('YouTube3', res.json().items, 'Page: ', res.json().pageInfo, res.json().nextPageToken);

        //     this.nextPage = res.json().nextPageToken;
        //     // return res.json().items
        //     // console.log('solo_zani: ', solo_zani);
        //     console.log('solo_zani3: ', solo_zani_bis);
        //     return solo_zani_bis
        //   }
        //     );
            ////INIZIO
          
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
                
                // console.log('Quelli settati sono: ', key);

                if ((this.array_scuola.indexOf(key)) != -1) { 
                    this.search_scuola = this.search_scuola + '&'+ key;    
                    //  console.log('Key', key, this.search_scuola)    
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