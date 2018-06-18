import {Http, Response, Headers} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

import {Sito} from "./sito.model";
import {Progetto} from "./progetto.model";
import {Crawler} from "./crawler.model";



@Injectable()
export class ProgettoService {
    public siti: Sito[] = [];
    public progetti: Progetto[];
    public crawlers: Crawler[];
    public crawler: Crawler;

    // settato il progetto in uso da rivedere nome per progetto default
    //public progetto: Progetto = {name: 'progetto_massimo'};
    public progetto: Progetto;

    // private path_to_server: string = 'http://localhost:3000';
    private path_to_server: string = 'http://localhost:8880';

  
    constructor(private http: Http) {}

    getElencoSiti() {

        return this.http.get(this.path_to_server + '/infoprogetto/')
            .map((response: Response) => {
                const siti = response.json().obj;
               
                let transformedSiti: Sito[] = [];
                for (let sito of siti) {                   
                    transformedSiti.push(new Sito( sito.text, sito.tipologia, sito.licenza, sito.scuola, sito.lingua, sito.materia))
                }
                this.siti = transformedSiti;      
                return transformedSiti;
                
            })
             .catch((error: Response) => Observable.throw(error.json()));
    }

    getCrawlers() {
        
        return this.http.get(this.path_to_server + '/crawler/')
            .map((response: Response) => {
                const crawlers = response.json().obj;

                // console.log('response crawlers: ', crawlers);

                 let transformedCrawlers: Crawler[] = [];

                 for (let crawler of crawlers) {                   
                    transformedCrawlers.push(new Crawler(crawler.name, crawler.progetti))
                }

                for (let progetto of transformedCrawlers[0].progetti) {
                    this.progetti.push(progetto);
                }

                this.crawlers = transformedCrawlers;
                this.crawler = transformedCrawlers[0];
                // console.log('transformedCrawlers: ', transformedCrawlers);
                // console.log('this.progetti: ', this.progetti);
                
    
                return transformedCrawlers;
                
            })
             .catch((error: Response) => Observable.throw(error.json()));
    }


    getProgetto() {
        
        return this.http.get(this.path_to_server + '/infoprogetto/' + this.progetto)
            .map((response: Response) => {
                const progetti = response.json().obj;

                 let transformedProgetto: Progetto[] = [];

                 for (let progetto of progetti) {                   
                    transformedProgetto.push(new Progetto(progetto.name, progetto.sito, progetto.words))
                }
               
                //
                for (let sito of transformedProgetto[0].sito) {
                        this.siti.push(sito);
                }

                this.progetti = transformedProgetto;
                return transformedProgetto;
                
            })
             .catch((error: Response) => Observable.throw(error.json()));
    }

    addTodo(sito: Sito, progettoName: string) {
        
        const body = JSON.stringify(sito);
        
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.path_to_server + '/infoprogetto/' + progettoName , body, {headers: headers})
            .map((response: Response) => {
                
                const result = response.json();
                const sito = new Sito(result.obj.text, result.obj.tipologia, result.obj.licenza,  result.obj.scuola, result.obj.lingua,result.obj.materia);


                console.log('result', result);
                
                this.siti.push(sito);
                console.log('Elenco siti progetto: ', this.siti);
                this.progetti[0].sito.push(sito);
                console.log('Service progetto: ', this.progetti);
                
                return sito;

                
           })
            .catch((error: Response) => Observable.throw(error.json()));   
    }

    addProgetto(progetto: Progetto, crawler: Crawler) {
        
        const body = JSON.stringify(progetto);
        // console.log(body);
        // console.log('Add progetto: ', progetto)
        const headers = new Headers({'Content-Type': 'application/json'});
        
        return this.http.post(this.path_to_server + '/infoprogetto', body, {headers: headers})
            .map((response: Response) => {
                
                const result = response.json();
                // const progetto = new Progetto(result.obj.name);
                console.log('Result: ', result.obj._id);

                // this.updateCrawler(result.obj);
                // console.log(progetto);
                // return progetto;
                return result;
                
           })
            .catch((error: Response) => Observable.throw(error.json()));  

            // this.updateCrawler(risultato); 
    }


    addCrawler() {

        let crawlerNew = new Crawler('Biblò');
        
        const body = JSON.stringify(crawlerNew);
        
        // console.log(body);
        // console.log('Add progetto: ', progetto)
        const headers = new Headers({'Content-Type': 'application/json'});
        
        return this.http.post(this.path_to_server + '/crawler', body, {headers: headers})
            .map((response: Response) => {
                
                const result = response.json();
                // const progetto = new Progetto(result.obj.name);
                console.log('Result: ', result.obj._id);

                // this.updateCrawler(result.obj);
                // console.log(progetto);
                // return progetto;
                return result;
                
           })
            .catch((error: Response) => Observable.throw(error.json()));  

            // this.updateCrawler(risultato); 
    }
    
    onUpdate(sito: Sito, index_sito: string) {

        const body = JSON.stringify(sito);
        const headers = new Headers({'Content-Type': 'application/json'});


        return this.http.post(this.path_to_server + '/infoprogetto/' + index_sito, body, {headers: headers})
             .map((response: Response) => {
                 response.json();
                 console.log(`Progetto aggiornato su Crawler: ${JSON.stringify(response, undefined, 2)}`);
            })
             .catch((error: Response) => Observable.throw(error.json()));
    
    }

    updateCrawler(updateCrawler) {

        let crawler = this.crawlers[1];

     
        const body = JSON.stringify(crawler);
        // console.log('body: ', body);
        const headers = new Headers({'Content-Type': 'application/json'});
       

        return this.http.patch(this.path_to_server + '/crawler/' + updateCrawler, body, {headers: headers}) 
            .map((response: Response) => {

                const result = response.json();
                // const crawler = new Crawler(result.obj);
                console.log('Crawler Update: ', result);    
            
                // return crawler;
                return result;
            
           })
            .catch((error: Response) => Observable.throw(error.json()));   
        
    }

    //onUpdateWords(words: string[]) {
    onUpdateWords(progetto: Progetto) {

        const body = JSON.stringify(progetto);
        const headers = new Headers({'Content-Type': 'application/json'});
        
        console.log('progetto', progetto);

        return this.http.patch(this.path_to_server + '/infoprogetto', body, {headers: headers})
             .map((response: Response) => {
                 response.json();
                console.log(`Keywords aggiornate: ${JSON.stringify(response, undefined, 2)}`)
            })
             .catch((error: Response) => Observable.throw(error.json()));
             
    }

    onDelete(index_sito: string) {
        
    
        return this.http.delete(this.path_to_server + '/infoprogetto/' + index_sito)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    } 
    
}