import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from "@angular/router";

import {Word} from "./word.model";
import {PostLoginService} from './post-login.service';



@Component({
    selector: 'app-dettaglio',
    templateUrl: './dettaglio-word.component.html'
    
})
export class DettaglioWordComponent implements  OnInit {
    constructor(private boxService: PostLoginService, private sanitizer: DomSanitizer, public router: Router) {}

    public word: Word;
    private livello_scolastico: string;
    public trustedUrl;
    placeholderVar = '';


    ngOnInit() {
        
        console.log(this.boxService.words);
       this.word = this.boxService.words[this.boxService.index_word];

       this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.word.path);
       }

    onNavigate_Home() {
        this.onSubmit_3();
        this.router.navigate(['home/' + this.word.word]);
        //this.loadWord.emit(this.word); */
        // document.getElementById('myModal').style.display = "block";
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

        console.log(this.word);

        // this.word.images[0] = this.word.images[0].replace(/<(?:.|\n)*?>/gm, '');

        if (this.word.titolo) {
            this.word.titolo = this.word.titolo.replace(/<(?:.|\n)*?>/gm, '');
        }

        if (this.word.meta1.content) {
            this.word.meta1.content= this.word.meta1.content.replace(/<(?:.|\n)*?>/gm, '');
        }

        if (this.word.meta2.content) {
            this.word.meta2.content = this.word.meta2.content.replace(/<(?:.|\n)*?>/gm, '');
        }

        if (this.word.meta3.content) {
            this.word.meta3.content = this.word.meta3.content.replace(/<(?:.|\n)*?>/gm, '');
        }
        
        if (this.word.type) {
            this.word.type = this.word.type.replace(/<(?:.|\n)*?>/gm, '');
        }
      
        if (this.word.licenza) {
            this.word.licenza = this.word.licenza.replace(/<(?:.|\n)*?>/gm, '');
        }
        
        // Da gestire le seguenti
        
        
        // this.word.scuola = this.word.scuola.replace(/<(?:.|\n)*?>/gm, '');
        // this.word.quality = this.word.quality.replace(/<(?:.|\n)*?>/gm, '');
        
        
       
           if (this.word) {
            // this.word.controllato = true;
            //    //edit - NO siamo su Medium
               //   this.box.content = form.value.content;
               this.boxService.updateBox(this.word)
                   .subscribe(
                       result => console.log(result)
   
                   );
               //        this.box = null;
   
   
           } else {
              // crea nuova parola

/* 
              const box = new Box(form.value.content, 'Testo Box',  'Massimo', 0, {top: 0, bottom: 0, left: 0, right: 0, height: 80, width: 200}, false, this.id_mappa, '#B4B4B4' );
              this.boxService.addBox(box)
                  .subscribe(
                      data => console.log(data),
                      error => console.error(error)
                  ); */
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