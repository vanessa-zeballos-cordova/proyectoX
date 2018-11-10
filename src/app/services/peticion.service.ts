import { Injectable } from '@angular/core';
//import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import 'rxjs/Rx';
import 'rxjs/add/operator/map';
//import 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class PeticionService {
  url: string;

  constructor(public  http_client: HttpClient) { 
    
  }

  getPrueba(){  
    return 'Peticion';
  }

  getDatos(): Observable<any>{
    this.url = "http://localhost/kerp_pruebas/lib/rest/seguridad/Auten/getPublicKey";
  
    const body = new HttpParams().set('tipo_contrato', 'planta') 
                                 .set('fecha', '11/10/2018')
                                 .set('id_gerencia', '9424');   

 
    //Establecemos cabeceras
    let headers = new HttpHeaders().set('Pxp-User','')
                                   .set('Php-Auth-User','')
                                   .set('Content-Type','application/x-www-form-urlencoded');
    
    return this.http_client.post(this.url, '', {headers:headers})
  }

  ingresarSis(usuario, contrasena): Observable<any>{

    this.url = "http://localhost/kerp_pruebas/lib/rest/seguridad/Auten/";
    const body = new HttpParams().set('_tipo', 'auten') 
                                 .set('contrasena', contrasena)
                                 .set('usuario', usuario);   

    //Establecemos cabeceras
    let headers = new HttpHeaders().set('Pxp-User','')
                                   .set('Php-Auth-User','')
                                   .set('Content-Type','application/x-www-form-urlencoded');

    return this.http_client.post(this.url, body.toString(), {headers:headers});
  }


}
