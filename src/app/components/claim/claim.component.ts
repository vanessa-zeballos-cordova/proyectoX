import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Claim } from '../../models/claim.model';

@Component({
  selector: 'claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  @Input('claim') data: Claim;

  constructor() { }

  ngOnInit() {
  }

}
