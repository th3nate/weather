import { Component } from '@angular/core';

@Component({
  selector:    'app-nav',
  templateUrl: './nav.component.html',
  styleUrls:   ['./nav.component.scss']
})
export class NavComponent {
  public mobileMenuToggle = false;
  toggleMobileManu() {
    this.mobileMenuToggle = !this.mobileMenuToggle;
  }

}
