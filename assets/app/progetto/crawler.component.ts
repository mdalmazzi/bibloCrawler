import {Component, OnInit} from '@angular/core';

import {ProgettoService} from "./progetto.service";
import {Progetto} from "./progetto.model";
import {Crawler} from "./crawler.model";

@Component({
    selector: 'app-crawler',
    templateUrl: './crawler.component.html',
    styleUrls: ['./crawler.component.css']
})
export class CrawlerComponent {
    constructor(private progettoService: ProgettoService) {}

    public progetti: Progetto[] = [];
    public progetto: Progetto;

    public crawlers: Crawler[];
    public crawler: Crawler;

    placeholderVar = "Scrivi il nome del progetto qui..."
    nomeProgetto: string = '';


    OneditorModelAddProgetto(event) {
        this.nomeProgetto = event;
    }

    selectProgetto(event:MouseEvent) {
       
        document.getElementById("myDropdownCrawler").classList.toggle("show");  
    }


    setColorProgetto(progettoName: string, i: number) {
        // console.log(progettoName, i);
        if (this.progetto.name === this.progetti[i].name) {
        
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    setCrawler( i: number) {
        
        this.crawler = this.crawlers[i];
        this.progettoService.crawler = this.crawler;
        // this.progettoService.progetto = this.progetti[i];

        this.progettoService.progetti = this.crawler.progetti;
        this.progettoService.progetto = this.crawler.progetti[0];

        this.progetti = this.crawler.progetti;
        this.progetto = this.crawler.progetti[0];

        // console.log('this.progettoService.crawler: ', this.progettoService.crawler);
    }

    closeProgetto(event) {
        
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
    

    ngOnInit(){
        
    

        this.progettoService.getCrawlers()
        
        .subscribe(
            (crawlers: Crawler[]) => {
                this.crawlers = crawlers;
                this.progetto = this.crawlers[1].progetti[0];
                this.progetti = this.crawlers[1].progetti;
                this.progettoService.progetti = this.progetti;
                this.progettoService.progetto = this.progetti[1];
            
            }
        );

        
      
     }

     addProgetto() {

        const newProgetto = new Progetto(this.nomeProgetto.replace(/<(?:.|\n)*?>/gm, ''));

        this.progetti.push(newProgetto);
        
        this.progettoService.addProgetto(newProgetto, this.crawlers[1])
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );

        this.nomeProgetto = '';

     }

     addCrawler() {
        this.progettoService.addCrawler()
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
     }

    

   
}