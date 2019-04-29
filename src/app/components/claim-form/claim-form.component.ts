import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Claim } from '../../models/claim.model';

@Component({
  selector: 'claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.scss']
})
export class ClaimFormComponent implements OnInit {

  @Output() claimCreate = new EventEmitter<Claim>();
  constructor() { }

  ngOnInit() {
  }

  createClaim(claim: string, client:string){
    this.claimCreate.emit(new Claim(claim, client, true))
  }

}
