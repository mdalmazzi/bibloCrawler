
import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router} from "@angular/router";


import {PostLoginService} from './post-login.service';
import {Word} from "./word.model";



@Component({
    selector: 'app-postlogin',
    templateUrl: './post-login.component.html',
    styleUrls: ['./post-login.component.css']
})


export class PostLoginComponent implements  OnInit {
    constructor(public router: Router, private sanitizer: DomSanitizer, public boxService: PostLoginService) {}
  
    @Input() word: Word;
    @Input() index_word: number;
    @Input() length_word: number;
    @Input() itemsPerPage: number;
    @Input() page: number;
   
    @Output() loadWord = new EventEmitter<any>();
   
    empty_string =''
    public trustedUrl;
    

    onNavigate_Dettaglio() {

        if (!this.page) {
            this.page = 1
        }

       this.boxService.page = this.page;
        
       this.boxService.index_word = this.index_word  + this.itemsPerPage *(this.page - 1);

       console.log('IndexWord', this.boxService.index_word, this.page, this.index_word);


       this.router.navigate(['dettaglio']);
        //this.loadWord.emit(this.word); */
        // document.getElementById('myModal').style.display = "block";
     }

     onNavigate_Input() {
        
               this.boxService.page = this.page;
                
               this.boxService.index_word = this.index_word  + this.itemsPerPage *(this.page - 1);
        
            //    console.log(this.boxService.index_word);

               this.router.navigate(['input']);
                //this.loadWord.emit(this.word); */
                // document.getElementById('myModal').style.display = "block";
             }

    

    ngOnInit() {
       /*  if (localStorage.getItem('userId') ==  this.box.userId) {
            this.boxService.editTitolo(this.box)
        } */
        
        this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.word.path);

        
        
      }

    belongsToUser() {
     /*    return localStorage.getItem('userId') ==  this.box.userId;
 */
    }

    

    ondeleteMappa(box) {
       
        /* this.boxService.deleteMappa(box)
        .subscribe(
            result => console.log(result)
        );  */     
    }

  
    callDeleteMappa() {

     
    }

   
}