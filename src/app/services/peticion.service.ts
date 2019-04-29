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
    //this.url = "http://192.168.11.82/kerp_pruebas/lib/rest/seguridad/Auten/getPublicKey";
    this.url = "http://192.168.11.82/kerp_pruebas/lib/lib_control/Intermediario.php";
    //this.url = "http://192.168.11.82/kerp_pruebas/lib/act.php";
  
    //this.url = "http://192.168.11.82/kerp_pruebas/lib/rest/organigrama/Funcionario/urlFotoFuncionario";

    /*const body = new HttpParams().set('tipo_contrato', 'planta') 
                                 .set('fecha', '11/10/2018')
                                 .set('id_gerencia', '9424');*/ 
    const body = new HttpParams()//.set('x', '../../proyectoX/control/Auten/authPxp') 
                                 .set('x', '../../sis_seguridad/control/Auten/getPublicKey')
                                 //.set('x', '../../sis_seguridad/control/Auten/verificarCredenciales') 
                                 //.set('p', '{"_tipo":"auten", "contrasena":"994 q 5976736649eeee7 ee","usuario":"admin"}')
                                 .set('p', '{"_tipo":"inter"}');
                                 //.set('usuario','admin')
                                 //.set('contrasena','admin');  
                                 //.set('id_funcionario', '10');  

 
    //Establecemos cabeceras
    /*let headers = new HttpHeaders().set('Pxp-User','')
                                   .set('Php-Auth-User','')
                                   .set('Content-Type','application/x-www-form-urlencoded');*/
                              //44351071
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                    //.set('Pxp-User','admin')
                                    //.set('Php-Auth-User','qcm9coJQgH7utQDl+L0T+d+pKbPolEGOd4z01UAKjLY=')
                                    .set('Origin','*');
                                   //.set('Referer','http://192.168.11.82');
                                   //.set('Host','http://192.168.11.82');
    console.log('parametros', body.toString(), headers);
    //return this.http_client.post(this.url, /* body.toString() */'', {headers:headers})
    return this.http_client.post(this.url,body.toString(), {headers:headers} )
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
