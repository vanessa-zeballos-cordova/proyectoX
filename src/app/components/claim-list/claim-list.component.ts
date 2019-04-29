import { Component, OnInit } from '@angular/core';

import { Claim } from '../../models/claim.model';

@Component({
  selector: 'claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {
 /*  claims:Array<Object> = [
    {
      titulo: 'Uno',
      texto: 'Primero en mostrarse',
      hide: true
    },
    {
      titulo: 'Dos',
      texto: 'Segundo en mostrarse',
      hide: true
    }
  ] */

  claims: Array<Claim>;

  constructor() { 
    this.claims = [
      new Claim('1','1',true),
      new Claim('2','2',true),
      new Claim('3','3',true)
    ];
  }

  ngOnInit() {
  }

  toggle(claim){
    claim.hide=!claim.hide
  }

  addClaim(claim){
    this.claims.unshift(claim);  
  }

  deleteClaim(){
   
    console.log(this.claims);
  }

}
