import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
//import {HttpModule, Http} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { LoginService } from './services/login.service';
import { PeticionService } from './services/peticion.service';




import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //HttpModule,
    routing,
    //Http,
    HttpClientModule
  ],
  providers: [
    LoginService, PeticionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
