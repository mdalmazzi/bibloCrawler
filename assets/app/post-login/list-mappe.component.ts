import {Component, OnInit} from '@angular/core';
import {PostLoginService} from "./post-login.service";
import {ProgettoService} from "../progetto/progetto.service";
import {Progetto} from "../progetto/progetto.model";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';

import {Word} from "./word.model";


@Component({
    selector: 'app-listmappe',
    templateUrl: './list-mappe.component.html',
    styleUrls: ['./list-mappe.component.css']
})
export class ListMappeComponent implements  OnInit {
    constructor( public router: Router, private route: ActivatedRoute, private boxService: PostLoginService, public progettoService: ProgettoService) {
       
        this.route.params.subscribe (
            params => {

                // var search_word = params['id'].replace(/<(?:.|\n)*?>/gm, '');
                this.search_word = params['id']
                console.log('Search_word', this.search_word, params);
                this.doSearch(this.search_word)      
            }
        );
       
        this.progettoService.getProgetto()
        
            .subscribe(
                (progetto: Progetto) => {
                    this.progetti = progetto;
    
                    console.log('Elenco siti progetto: ', progetto);
                }
        );

        if (this.boxService.page != 1) {
            this.p = this.boxService.page
        }
    }
    
    public progetti: Progetto;
    public words: Word[] = [];

    public search_word: string; // inutilizzata

    public change_mouse: string;
    // paginazione
    p: number = 1;
    collection: any[] = this.words;  

// paginazione

    OnMouseEnter($event) {
        this.change_mouse = 'pointer'
    }

    OnMouseLeave($event) {
        this.change_mouse = 'default'
    }
    
    ngOnInit(){

        this.boxService.search_word = this.search_word;
        
        this.boxService.getBoxes(this.search_word)
            .subscribe(
                (words: Word[]) => {
                    this.words = words;      
                }
            ); 

        // console.log('Progetto Service')
        // this.progettoService.getProgetto()
        
        //     .subscribe(
        //         (progetto: Progetto) => {
        //             this.progetti = progetto;
    
        //             console.log('Elenco siti progetto: ', progetto);
        //         }
        // );
    }

    doSearch(search: string) {

       // this.router.navigate(['home/' + search]);
    
        if (search != "") {
       
            this.boxService.getBoxes(search)
        
                .subscribe(
                    (words: Word[]) => {
                        this.words = words;
                        console.log('search: ', search, this.words);
                    }
                );
        }
    }
}