import { Component,OnInit ,ViewChild} from "@angular/core";
import { CaratulaUnica } from "src/app/models/caratulaUnica";
import { InformacionFuncionamiento } from "src/app/models/InformacionFuncionamiento";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion} from '@angular/material/expansion';
import { CaratulaUnicaService } from "src/app/services/caratula-unica.service";
import { TipoDocumento } from "src/app/models/TipoDocumento";
import { Direccion } from "src/app/models/Direccion";
import { Modulo1 } from "src/app/models/modulo1";



@Component({
  selector: "app-modulo1",
  templateUrl: "./modulo1.component.html",
  styleUrls: ["./modulo1.component.css"],
})
export class Modulo1Component implements OnInit {

log(x: any){

  console.log(x);
}

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  step = 0;
  formFields!: any[];

  public numeral1!: FormGroup;
  public numeral2!: FormGroup;

  
  public modulo1!:Modulo1;
  public listTipoDocumento!: TipoDocumento[];
  public listTipoRegMercantil!: any[];
  public listDepto!: any[];
  public listMunicipio!: any[];
  public listTipoOrg!: any[];


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(
    public httpCaratula: CaratulaUnicaService,
    private _formBuild: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    
    this.cargarCaratulaUnica();
    this.getTipoDocumento();
    this.getTipoRegistro();
    this.getDepartamento();
    this.getMunicipios(5);
    this.getTipoOrganizacion();
    debugger

    this.modulo1 = {
      IcaratulaUnica:{},
      IDireccion:{},
      IInformacionFuncionamiento:{},
      ICapitalSocial:{}
    };
    
  }

  private buildForm() {
    this.numeral1 = this._formBuild.group({
      numeroDocumento: ['', [Validators.required, Validators.min(1.0)]]
    });
  }
  inicilaizarCaratulaUnica(){
    this.modulo1 = {
      IcaratulaUnica:{},
      IDireccion:{},
      IInformacionFuncionamiento:{},
      ICapitalSocial:{}
    };
    
  }
  guardar(): void {
    console.log("imprimir modulo 1:" , JSON.stringify(this.modulo1));
    console.log(JSON.stringify(this.modulo1.IDireccion));
    this.modulo1.IDireccion.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
    this.modulo1.IDireccion.idTipoDireccion = "1";

    this.httpCaratula.guardarCaratula(this.modulo1.IcaratulaUnica).subscribe(
      (resp) => {
        console.log({ resp });
      },
      (error) => {
        console.log(error);
      }
    );

    this.httpCaratula.guardarDireccion(this.modulo1.IDireccion).subscribe((resp) => {
      console.log({ resp });
    },

    (error) => {
      console.log(error);
    })

    this.cargarCaratulaUnica();
  }

  cargarCaratulaUnica() {
    this.httpCaratula.cargarCaratulaUnica().subscribe(
      result => {
        this.modulo1.IcaratulaUnica = result;
        this.getCaratulaUnicaDirecciones(this.modulo1.IcaratulaUnica.id);
       
      },
      err => {
      console.log(err)
      }
    );
    

  }


  getCaratulaUnicaDirecciones(idCaratulaUnica:any)
  {
    debugger
    this.httpCaratula.getCaratulaUnicaDirecciones(idCaratulaUnica).subscribe(
      result => {
        debugger
        console.log("result:",result);
        
        this.modulo1.IDireccion = result[0];
        console.log("imprimir direcciones:",this.modulo1)
      },
      err => {
      console.log(err)
      }
    );

  }
  


//listas de parametros


  getTipoDocumento(){
    this.httpCaratula.getTipoDocumento().subscribe(
      result => {

          this.listTipoDocumento = result;
        
      },
      err => {
      }
    )

  }

  getTipoRegistro(){
    this.httpCaratula.getTipoRegistro().subscribe(
      result => {

          this.listTipoRegMercantil = result;
        
      },
      err => {
      }
    )

  }

  getDepartamento(){
    this.httpCaratula.getDepartamento().subscribe(
      result => {
        debugger
          this.listDepto = result;
          this.listDepto.unshift({
            codigo: "0",
            nombre: "Seleccione el Departamento",
            id: 0
          });
        
      },
      err => {
      }
    )
  }


  getMunicipios(idDepartamento:any){
    debugger
    this.httpCaratula.getMunicipios(idDepartamento).subscribe(
      result => {
        debugger
          this.listMunicipio = result;
          this.listMunicipio.unshift({
            codigo: "0",
            nombre: "Seleccione el Municipio.",
            id: 0
          });
        
      },
      err => {
      }
    )

  }

  getTipoOrganizacion(){
    this.httpCaratula.getTipoOrganizacion().subscribe(
      result => {
        debugger
          this.listTipoOrg = result;
          this.listTipoOrg.unshift({
            codigo: "0",
            nombre: "Seleccione el Tipo de Organización",
            id: 0
          });
        
      },
      err => {
      }
    )
  }


  showValue(){
}
}
