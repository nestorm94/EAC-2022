
import { Component, OnInit, ViewChild } from '@angular/core';
import { CaratulaUnica } from 'src/app/models/caratulaUnica'
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { CaratulaUnicaService } from 'src/app/services/caratula-unica.service';

import {MatAccordion, MatAccordionBase} from '@angular/material/expansion';




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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-modulo1',
  templateUrl: './modulo1.component.html',
  styleUrls: ['./modulo1.component.css']
})
export class Modulo1Component implements OnInit {



  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

   tipoDocumento = [ {id:1,op:"C.C", },
    {id:2,op:"NIT"},{id:3,op:"C.I"}
  ];
  
  CaratulaUnica : CaratulaUnica = {
    id: undefined, 
    numeroOrden: undefined, 
    numeroDocumento: undefined, 
    digitoVerificacion: undefined, 
    numeroCamara: undefined, 
    numeroRegistro: undefined, 
    razonSocial: undefined,
    georeferenciaGerecia: undefined,
    nombreComercial: undefined,
    sigla: undefined,
    paginaWeb: undefined,
    georeferenciaNotificacion: undefined,
    cualTipoOrgaizacion: undefined,
    fechaConstitucionDesde: undefined,
    fechaConstitucionHasta: undefined,
    cualOtroEstado: undefined,
    numeroUnidadesApoyo: undefined,
    idTipoDocumento: undefined
  };

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

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
  
  
  constructor(public  httpCaratula: CaratulaUnicaService) {

   }


  ngOnInit(): void {
  }



  guardar(): void {
    debugger
    console.log(JSON.stringify(this.CaratulaUnica));
    this.httpCaratula.guardarCaratula(this.CaratulaUnica).subscribe(resp => {
      debugger
      console.log({resp})
      //this.personaForm.reset();
      //this.getAll();
    },
      
      error => { console.error(error)
      debugger
      }
    )
    console.log('Guadar--> OK.')
  }

}
