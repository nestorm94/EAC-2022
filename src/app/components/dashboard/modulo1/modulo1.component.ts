import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-modulo1',
  templateUrl: './modulo1.component.html',
  styleUrls: ['./modulo1.component.css']
})
export class Modulo1Component implements OnInit {
  formModulo1: FormGroup;
  constructor() { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.formModulo1 = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });

    

  }

  ngOnInit(): void {
  }

}
