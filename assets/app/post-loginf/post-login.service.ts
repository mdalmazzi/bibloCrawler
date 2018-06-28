import {Word} from "./word.model";
import {Http, Response, Headers} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";


@Injectable()
export class PostLoginServiceF {
    public words: Word[] = [];
    public index_word;
    public search_word: string;
    public search_scuola: string;
    public page;


    private path_to_server: string = 'http://localhost:3000';
    // private path_to_server: string = 'http://localhost:8880';
  
    constructor(private http: Http) {}

    getWordNum() {
        return this.words.length;
    }

    getBoxes(word: string, scuola: string, risorsa: string, fonte: string, materia: string, licenza: string) {


        return this.http.get(this.path_to_server + '/home-info/' + word + '/' + scuola + '/' + risorsa + '/' + fonte + '/' + materia + '/' + licenza)
            .map((response: Response) => {
                const words = response.json().obj;
               
                let transformedWords: Word[] = [];
                for (let word of words) {

                    transformedWords.push(new Word(word.word, word.titolo, word.body, word.path, word.meta1, word.meta2, word.meta3, word.images, word.type, word._id, word.licenza, word.scuola, word.controllato, word.quality))}


                    
                    // transformedWords.push(new Word(word.word, word.titolo,  word.path, word.meta1, word.meta2, word.meta3, word.images, word.type,  word.licenza, word.scuola[0]))}

                this.words = transformedWords;
                // console.log(this.words);
                
                return transformedWords;
            })
             .catch((error: Response) => Observable.throw(error.json()));
             

    }

    
     updateBox(word: Word) {
        const body = JSON.stringify(word);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
       // return this.http.patch(this.path_to_server + '/home/' + word.wordId + token, body, {headers: headers})
       return this.http.patch(this.path_to_server + '/dettaglio/' + word.wordId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));

    }

    

    deleteBox(word: Word) {
        
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(this.path_to_server + '/dettaglio/' + word.wordId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));


    } 
   /*  

    arrayCountMappa(num_mappa: number) {
        for (var i=0; i<(this.boxes.length); i++) {
            if (this.boxes[i].numero_mappa == num_mappa) {
                this.indexBoxes.push(i);
            }
            console.log(this.indexBoxes);
        }
    }

    deleteMappa(box: Box) {

        
       //this.boxes.splice(this.boxes.indexOf(box), 1);
        
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(this.path_to_server + '/home/' + box.boxId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));


    }
 */ 
    
}