import {Word} from "./word.model";
import {Http, Response, Headers} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";


@Injectable()
export class PostLoginService {
    public words: Word[] = [];
    public index_word;
    public search_word: string;
    public page
    
   
    //private path_to_server: string = 'http://dealab-env.cpr43rbhcm.us-west-2.elasticbeanstalk.com';

    //private path_to_server: string = 'http://localhost:4200';

    private path_to_server: string = 'http://192.168.1.128:4200';
  
    constructor(private http: Http) {}

    addBox(word: Word) {
        
                const body = JSON.stringify(word);
               // console.log(body);
                const headers = new Headers({'Content-Type': 'application/json'});
                const token = localStorage.getItem('token')
                    ? '?token=' + localStorage.getItem('token')
                    : '';
                //console.log(token,'token');
                return this.http.post(this.path_to_server + '/input' + token, body, {headers: headers})
                    .map((response: Response) => {
                        const result = response.json();
                        const word = new Word(result.obj.word, result.obj.titolo, result.obj.path, result.obj.meta1, result.obj.meta2,result.obj.meta3, result.obj.images, result.obj.type, result.obj._id,result.obj.licenza, result.obj.scuola, result.obj.controllato, result.obj.quality );
                        
                        this.words.push(word);
                        return word;
                   })
                    .catch((error: Response) => Observable.throw(error.json()));
            }

    getWordNum() {
        return this.words.length;
    }

    getBoxes(word: string) {

        return this.http.get(this.path_to_server + '/home/' + word)
            .map((response: Response) => {
                const words = response.json().obj;
                let transformedWords: Word[] = [];
                for (let word of words) {
                    // transformedWords.push(new Word(word.word, word.titolo, word.body, word.path, word.meta1, word.meta2, word.meta3, word.images, word.type, word._id, word.licenza, word.scuola, word.controllato, word.quality))}

                    transformedWords.push(new Word(word.word, word.titolo, word.body, word.path, word.meta1, word.meta2, word.meta3, word.images, word.type, word._id, word.licenza, word.scuola, word.controllato, word.quality))}


                this.words = transformedWords;
                console.log(this.words);
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