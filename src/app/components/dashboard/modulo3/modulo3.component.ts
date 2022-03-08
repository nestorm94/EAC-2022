import { Component, OnInit } from '@angular/core';
import { CaratulaUnica } from 'src/app/models/caratulaUnica'
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { CaratulaUnicaService } from 'src/app/services/caratula-unica.service';


@Component({
  selector: 'app-modulo3',
  templateUrl: './modulo3.component.html',
  styleUrls: ['./modulo3.component.css']
})
export class Modulo3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  guardar(): void {
    
  }

}
