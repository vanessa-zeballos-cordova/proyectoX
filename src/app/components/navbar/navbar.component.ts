import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {
  
  isCollapsed:boolean = true;
  
  constructor(private navService: NavbarService) { 
    
  }

  ngOnInit() {
  }

  toggleSidebarPin() {
    this.navService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.navService.toggleSidebar();
  }

}
