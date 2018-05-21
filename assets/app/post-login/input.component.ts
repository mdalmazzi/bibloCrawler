import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from "@angular/router";

import {Word} from "./word.model";
import {PostLoginService} from './post-login.service';



@Component({
    selector: 'app-input',
    templateUrl: './input.component.html'
    
})
export class InputWordComponent implements  OnInit {
    constructor(private boxService: PostLoginService, private sanitizer: DomSanitizer, public router: Router) {}

    public word: Word;
    private livello_scolastico: string;
    public trustedUrl;
    placeholderVar = '';

    ngOnInit() {
       this.word = this.boxService.words[this.boxService.index_word];

       this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.word.path);
       }

    onNavigate_Home() {
        this.onSubmit_3();
      //  this.router.navigate(['home/' + this.word.word]);
        //this.loadWord.emit(this.word); */
        // document.getElementById('myModal').style.display = "block";
     }

     OneditorModelChangeWord(event) {         
        this.word.word = event;        
     }

     OneditorModelChangePath(event) {         
        this.word.path = event;        
     }

     OneditorModelChangeTitolo(event) {         
        this.word.titolo = event;        
     }

     OneditorModelChangeMeta1(event) {         
        this.word.meta1.content = event;        
     }

     OneditorModelChangeMeta2(event) {         
        this.word.meta2.content = event;        
     }

     OneditorModelChangeMeta3(event) {         
        this.word.meta3.content = event;        
     }

     OneditorModelChangeType(event) {         
        this.word.type = event;        
     }

     OneditorModelChangeLicenza(event) {         
        this.word.licenza = event;        
     }

     OneditorModelChangeScuola(event) {         
        this.word.scuola = event;        
     }

     OneditorModelChangeQuality(event) {         
        this.word.quality = event;        
     }

     OneditorModelChangeIMG(event) {   
        if (this.word.images.length != 0) {
            
            this.word.images[0] = event }
        else {
            this.word.images.push(event)
          
        }   
        this.word.images[0] = this.word.images[0].replace(/<(?:.|\n)*?>/gm, '');
     }

     onSubmit_3() {

        this.word.word = this.word.word.replace(/<(?:.|\n)*?>/gm, '');

        this.word.path = this.word.path.replace(/<(?:.|\n)*?>/gm, '');
        this.word.controllato = false;
        this.word.titolo = this.word.titolo.replace(/<(?:.|\n)*?>/gm, '');
        this.word.meta1.content= this.word.meta1.content.replace(/<(?:.|\n)*?>/gm, '');
        this.word.meta2.content = this.word.meta2.content.replace(/<(?:.|\n)*?>/gm, '');
        this.word.meta3.content = this.word.meta3.content.replace(/<(?:.|\n)*?>/gm, '');
        this.word.type = this.word.type.replace(/<(?:.|\n)*?>/gm, '');
        this.word.licenza = this.word.licenza.replace(/<(?:.|\n)*?>/gm, '');
        this.word.scuola = this.word.scuola.replace(/<(?:.|\n)*?>/gm, '');
        this.word.quality = this.word.quality.replace(/<(?:.|\n)*?>/gm, '');
        
        
       
           if (this.word) {
        //     this.word.controllato = true;
        //        //edit - NO siamo su Medium
        //        //   this.box.content = form.value.content;
        //        this.boxService.updateBox(this.word)
        //            .subscribe(
        //                result => console.log(result)
   
        //            );
        //        //        this.box = null;
   
   
        //    } else {
              // crea nuova parola


            console.log('Creazione')
             
              /* const word = new Word(this.word.word, this.word.titolo, this.word.path, this.word.meta1, this.word.meta2, this.word.meta3, this.word.images, this.word.type, this.word.wordId, this.word.licenza, this.word.scuola, this.word.controllato, this.word.quality); */

            //   const word = {word: this.word.word, titolo: this.word.titolo, path: this.word.path, meta1: this.word.meta1, meta2: this.word.meta2, meta3: this.word.meta3, images: this.word.images, type: this.word.type, licenza: this.word.licenza, scuola: this.word.scuola, controllato: this.word.controllato, quality: this.word.quality};

            /*  const word = new Word(this.word.word, this.word.titolo, this.word.path, this.word.meta1, this.word.meta2, this.word.meta3, this.word.images, this.word.type,  this.word.licenza, this.word.scuola, this.word.quality); */

            //   console.log(word)


            //   this.boxService.addBox(word)
            //       .subscribe(
            //           data => console.log(data),
            //           error => console.error(error)
            //       ); 
           }
   
         
       }

       ondeleteWord() {
           this.boxService.deleteBox(this.word)
                .subscribe(
                result => console.log(result)
        );     
        this.router.navigate(['home/' + this.word.word]);

       }


    
}