import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { AppComponent } from "./app.component";

import {AuthenticationComponent} from "./user/authentication.component";
import {HeaderComponent} from "./shared/header.component";
import {routing} from "./app-routing";
import {LogoutComponent} from "./user/logout.component"
import {SignupComponent} from "./user/signup.component";
import {SigninComponent} from "./user/signin.component";
import {DettaglioWordComponent} from "./post-login/dettaglio-word.component";

//import { AngularDraggableModule } from 'angular2-draggable';
import {ResizableModule} from 'angular-resizable-element';
import {UserService} from "./user/user.service";

import {AngularDragDirective} from "./shared/dragme.directive";
import {Resizable} from "./shared/resize.directive";
import {ResizeHandle} from "./shared/resizeHandle.directive";
import { MediumEditorDirective } from 'angular2-medium-editor/medium-editor.directive';

import {PostLoginComponent} from "./post-login/post-login.component";
import {ListMappeComponent} from "./post-login/list-mappe.component";
import {HomeComponent} from "./post-login/home.component";
import {InputWordComponent} from "./post-login/input.component";
import {ProgettoComponent} from "./progetto/progetto.component";
import {ListaSitiComponent} from "./progetto/lista-siti.component";
import {SitoComponent} from "./progetto/sito.component";
import {FonteComponent} from "./progetto/fonte-progetto.component";
import {AddFonteComponent} from "./progetto/add-fonte.component";
import {ModifyFonteComponent}  from "./progetto/modifica-fonte.component";
import {WordsComponent}  from "./progetto/words.component";
import {WordComponent}  from "./progetto/word.component";
import {ExternalPageComponent}  from "./post-login/frontend.component";




import {ProgettoViewerComponent} from "./progetto/progetto-viewer.component";
import { QuillEditorModule } from 'ngx-quill-editor';

import {TooltipModule} from "./shared/TooltipModule";
import {CommonModule} from "@angular/common";

import {NgxPaginationModule} from 'ngx-pagination';
import { ProgettoService } from './progetto/progetto.service';






@NgModule({
    declarations: [
        AppComponent,
       
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        DettaglioWordComponent,
        InputWordComponent,
        AngularDragDirective,
        Resizable,
        ResizeHandle,
        MediumEditorDirective,
      
        PostLoginComponent,
        ListMappeComponent,
        HomeComponent,
        ProgettoComponent,
        ListaSitiComponent,
        SitoComponent,
        ProgettoViewerComponent,
        FonteComponent,
        AddFonteComponent,
        ModifyFonteComponent,
        WordsComponent,
        WordComponent,
        ExternalPageComponent

    ],
    imports: [BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        TooltipModule,
        HttpModule,
        CommonModule,
     
        QuillEditorModule,
        NgxPaginationModule

  
    ],
    
    providers: [UserService, ProgettoService],
    bootstrap: [AppComponent]
})
export class AppModule {

}