import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent{
  title = 'pro-dashboard-angular';
  constructor(private navService: NavbarService) { }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.navService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.navService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.navService.toggleSidebar();
  }

}
