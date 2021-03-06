
import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router} from "@angular/router";


import {PostLoginServiceF} from './post-login.service';
import {Word} from "./word.model";
import {TruncatePipe} from './truncate';

// import {getVideoId} from 'get-video-id';


@Component({
    selector: 'app-postlogin-f',
    
    templateUrl: './post-login.component.html',
    styleUrls: ['./post-login.component.css']
})
export class PostLoginComponentF implements  OnInit {
    constructor(public router: Router, private sanitizer: DomSanitizer, private boxService: PostLoginServiceF) {    
    }
  
    // Settaggi da spostare fuori in un init globale
    // private image_path = "http://localhost:8880/img/";
    private image_path = "http://localhost:3000/img/";
    // Settaggi da spostare fuori in un init globale


    @Input() word: Word;
    @Input() index_word: number;
    @Input() length_word: number;
    @Input() itemsPerPage: number;
    @Input() page: number;
    width: any;
    height: any;
    imageUri: any;
    onthefly: boolean;
    
   
    @Output() loadWord = new EventEmitter<any>();
   
    empty_string = '';
    public trustedUrl;
    private trustedVideo;
    private image_size;
    public count_image = 0;
   

   getLocation(href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
    };

    handleImageLoad(event): void {
        this.width = event.target.width;
        this.height = event.target.height;

       
        
      }
      
      youtube_id_from_url(url) {
        var id = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        
        if(url[2] !== undefined) {
          id = url[2].split(/[^0-9a-z_]/i);
          id = id[0];
        } else {
          id = url;
        }
        return id;

      }


      extractVideoID(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if ( match && match[7].length == 11 ){
            return match[7];
        }else{
            return this.youtube_id_from_url(url)
            //alert("Could not extract video ID.");
        }
    }

    onNavigate_Dettaglio() {

       this.boxService.page = this.page;
        
       this.boxService.index_word = this.index_word  + this.itemsPerPage *(this.page - 1);

 

       this.router.navigate(['dettaglio']);
       
     }

     searchStringInArray (str, strArray) {
       // let index_img: number[] = [];
        for (var j=0; j<strArray.length; j++) {
            //console.log(strArray[j]);
            if (strArray[j] != null) {
                //console.log(strArray[j])
                if (strArray[j].match(/http/g)) {
                    //index_img.push(j)
                   // if (j == (strArray.length -1)) {
                    //    console.log(index_img);
                     //   return index_img
                        
                    //}
                    return j;              
                }
            }   
        } 
        return -1;
    }


    searchStringInArray_mod (str, strArray) {
         let index_img: number[] = [];
         for (var j=0; j<strArray.length; j++) {
             
             if (strArray[j] != null) {
                 //console.log(strArray[j])
                 if (strArray[j].match(/http/g)) {
                     index_img.push(j);
                     //console.log(index_img);
                     if (j == (strArray.length -1)) {
                         
                         return index_img
                         
                     }
                     //return j;              
                 }
             }   
         } 
         return -1;
     }

    searchStringInArray_bis (str, strArray) {
        for (var j=0; j<strArray.length; j++) {
            if (strArray[j].match(/images/g)) return j;
        }
        
        return -1;
    }

    checkImageSize() 
        {
            var image = new Image();
           image.addEventListener('load', (e) => this.handleImageLoad(e));
           image.src = this.imageUri;
           //this.image_size = image.naturalWidth;

           if ((image.naturalWidth == 0) && this.count_image <= this.word.images.length)
           {
            this.count_image = this.count_image +1
            
            this.imageUri = this.word.images[this.count_image];
          
           }

           return this.image_size = image.naturalWidth;
        }

    ImageExist(url) 
        {
           var img = new Image();
           img.src = url;
           return img.height != 0;
           
        }

    ngOnInit() {

        let url_image = this.image_path + this.word.wordId + '.png';

        if (this.word.images) {
            this.imageUri = this.word.images[0];
        }
       
        if (this.ImageExist(url_image)) 
        {
            this.trustedVideo = this.sanitizer.bypassSecurityTrustUrl(url_image);
            
            if (this.imageUri != this.word.images[0]) {
                this.imageUri = url_image;
            }
            
        }

        if (this.word.images) {
            let url_image = this.image_path + this.word.wordId + '.png';

            
            if (this.ImageExist(url_image)) {
                let j = this.searchStringInArray("http", this.word.images);
                this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.word.path);
                
                if (j ==-1) 
            
                    {
                        this.trustedVideo = this.sanitizer.bypassSecurityTrustUrl(url_image);
                        
                        this.imageUri = url_image;
                    }
                    else 
                    {   
                       
                    
                     }
                }

        if ((this.word.type=='image/gif') || (this.word.type=='image/jpeg') || (this.word.type=='image/png')) 
        {
            this.imageUri = this.word.path;
        }
        
        this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.word.path);
       
       
       
        var image = new Image();
       image.addEventListener('load', (e) => this.handleImageLoad(e));
       
       
       image.src = this.imageUri;
       
       this.image_size = image.naturalWidth; 
        
    }
       


       if (this.word.controllato) {
            this.onthefly = true;
       } else {
            this.onthefly = false;
           
       }

       if (this.word.meta1.content) {}
       else
       {
        this.word.meta1.content = this.word.titolo;
       }

       if (this.word.type == "video") 
            {
           

                let YouTubeId = this.extractVideoID(this.word.path)

                this.imageUri = "https://img.youtube.com/vi/" + YouTubeId+ '/default.jpg'; 
                                    
            }

       
       
        
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

       /*  this.boxService.arrayCountMappa(this.box.numero_mappa);
         
        while(this.boxService.indexBoxes.length) {
            let index = this.boxService.indexBoxes.pop();
            
            this.ondeleteMappa(this.boxService.boxes[index]);
            this.boxService.boxes.splice(index, 1);
            
        }      */ 
    }

   /*  onSubmit_3() {
      
        
         if (this.box) {
             //edit
             //     this.box.content = form.value.content;
             this.boxService.updateBox(this.box)
                 .subscribe(
                     result => console.log(result)
 
                 );
             //        this.box = null;
 
 
         } else {
             // create
            // const box = new Box('Box  Mappa', 'Testo Box', localStorage.getItem('userId'), {top: 0, bottom: 0, left: 0, right: 0, height: 120, width: 250}, false)
             const box = new Box('Box  Mappa', 'Testo Box', 'Massimo',0, {top: 0, bottom: 0, left: 0, right: 0, height: 120, width: 250}, false, 1, '#B4B4B4' )
                this.boxService.addBox(box)
                 .subscribe(
                     data => console.log(data),
                     error => console.error(error)
                 );
         }
 
         //       form.resetForm();
     }

    onupdateMappa(box) {
        
         this.boxService.updateBox(box)
         .subscribe(
             result => console.log(result)
         );      
     }
   */
}