
import {Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";

import {PostLoginService} from "../post-login/post-login.service";
import {Word} from "../post-login/word.model";
import { ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit{
    

    word: Word;
    words: Word[];

    private search_word: string = "";

    public number_titolo;
   
    header_home = false;
    //url_status: any;
    
        constructor(private boxService: PostLoginService, public route: ActivatedRoute, public router: Router, private  postLoginService: PostLoginService) {

            //router.events.subscribe((url:any) => console.log(url));
            
            //console.log(router.url);  // to print only path eg:"/login"
            //this.url_status = router.url; 
           
           
    }

    OneditorModelChangeSEARCH(event: any) {
        
        //this.doSearch(event);
        this.search_word = event;
        console.log(event)
    
    }

    submitSearch() {
        this.doSearch(this.search_word)
    }

    goProgetto() {
        this.router.navigate(['progetto/']);
    }

    goValidate() {
        this.router.navigate(['home/fisica']);
    }

    

    goFrontEnd() {
        this.router.navigate(['esterno']);
    }



    doSearch(search: string) {
        search = (search.replace(/<(?:.|\n)*?>/gm, '')).toLowerCase();

        //this.boxService.search_word = search;
        
        // if (search != "") {
        //     this.router.navigate(['home/' + search]); 
        // }
        
        /* this.boxService.getBoxes(search.replace(/<(?:.|\n)*?>/gm, ''))
        
                .subscribe(
                    (words: Word[]) => {
                        this.words = words;
          
                    }
                ); */      
            } 

    ngOnInit() {
       
    }




   

   

}