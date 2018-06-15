import {Component, OnInit, Input} from '@angular/core';

import {ProgettoService} from "./progetto.service";
import {Progetto} from "./progetto.model";
import {Crawler} from "./crawler.model";
import {Sito} from './sito.model'
import { empty } from 'rxjs/Observer';

@Component({
    selector: 'app-progetto',
    templateUrl: './progetto.component.html',
    styleUrls: ['./progetto.component.css']
})
export class ProgettoComponent implements OnInit{
    constructor(private progettoService: ProgettoService) {}

    // public progetti: Progetto[] = [];
    // public progetto: Progetto;

    @Input() progetto: Progetto;
    @Input() progetti: Progetto[];

    // progetto: Progetto;
    // progetti: Progetto[];

    // public crawlers: Crawler[];
    @Input() crawlers: Crawler[];

    placeholderVar = "Scrivi il nome del sotto-progetto qui..."
    nomeProgetto: string = '';


    OneditorModelAddProgetto(event) {
        this.nomeProgetto = event;
    }

    selectProgetto(event:MouseEvent) {
       
        document.getElementById("myDropdownProgetti").classList.toggle("show");  
    }


    setColorProgetto(progettoName: string, i: number) {
        // console.log(progettoName, i);
        if (this.progetto.name === this.progetti[i].name) {
        
            return '#ddd'
        } else {
            return '#f1f1f1'
        }
    }

    setProgetto(i: number) {
        
        this.progetto = this.progetti[i];
        this.progettoService.progetto = this.progetti[i];
        console.log(this.progetto, this.progettoService.progetto)
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

        // Non leggiamo qua ma già in crawler
        
        // this.progettoService.getProgetto()
        
        // .subscribe(
        //     (progetto: Progetto[]) => {
        //         this.progetti = progetto;
        //         this.progetto = this.progetti[0]
        //         console.log('Elenco progetti: ', progetto);
        //     }
        // );

        // this.progettoService.getCrawlers()
        
        // .subscribe(
        //     (crawlers: Crawler[]) => {
        //         this.crawlers = crawlers;
        //         this.progetto = this.crawlers[1].progetti[0];
        //         this.progetti = this.crawlers[1].progetti;
        //         console.log('Elenco Crawlers: ', this.crawlers, this.progetti, this.progetto);
        //     }
        // );
      
     }

     addProgetto() {
        
        const newSito = new Sito('','');
        // console.log('crawlers: ', this.crawlers)
        const newProgetto = new Progetto(this.nomeProgetto.replace(/<(?:.|\n)*?>/gm, ''), [newSito], []);
        


        this.progetti.push(newProgetto);
        
        this.progettoService.addProgetto(newProgetto, this.crawlers[1])
        .subscribe(
            data => {
           
                data;
                this.progettoService.updateCrawler(data.obj._id)
                    .subscribe(
                        data => {
                            console.log('UpdateCrawler',data);
                            // this.progetti.push( data);
                        },
                        error => console.error(error)
                        
                    )
            },
            error => console.error(error)
        );

        this.nomeProgetto = '';

     }

   
}