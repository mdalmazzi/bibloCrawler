import {RouterModule, Routes} from "@angular/router";

import {AuthenticationComponent} from "./user/authentication.component";
import {USER_ROUTES} from "./user/user.routes";

import {HomeComponent} from "./post-login/home.component";
import {InputWordComponent} from "./post-login/input.component";
import {DettaglioWordComponent} from "./post-login/dettaglio-word.component";
import {ProgettoComponent} from "./progetto/progetto.component";
import {ExternalPageComponent} from "./post-login/frontend.component";
import {CrawlerComponent} from "./progetto/crawler.component";

import {HomeComponentF} from "./post-loginf/home.component";
import {YouTubeComponent} from "./youtube/youtube.component";

const APP_ROUTES: Routes = [
    
   {path: '', redirectTo: '/auth', pathMatch: 'full'},
    //{path: '', redirectTo: '/progetto', pathMatch: 'full'},
    //{path: '', redirectTo: '/home/acqua', pathMatch: 'full'},
 
    {path: 'auth', component: AuthenticationComponent, children: USER_ROUTES},

    {path: 'home/:id', component: HomeComponent},
    {path: 'home/:word/:scuola/:risorsa/:fonte/:materia/:licenza', component: HomeComponentF},
    // {path: 'home', redirectTo: 'home/ ', pathMatch: 'full'},
    {path: 'dettaglio', component: DettaglioWordComponent},
    {path: 'input', component: InputWordComponent},
    {path: 'progetto', component: ProgettoComponent},
    {path: 'crawlers', component: CrawlerComponent},
    {path: 'esterno', component: ExternalPageComponent},
    {path: 'youtube', component: YouTubeComponent}
    
];

export const routing = RouterModule.forRoot(APP_ROUTES);