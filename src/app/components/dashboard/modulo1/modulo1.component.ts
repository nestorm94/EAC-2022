import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';

interface department {
  value: string;
  viewValue: string;
}
interface municipio {
  value: string;
  viewValue: string;
}
interface tipOrg {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-modulo1',
  templateUrl: './modulo1.component.html',
  styleUrls: ['./modulo1.component.css']
})
export class Modulo1Component implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  departments: municipio[] = [
    {value: 'DP01', viewValue: 'AMAZONAS'},
    {value: 'DP02', viewValue: 'CASANARE'},
    {value: 'DP03', viewValue: 'META'},
  ];

  municipios: municipio[] = [
    {value: 'MN01', viewValue: 'TAURAMENA'},
    {value: 'MN02', viewValue: 'ACUAZUL'},
    {value: 'MN03', viewValue: 'YOPAL'},
  ];
  tipoOrgns: tipOrg[] = [
    {value: 'MN01', viewValue: 'SAS'},
    {value: 'MN02', viewValue: 'LIMITDA'},
    {value: 'MN03', viewValue: 'CONSORCIO'},
  ];
  constructor() {}

  ngOnInit(): void {
  }

}
