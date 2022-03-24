import { Component, Injectable, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  public listDeptoNoti!: any[];
  public listMunicipioNoti!: any[];
  public listEstadoEmpresa!: any[];
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
    private _formBuild: FormBuilder, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.cargarCaratulaUnica();
    this.getTipoDocumento();
    this.getTipoRegistro();
    this.getDepartamento();
    this.getDepartamentoNoti();
    this.getTipoOrganizacion();
    this.getAllTipoIngresosNoOperacionales();
    this.getAllTipoCausa();
    this.findAllEstadoEmpresa();


    this.modulo1 = {
      IcaratulaUnica: {},
      IDireccion: {},
      IInformacionFuncionamiento: {},
      ICapitalSocial: {},
      IIngresosNoOperacioneales: {},
      IDireccionNotificacion: {},
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
      IIngresosNoOperacioneales: {},
      IDireccionNotificacion: {},
    };

  }
  guardar(): void {
    this.modulo1.IDireccion.idTipoDireccion = "1";
    this.modulo1.IDireccionNotificacion.idTipoDireccion = "2";

    //guardar direccion
    this.httpCaratula.guardarDireccion(this.modulo1.IDireccion).subscribe((resp) => {
      this.modulo1.IDireccion = resp;
    },
      (err) => {
        this.toastr.error("No se puedo guardar la Dirección");
      });
    //guardar direccion de notificacion
    this.httpCaratula.guardarDireccion(this.modulo1.IDireccionNotificacion).subscribe((resp) => {
      this.modulo1.IDireccionNotificacion = resp;
    },
      (err) => {
        this.toastr.error("No se puedo guardar la Dirección de notificación");
      });

       //guarda la caratula 
    this.httpCaratula.guardarInformacionFuncionamiento(this.modulo1.IInformacionFuncionamiento).subscribe(
      (resp) => {
        debugger
        this.modulo1.IInformacionFuncionamiento = resp;
        this.cargarCaratulaUnica();
        this.toastr.success("se guardo el modulo 1 exitosamente");
      },
      (err) => {
        this.toastr.error(err.Message + '');
      }
    );

    //guarda la caratula 
    this.httpCaratula.guardarCaratula(this.modulo1.IcaratulaUnica).subscribe(
      (resp) => {
        debugger
        this.modulo1.IcaratulaUnica = resp;
        this.toastr.success("se guardo el modulo 1 exitosamente");
      },
      (err) => {
        this.toastr.error(err.Message + '');
      }
    );
  }

  

  cargarCaratulaUnica() {
    this.spinner.show();

    this.toastr.clear();
    this.httpCaratula.cargarCaratulaUnica().subscribe(
      result => {
        this.modulo1.IcaratulaUnica = result;
        this.getCaratulaUnicaDirecciones(this.modulo1.IcaratulaUnica.id);
        this.getCaratulaUnicaInformacionFuncionamiento(this.modulo1.IcaratulaUnica.id);

        this.spinner.hide();
        this.toastr.success("se cargo el modulo exitosamente ");

      },
      err => {

        this.toastr.error(err.Message + '');
      }
    );
  }

  // lista de direcciones
  getCaratulaUnicaDirecciones(idCaratulaUnica: any) {

    this.httpCaratula.getCaratulaUnicaDirecciones(idCaratulaUnica).subscribe(
      result => {

        if (result[0].idTipoDireccion == 1) {

          this.modulo1.IDireccion = result[0];
          this.getMunicipios(this.modulo1.IDireccion.idDepartamento);

        }
        if (result[1].idTipoDireccion == 2) {

          this.modulo1.IDireccionNotificacion = result[1];
          this.getMunicipiosNoti(this.modulo1.IDireccionNotificacion.idDepartamento);

        }
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

    this.httpCaratula.getMunicipios(idDepartamento).subscribe(
      result => {

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

  findAllEstadoEmpresa() {
    this.httpCaratula.findAllEstadoEmpresa().subscribe(
      result => {

        this.listEstadoEmpresa = result;
        this.listEstadoEmpresa.unshift({
          estadoEmpresa: "Seleccione el Estado de la empresa",
          id: 0
        });

      },
      err => {
        this.toastr.error(err.Message + '');
      }
    )
  }
  getDepartamentoNoti() {
    this.httpCaratula.getDepartamento().subscribe(
      result => {

        this.listDeptoNoti = result;
        this.listDeptoNoti.unshift({
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

  getMunicipiosNoti(idDepartamento: any) {

    this.httpCaratula.getMunicipios(idDepartamento).subscribe(
      result => {

        this.listMunicipioNoti = result;
        this.listMunicipioNoti.unshift({
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


    this.editableotros = idTipoOrganizacion == 99;
    this.httpCaratula.findSubTipoOrganizacionByIdTipoOrganizacion(idTipoOrganizacion).subscribe(
      result => {

        this.listSubTipoOrg = result;
        this.editable = this.listSubTipoOrg.length > 0;
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

  getAllTipoIngresosNoOperacionales() {
    this.httpCaratula.getAllTipoIngresosNoOperacionales().subscribe(

      result => {
        this.listNoOper = result;

      },
      err => {
        this.toastr.error(err.Message + '');
      }
    )

  }

  getAllTipoCausa() {
    this.httpCaratula.getAllTipoCausa().subscribe(
      result => {

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
  getCaratulaUnicaInformacionFuncionamiento(idCaratulaUnica: any) {

    this.httpCaratula.getCaratulaUnicaInformacionFuncionamiento(idCaratulaUnica).subscribe(
      result => {
        this.modulo1.IInformacionFuncionamiento = result;
        console.log("informacion:", this.modulo1.IInformacionFuncionamiento);
      },
      err => {
        console.log(err)
      }
    );

  }

}
