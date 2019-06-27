import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { PeticionService } from '../../services/peticion.service';
import { NgForm } from '@angular/forms';
import { Login } from '../../models/login.model';
import { Berp } from '../../models/berp.model';
import { HttpClient } from '@angular/common/http';

import { Base64 } from '../../../../pxpRestWeb/base64';
import { MCrypt } from '../../../../pxpRestWeb/mcrypt';
import { Crypterp } from '../../../../pxpRestWeb/crypterp';
import { Md5 } from 'md5';

import { Router, ActivatedRoute } from '@angular/router';
//import { Base64 } from '../../../../pxpRestWeb/base64';
/*import { Base64 } from 'js-base64';
import { MCrypt } from 'fdoering-mcrypt';
import { Rijndael }  from 'rijndael';*/

//import { require } from 'requirejs';

//import { mcrypt } from "fdoering-mcrypt";
//import * as mcrypt from "fdoering-mcrypt";
/*import * as Serpent from "../../pxpRestWeb/Serpent";*/

//declare var base64:any;
//declare var rij:Rijndael;
/*declare var Rijndael:any;
declare var Serpent:any;*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, PeticionService]
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin : NgForm;
  public login:Login;
  cuentas:any;
  public tipoForm:string;
  public data:any;
  private globalBerp : Berp;
  private success : boolean;
  //public mcrypt:any;
  
  constructor(private loginS:LoginService, private peticionS:PeticionService, private router: Router) {
    this.login =  new Login(0,'','');
    this.tipoForm = 'new';
    this.success = false;
  }
  

  onSubmit(){
    let passHash = Md5.md6(this.formLogin.value.password);
    Crypterp.Crypto(this.globalBerp);
    let paseERP = Crypterp.Encriptar(this.formLogin.value.password);
    let pass = Base64.encode(MCrypt.Encrypt(this.formLogin.value.username,undefined,passHash,'rijndael-256','ecb'));
    this.peticionS.ingresarSis(this.formLogin.value.username, paseERP).subscribe(
      data => {
        this.data = JSON.parse(JSON.stringify(eval("(" + data + ")")));

        if(this.data.success){
          this.router.navigate(["/treeSystem"]);
        }else{
          console.log('Credenciales Invalidas');
        }
      },
      error=>{
        console.log('Error al Ingresar al Sistema',error);
      }  
    );

  }

  ngOnInit() {
    this.cuentas = this.loginS.getCredenciales();
    this.peticionS.getDatos().subscribe(
        data => {
          this.data = JSON.parse(JSON.stringify(eval("(" + data + ")")));
          //this.data = eval(data.trim());
          
          this.globalBerp = new Berp(this.data.e,this.data.k,this.data.m,this.data.p,this.data.success,this.data.x);

          if(this.data.success){
            console.log('EXITO', this.data);
          }else{
            console.log('Favor comunicarse con el Administrador');
          }
      },
        error => {
        console.log('horror',error);
      }
    );
  }

  addCuenta(cuenta){
    this.tipoForm = 'new';
    let index = this.getNextIndex()+1;
    this.loginS.addCuenta({id_login: index, username:cuenta.username,password:cuenta.password});
    console.log(this.loginS.getCredenciales());
  }

  getNextIndex():number{
    return this.loginS.getNextIndex();
  }

  setForm(){
    this.tipoForm = 'new';
  }

  deleteCuenta(index: number){
    this.loginS.deleteCuenta(index);
  }

  getCuenta(index: number){
    this.tipoForm = 'edit';
    this.login = this.loginS.getCuenta(index);
  }

  editCuenta(index: number, cuenta){
    
    this.loginS.editCuenta(index, cuenta);
    //this.formLogin.reset();
    console.log(this.loginS.getCredenciales());
  }

}
