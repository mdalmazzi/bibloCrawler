
import {Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";

import {PostLoginService} from "../post-login/post-login.service";
import {Word} from "../post-login/word.model";
import {ProgettoService} from "../progetto/progetto.service";


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

    start_word = 'fisica';
    start_scuola = 'all';
    start_risorsa = 'all';
    start_licenza = 'all'; 
    start_fonte = 'all';
    start_materia = 'all';
    //url_status: any;
    
        constructor(private boxService: PostLoginService, public route: ActivatedRoute, public router: Router, private  postLoginService: PostLoginService, private progettoService: ProgettoService) {

            //router.events.subscribe((url:any) => console.log(url));
            
            //console.log(router.url);  // to print only path eg:"/login"
            //this.url_status = router.url; 
           
           
    }

    OneditorModelChangeSEARCH(event: any) {
        
        this.search_word = event;
        
    
    }


    goProgetto() {
        document.getElementById('theme').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');

        this.router.navigate(['crawlers']);
        document.getElementById("validazione").classList.remove("active");
        document.getElementById("progetto").classList.toggle("active"); 
        document.getElementById("frontend").classList.remove("active");
    }

    goValidate() {
        document.getElementById('theme').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');

        this.router.navigate(['home/fisica']);
        document.getElementById("validazione").classList.toggle("active");
        document.getElementById("progetto").classList.remove("active"); 
        document.getElementById("frontend").classList.remove("active");
    }


    goFrontEnd() {
        // this.router.navigate(['esterno']);
 
        // this.router.navigate(['homef/fisica']);
        document.getElementById('theme').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css');

        
        this.router.navigate(['/home/'+ this.start_word + '/' + this.start_scuola + '/' + this.start_risorsa + '/' + this.start_fonte + '/' + this.start_materia + '/' + this.start_licenza]);

        document.getElementById("validazione").classList.remove("active");
        document.getElementById("progetto").classList.remove("active"); 
        document.getElementById("frontend").classList.toggle("active");
    }



    doSearch(search: string) {
        search = (search.replace(/<(?:.|\n)*?>/gm, '')).toLowerCase();

      
            } 

    ngOnInit() {
       
    }


}