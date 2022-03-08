import { Component,
  Input,
  OnInit,
  TemplateRef,
  Inject,
  Output,
  EventEmitter ,ViewChild} from "@angular/core";
import { CaratulaUnica } from "src/app/models/caratulaUnica";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";

import {MatAccordion} from '@angular/material/expansion';

import { CaratulaUnicaService } from "src/app/services/caratula-unica.service";

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
  selector: "app-modulo1",
  templateUrl: "./modulo1.component.html",
  styleUrls: ["./modulo1.component.css"],
})
export class Modulo1Component implements OnInit {


  @ViewChild(MatAccordion) accordion!: MatAccordion;
  step = 0;
  formFields!: any[];

  public numeral1!: FormGroup;
  public numeral2!: FormGroup;
  public IcaratulaUnica!: CaratulaUnica;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    debugger
    if(this.IcaratulaUnica.idTipoDocumento== null&& this.IcaratulaUnica.idTipoDocumento== undefined)
    {
    }else{

    this.step++;
    }

  }

  prevStep() {
    this.step--;
  }


  tipoDocumento = [
    { id: 1, op: "C.C" },
    { id: 2, op: "NIT" },
    { id: 3, op: "C.I" },
  ];

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  departments: municipio[] = [
    { value: "DP01", viewValue: "AMAZONAS" },
    { value: "DP02", viewValue: "CASANARE" },
    { value: "DP03", viewValue: "META" },
  ];

  municipios: municipio[] = [
    { value: "MN01", viewValue: "TAURAMENA" },
    { value: "MN02", viewValue: "ACUAZUL" },
    { value: "MN03", viewValue: "YOPAL" },
  ];
  tipoOrgns: tipOrg[] = [
    { value: "MN01", viewValue: "SAS" },
    { value: "MN02", viewValue: "LIMITDA" },
    { value: "MN03", viewValue: "CONSORCIO" },
  ];

  constructor(
    public httpCaratula: CaratulaUnicaService,
    private _formBuild: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.IcaratulaUnica = {
      id: undefined,
      numeroOrden: undefined,
      numeroDocumento: undefined,
      digitoVerificacion: undefined,
      numeroCamara: undefined,
      numeroRegistro: undefined,
      razonSocial: "",
      georeferenciaGerecia: undefined,
      nombreComercial: "",
      sigla: "",
      paginaWeb: "",
      georeferenciaNotificacion: undefined,
      cualTipoOrgaizacion: "",
      fechaConstitucionDesde: "",
      fechaConstitucionHasta: "",
      cualOtroEstado: "",
      numeroUnidadesApoyo: "",
      idTipoDocumento: undefined,
    };
    

  }

  private buildForm() {
    this.numeral1 = this._formBuild.group({
      id: ["", [Validators.required, Validators.min(1.0)]],
      numeroOrden: [0, [Validators.required, Validators.min(1.0)]],
      numeroDocumento: ["", [Validators.required, Validators.min(1.0)]],
      digitoVerificacion: ["", [Validators.required, Validators.min(1.0)]],
      numeroCamara: ["", [Validators.required, Validators.min(1.0)]],
      numeroRegistro: ["", [Validators.required, Validators.min(1.0)]],
      idTipoDocumento: ["", [Validators.required, Validators.min(1.0)]],
    });

    this.numeral2 = this._formBuild.group({
      id: ["", [Validators.required, Validators.min(1.0)]],
      numeroOrden: ["", [Validators.required, Validators.min(1.0)]],
      razonSocial: ["", [Validators.required, Validators.min(1.0)]],
      georeferenciaGerecia: ["", [Validators.required, Validators.min(1.0)]],
      nombreComercial: ["", [Validators.required, Validators.min(1.0)]],
      sigla: ["", [Validators.required, Validators.min(1.0)]],
      paginaWeb: ["", [Validators.required, Validators.min(1.0)]],
      georeferenciaNotificacion: ["",[Validators.required, Validators.min(1.0)]],
      cualTipoOrgaizacion: ["", [Validators.required, Validators.min(1.0)]],
      fechaConstitucionDesde: ["", [Validators.required, Validators.min(1.0)]],
      fechaConstitucionHasta: ["", [Validators.required, Validators.min(1.0)]],
      cualOtroEstado: ["", [Validators.required, Validators.min(1.0)]],
      numeroUnidadesApoyo: ["", [Validators.required, Validators.min(1.0)]],
    });
  }

  guardar(): void {
    debugger;
    if(this.IcaratulaUnica.numeroDocumento== null &&  this.IcaratulaUnica.numeroDocumento == null){

    }

    console.log(JSON.stringify(this.IcaratulaUnica));
    this.httpCaratula.guardarCaratula(this.IcaratulaUnica).subscribe(
      (resp) => {
        debugger;
        console.log({ resp });
        //this.personaForm.reset();
        //this.getAll();
      },

      (error) => {
        debugger;
      }
    );
  }

  showValue(){
}
}
