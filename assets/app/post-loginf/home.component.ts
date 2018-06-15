import {Component} from '@angular/core';


@Component({
    selector: 'app-dettaglio-f',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponentF {
    constructor() {}

    ngOnInit() {
        document.getElementById('theme').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css');
      }
    
}