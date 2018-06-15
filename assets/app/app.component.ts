import { Component } from '@angular/core';

import {PostLoginService} from "./post-login/post-login.service";
import {PostLoginServiceF} from "./post-loginf/post-login.service";
import { ProgettoService } from './progetto/progetto.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ PostLoginServiceF, PostLoginService, ProgettoService]
})
export class AppComponent {

}