
import { Component, OnInit } from '@angular/core';
import { CaratulaUnica } from 'src/app/models/caratulaUnica'
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { CaratulaUnicaService } from 'src/app/services/caratula-unica.service';





@Component({
  selector: 'app-modulo2',
  templateUrl: './modulo2.component.html',
  styleUrls: ['./modulo2.component.css']
})
export class Modulo2Component implements OnInit {
  
  constructor(public  httpCaratula: CaratulaUnicaService) {

   }


  ngOnInit(): void {
  }

  guardar(): void {
    
  }
}
