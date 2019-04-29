import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ToastrModule} from 'ngx-toastr';
//import {HttpModule, Http} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { LoginService } from './services/login.service';
import { PeticionService } from './services/peticion.service';
import { NavbarService } from './services/navbar.service';



import { routing, appRoutingProviders } from './app.routing';
import { ClaimListComponent } from './components/claim-list/claim-list.component';
import { ClaimComponent } from './components/claim/claim.component';
import { ClaimFormComponent } from './components/claim-form/claim-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigninComponent } from './components/signin/signin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClaimListComponent,
    ClaimComponent,
    ClaimFormComponent,
    NavbarComponent,
    SigninComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //HttpModule,
    routing,
    //Http,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    LoginService, PeticionService, NavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
