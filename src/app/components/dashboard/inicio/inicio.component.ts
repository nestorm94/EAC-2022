import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  principal="./assets/img/principal.png"

  consultar="./assets/img/Consultar.jpg"
  diligenciar="./assets/img/Diligenciar.jpg"
  modificar="./assets/img/Modificar.jpg"
  warning="./assets/img/Warning.jpg"

  public token!: any;
  public username!: any;

  constructor(private tokenStorage: TokenStorageService,) { 
    this.token =( this.tokenStorage.getUser().tokenType + ' '+  this.tokenStorage.getToken());
    this.username = this.tokenStorage.getUser().username;
  }

  ngOnInit(): void {
  }

}
