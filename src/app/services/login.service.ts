import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public cuentas:any = [
    {id_login: 1, username: 'franklin', password: '123456'},
    {id_login: 2, username: 'vanessa', password: '123'}
  ];
  array_index:Array<number>=[];
  
  constructor() { 
    
  }

  getCredenciales(){
    return this.cuentas;  
  }

  addCuenta(cuenta){
    this.cuentas.push(cuenta);  
    console.log(this.cuentas);
  }

  getNextIndex():number{
    
    this.cuentas.forEach(function(element, index, record) {
      this.array_index.push(element.id_login);
      //that.array_index.push(element.id_login);
    }, this);
    //console.log('array',this.array_index);
    return Math.max.apply(null, this.array_index);
  }
  
  deleteCuenta(index:number){
    this.cuentas.splice(index, 1);
  }

  editCuenta(index:number, cuenta){


    this.cuentas.forEach(function(element, index, record) {
      if(index == element.id_login){
        record.username = cuenta.username;
        record.password = cuenta.password;
        return;
      }
    }, this);

  } 

  getCuenta(index:number){
    return this.cuentas[index];
  }
}
