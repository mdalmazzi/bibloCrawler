import {Component, OnInit} from '@angular/core';

import {ProgettoService} from "./progetto.service";
import {Progetto} from "./progetto.model";
import {Crawler} from "./crawler.model";
import {Sito} from "./sito.model";

@Component({
    selector: 'app-crawler',
    templateUrl: './crawler.component.html',
    styleUrls: ['./crawler.component.css']
})

export class CrawlerComponent {
    constructor(private progettoService: ProgettoService) {
     
    }

    public progetti: Progetto[] = [];
    public progetto: Progetto = null;

    public crawlers: Crawler[];
    public crawler: Crawler;

    placeholderVar = "Scrivi il nome del crawler qui..."
    nomeCrawler: string = '';
    nomeProgetto: string = '';



    OneditorModelAddCrawler(event) {
        this.nomeCrawler = event;
    }

    OneditorModelAddProgetto(event) {
        this.nomeProgetto = event;
    }

    selectCrawler(event:MouseEvent) {
           
        console.log('Select Crawler');
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

    setCrawler(i: number) {
        
        console.log('Set Crawler');

        this.crawler = this.crawlers[i];
        this.progettoService.crawler = this.crawler;

        console.log('Crawler: ', this.crawler);
        // this.progettoService.progetto = this.progetti[i];

        if (this.crawler) {
            if (this.crawler.progetti) 
            {
                this.progetto = this.crawler.progetti[0];
                this.progetti = this.crawler.progetti;
                this.progettoService.progetti = this.progetti;
                this.progettoService.progetto = this.progetti[0];


                // this.progettoService.progetti = this.crawler.progetti;
                // this.progettoService.progetto = this.crawler.progetti[0];

                // this.progetti = this.crawler.progetti;
                // this.progetto = this.crawler.progetti[0];
            }   
            else {
                //
                console.log('Non ho progetti');
                this.progetto = {name: ''};
                this.progetti = [];
                this.progettoService.progetti = [];
                this.progettoService.progetto = {name: ''};
                this.progetto.words = [];
            }    
            
            // if (this.crawler.progetti[0].words.length == 0) {
            //     this.progetto.words = []
            if (this.progetto.words.length == 0) {
                    this.progetto.words = []
                
            }

            if (this.progetto.name == '') {
                this.progetto.words = [];
            }
        }
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
                this.crawler = crawlers[0];
                    
                console.log('Crawlers: ', crawlers);

                if (this.crawlers) {
                    if (this.crawlers[0].progetti.length > 0) 
                    {
                        this.progetto = this.crawlers[0].progetti[0];
                        this.progetti = this.crawlers[0].progetti;
                        this.progettoService.progetti = this.progetti;
                        this.progettoService.progetto = this.progetti[0];
                    }   
                    else {
                        this.progetto = new Progetto('');
                        this.progetti = [];
                        this.progettoService.progetti = [];
                        this.progettoService.progetto = new Progetto('');
                        this.progetto.words = [];
                    }    
                    
                    if (this.crawlers[0].progetti[0].words.length == 0) {
                        this.progetto.words = []

                    }
                }       
            }
        );
     }

     addProgetto() {

        const newProgetto = new Progetto(this.nomeProgetto.replace(/<(?:.|\n)*?>/gm, ''));

        this.progetti.push(newProgetto);
        
        this.progettoService.addProgetto(newProgetto, this.crawler)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );

        this.nomeProgetto = '';

     }

     addCrawler() {
        const newsito = new Sito('');
        const newProgetto = new Progetto('', [newsito], []);


        const newCrawler = new Crawler(this.nomeCrawler.replace(/<(?:.|\n)*?>/gm, ''), [newProgetto]);

        this.crawlers.push(newCrawler);

        this.progettoService.addCrawler(newCrawler)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
     }

    

   
}