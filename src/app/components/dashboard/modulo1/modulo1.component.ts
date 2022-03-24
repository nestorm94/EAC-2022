import { Component, Injectable, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { CaratulaUnicaService } from "src/app/services/caratula-unica.service";
import { TipoDocumento } from "src/app/models/TipoDocumento";
import { Modulo1 } from "src/app/models/modulo1";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
 


@Component({
  selector: "app-modulo1",
  templateUrl: "./modulo1.component.html",
  styleUrls: ["./modulo1.component.css"],
})

@Injectable()
export class Modulo1Component implements OnInit {
  public editable?: boolean;
  public editableotros?: boolean;
  public editableo11?: boolean;

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  step = 0;
  formFields!: any[];

  public numeral1!: FormGroup;
  public numeral2!: FormGroup;


  public modulo1!: Modulo1;
  public listTipoDocumento!: TipoDocumento[];
  public listTipoRegMercantil!: any[];
  public listDepto!: any[];
  public listMunicipio!: any[];
  public listTipoOrg!: any[];
  public listSubTipoOrg!: any[];
  public listNoOper!: any[];
  public listTipoCausa!: any[];


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
    private _formBuild: FormBuilder,private toastr: ToastrService,private spinner: NgxSpinnerService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.cargarCaratulaUnica();
    this.getTipoDocumento();
    this.getTipoRegistro();
    this.getDepartamento();
    this.getTipoOrganizacion();
    this.getAllTipoIngresosNoOperacionales();
    this.getAllTipoCausa();
    debugger

    this.modulo1 = {
      IcaratulaUnica: {},
      IDireccion: {},
      IInformacionFuncionamiento: {},
      ICapitalSocial: {},
      IIngresosNoOperacioneales:{}
    };

  }

  private buildForm() {
    this.numeral1 = this._formBuild.group({
      numeroDocumento: ['', [Validators.required, Validators.min(1.0)]]
    });
  }
  inicilaizarCaratulaUnica() {
    this.modulo1 = {
      IcaratulaUnica: {},
      IDireccion: {},
      IInformacionFuncionamiento: {},
      ICapitalSocial: {},
      IIngresosNoOperacioneales:{}
    };

  }
  guardar(): void {
    debugger
    this.modulo1.IDireccion.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
    this.httpCaratula.guardarDireccion(this.modulo1.IDireccion).subscribe((resp) => {
      console.log({ resp });
    },

      (error) => {
        console.log(error);
      })



    this.httpCaratula.guardarCaratula(this.modulo1.IcaratulaUnica).subscribe(
      (resp) => {
        console.log({ resp });
      },
      (error) => {
        console.log(error);
      }
    );

    
    this.cargarCaratulaUnica();
  }

  cargarCaratulaUnica() {
    this.spinner.show();

    this.toastr.clear();
    this.httpCaratula.cargarCaratulaUnica().subscribe(
      result => {
        debugger

        
        
        this.modulo1.IcaratulaUnica = result;
        this.getCaratulaUnicaDirecciones(this.modulo1.IcaratulaUnica.id);

        this.spinner.hide();
        this.toastr.success("se cargo el modulo exitosamente ");

      },
      err => {
        
        this.toastr.error(err.Message + '');
      }
    );


  }


  getCaratulaUnicaDirecciones(idCaratulaUnica: any) {
    debugger
    this.httpCaratula.getCaratulaUnicaDirecciones(idCaratulaUnica).subscribe(
      result => {
        debugger
        console.log("result:", result);

        this.modulo1.IDireccion = result[0];
        console.log("imprimir direcciones:", this.modulo1)
      },
      err => {
        console.log(err)
      }
    );

  }



  //listas de parametros


  getTipoDocumento() {
    this.httpCaratula.getTipoDocumento().subscribe(
      result => {

        this.listTipoDocumento = result;

      },
      err => {
        this.toastr.error(err.Message + '');
      }
    )

  }

  getTipoRegistro() {
    this.httpCaratula.getTipoRegistro().subscribe(
      result => {

        this.listTipoRegMercantil = result;

      },
      err => {
        this.toastr.error(err.Message + '');
      }
    )

  }

  getDepartamento() {
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
        this.toastr.error(err.Message + '');
      }
    )
  }


  getMunicipios(idDepartamento: any) {
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
        this.toastr.error(err.Message + '');
      }
    )

  }

  getTipoOrganizacion() {
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
        this.toastr.error(err.Message + '');
      }
    )
  }

  getSubtipoOrgnizacion(idTipoOrganizacion: any) {
    debugger

    this.editableotros = idTipoOrganizacion==99;
    this.httpCaratula.findSubTipoOrganizacionByIdTipoOrganizacion(idTipoOrganizacion).subscribe(
      result => {
        debugger
        this.listSubTipoOrg = result;
        this.editable = this.listSubTipoOrg.length >0;
        this.listSubTipoOrg.unshift({
          codigo: "0",
          nombre: "Seleccione un Subtipo de Organización.",
          id: 0
        });

        
      },
      err => {
        this.toastr.error(err.Message + '');
      }
    )

  }

  getAllTipoIngresosNoOperacionales(){
    this.httpCaratula.getAllTipoIngresosNoOperacionales().subscribe(

      result => {
        this.listNoOper = result;

      },
      err => {
        this.toastr.error(err.Message + '');
      }
    )

  }

  getAllTipoCausa(){
    this.httpCaratula.getAllTipoCausa().subscribe(
      result => {
        debugger
        this.listTipoCausa = result;
        this.listTipoCausa.unshift({
          codigo: "0",
          nombre: "Seleccione el tipo de causa",
          id: 0
        });

      },
      err => {
        this.toastr.error(err.Message + '');
      }
    )


  }
  changeTipoCausa(idTipoCausa: any){


  }
}
