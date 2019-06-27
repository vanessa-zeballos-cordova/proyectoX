import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { HttpClient } from '@angular/common/http';

import { PeticionService } from '../../services/peticion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {
  
  isCollapsed:boolean = true;
  data : any;
  constructor(private navService: NavbarService, private peticionS:PeticionService, private router: Router) {
    
  }

  ngOnInit() {
  }

  toggleSidebarPin() {
    this.navService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.navService.toggleSidebar();
  }

  onSignOut(){
    this.peticionS.onSignOut().subscribe(
        data => {
          this.data = JSON.parse(JSON.stringify(eval("(" + data + ")")));
          console.log('this.data', this.data);
          if(this.data.success){
            this.router.navigate([""]);
          }else{
            console.log('Favor comunicarse con el Administrador');
          }
        },
        error => {
          console.log('horror',error);
        }
    );
  }
}
