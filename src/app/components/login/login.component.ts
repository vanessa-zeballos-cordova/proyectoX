import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { PeticionService } from '../../services/peticion.service';
import { NgForm } from '@angular/forms';
import { Login } from '../../models/login.model';


 

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

  constructor(private loginS:LoginService, private peticionS:PeticionService) { 
    this.login =  new Login(0,'','');
    this.tipoForm = 'new';
  }
  

  onSubmit(){

    this.peticionS.ingresarSis(this.formLogin.value.username, this.formLogin.value.password).subscribe(
      result => {
        if(result.code != 200){
          console.log('que paso',result.code,result);
        }else{
          console.log('exito');
        }
      },
      error=>{
        console.log('horror',error);
      }  
    )

  }

  ngOnInit() {
    this.cuentas = this.loginS.getCredenciales();

    this.peticionS.getDatos().subscribe(
      result => {
          if(result.code != 200){
            console.log('que paso',result.code,result);
          }else{
            console.log('exito');
          }
      },
      error=>{
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
