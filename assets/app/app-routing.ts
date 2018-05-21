import {RouterModule, Routes} from "@angular/router";

import {AuthenticationComponent} from "./user/authentication.component";
import {USER_ROUTES} from "./user/user.routes";


import {HomeComponent} from "./post-login/home.component";
import {InputWordComponent} from "./post-login/input.component";
import {DettaglioWordComponent} from "./post-login/dettaglio-word.component";
import {ProgettoComponent} from "./progetto/progetto.component";
import {ExternalPageComponent} from "./post-login/frontend.component";

const APP_ROUTES: Routes = [
   {path: '', redirectTo: '/auth', pathMatch: 'full'},
    //{path: '', redirectTo: '/progetto', pathMatch: 'full'},
    //{path: '', redirectTo: '/home/acqua', pathMatch: 'full'},
 
    {path: 'auth', component: AuthenticationComponent, children: USER_ROUTES},


    {path: 'home/:id', component: HomeComponent},
    {path: 'dettaglio', component: DettaglioWordComponent},

    {path: 'input', component: InputWordComponent},
    {path: 'progetto', component: ProgettoComponent},
    {path: 'esterno', component: ExternalPageComponent}
    
];

export const routing = RouterModule.forRoot(APP_ROUTES);