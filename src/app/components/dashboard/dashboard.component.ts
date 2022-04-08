import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  logo="./assets/img/logo.png"

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showFuenteBoard = false;
  username?: string;


  constructor(private tokenStorageService: TokenStorageService) { 
    
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showFuenteBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;

  }  
}

logout(): void {
  this.tokenStorageService.signOut();
  window.location.reload();
}



}
