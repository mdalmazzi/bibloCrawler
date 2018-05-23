import {Http, Response, Headers} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

import {Sito} from "./sito.model";
import {Progetto} from "./progetto.model";



@Injectable()
export class ProgettoService {
    public siti: Sito[] = [];
    public progetti: Progetto[] = [];
    
    //private path_to_server: string = 'http://localhost:4200';

    private path_to_server: string = 'http://192.168.1.139:4200';
  
    constructor(private http: Http) {}

    getElencoSiti() {

        return this.http.get(this.path_to_server + '/infoprogetto/')
            .map((response: Response) => {
                const siti = response.json().obj;
               
                let transformedSiti: Sito[] = [];
                for (let sito of siti) {                   
                    transformedSiti.push(new Sito( sito.text))
                }
                this.siti = transformedSiti;      
                return transformedSiti;
                
            })
             .catch((error: Response) => Observable.throw(error.json()));
    }


    getProgetto() {
        console.log('Service chiamata')
        return this.http.get(this.path_to_server + '/infoprogetto/' + 'progetto_massimo')
            .map((response: Response) => {
                const progetti = response.json().obj;

                 let transformedProgetto: Progetto[] = [];

                 for (let progetto of progetti) {                   
                    transformedProgetto.push(new Progetto(progetto.name, progetto.sito, progetto.words))
                }
               
                for (let sito of transformedProgetto[0].sito) {
                        this.siti.push(sito);
                }

                this.progetti = transformedProgetto;

                console.log('Service Elenco Progetti: ', this.progetti);           
                return transformedProgetto;
                
            })
             .catch((error: Response) => Observable.throw(error.json()));
    }

    addTodo(sito: Sito, progettoName: string) {
        
        const body = JSON.stringify(sito);
        // console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.path_to_server + '/infoprogetto/' + progettoName , body, {headers: headers})
            .map((response: Response) => {
                
                const result = response.json();
                const sito = new Sito(result.obj.text, result.obj.tipologia, result.obj.licenza,  result.obj.scuola, result.obj.lingua,result.obj.materia);
                
                this.siti.push(sito);
                console.log('Elenco siti progetto: ', this.siti);
                this.progetti[0].sito.push(sito);
                console.log('Service progetto: ', this.progetti);
                
                return sito;

                
           })
            .catch((error: Response) => Observable.throw(error.json()));   
    }

    addProgetto(progetto: Progetto) {
        
        const body = JSON.stringify(progetto);
        // console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.path_to_server + '/infoprogetto', body, {headers: headers})
            .map((response: Response) => {
                
                const result = response.json();
                const progetto = new Progetto(result.obj.name);
                
                // this.siti.push(sito);
                // console.log('Elenco siti progetto: ', this.siti);
                // this.progetti[0].sito.push(sito);
                // console.log('Service progetto: ', this.progetti);
                
                return progetto;

                
           })
            .catch((error: Response) => Observable.throw(error.json()));   
    }

    onUpdate(sito: Sito, index_sito: string) {

        const body = JSON.stringify(sito);
        const headers = new Headers({'Content-Type': 'application/json'});


        return this.http.patch(this.path_to_server + '/infoprogetto/' + index_sito, body, {headers: headers})
             .map((response: Response) => {
                 response.json();
                 alert(`Fonte progetto aggiornato: ${JSON.stringify(response, undefined, 2)}`);
            })
             .catch((error: Response) => Observable.throw(error.json()));
    
    }

    //onUpdateWords(words: string[]) {
    onUpdateWords(progetto: Progetto) {

        const body = JSON.stringify(progetto);
        const headers = new Headers({'Content-Type': 'application/json'});


        return this.http.patch(this.path_to_server + '/infoprogetto', body, {headers: headers})
             .map((response: Response) => {
                 response.json();
                alert(`Keywords aggiornate: ${JSON.stringify(response, undefined, 2)}`)})
             .catch((error: Response) => Observable.throw(error.json()));
             
    }

    onDelete(index_sito: string) {
        
    
        return this.http.delete(this.path_to_server + '/infoprogetto/' + index_sito)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    } 
    
}