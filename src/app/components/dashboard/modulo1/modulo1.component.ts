import { Component, Injectable, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { CaratulaUnicaService } from "src/app/services/caratula-unica.service";
import { TipoDocumento } from "src/app/models/TipoDocumento";
import { Modulo1 } from "src/app/models/modulo1";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { CapitalSocial } from "src/app/models/CapitalSocial";



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
  step = 0;;

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

    this.buildForm()

    this.modulo1 = {
      IcaratulaUnica: {},
      IDireccion: {},
      IInformacionFuncionamiento: {},
      ICapitalSocialE: {},
      IIngresosNoOperacioneales: {},
      IDireccionNotificacion: {},
      IcapitalSocialN: {},
    };

  }


  inicilaizarCaratulaUnica() {

    this.modulo1 = {
      IcaratulaUnica: {},
      IDireccion: {},
      IInformacionFuncionamiento: {},
      ICapitalSocialE: {},
      IIngresosNoOperacioneales: {},
      IDireccionNotificacion: {},
      IcapitalSocialN: {},
    };

  }


  buildForm() {

    this.numeral1 = this._formBuild.group({
      numeroDocumento: new FormControl('', Validators.required),
      digitoVerificacion: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      numeroCamara: new FormControl('', Validators.required),
      numeroRegistro: new FormControl('', Validators.required),
      idTipoDocumento: new FormControl('', Validators.required),
    })


    this.numeral2 = this._formBuild.group({
      razonSocial: new FormControl('', Validators.required),
      nombreComercial: new FormControl('', Validators.required),
      sigla: new FormControl('', Validators.required),
      direccionGerencia: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', Validators.required),
      redesSociales: new FormControl('', Validators.required),
      paginaWeb: new FormControl('', Validators.required),
    })
  }
  guardar(): void {
    this.modulo1.IDireccion.idTipoDireccion = 1;
    this.modulo1.IDireccion.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
    this.modulo1.IDireccionNotificacion.idTipoDireccion = 2;
    this.modulo1.IDireccionNotificacion.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;

    this.modulo1.IcapitalSocialN.idTipoCapitalSocial = 1;
    this.modulo1.IcapitalSocialN.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
    this.modulo1.ICapitalSocialE.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;

    this.modulo1.ICapitalSocialE.idTipoCapitalSocial = 2;
    //guardar direccion
    this.httpCaratula.guardarCapitalSocial(this.modulo1.ICapitalSocialE).subscribe((resp) => {
      this.modulo1.ICapitalSocialE = resp;
    },
      (err) => {
        this.toastr.error("No se puedo guardar Composición del capital so ");
      });


    this.httpCaratula.guardarCapitalSocial(this.modulo1.IcapitalSocialN).subscribe((resp) => {
      this.modulo1.IcapitalSocialN = resp;
    },
      (err) => {
        this.toastr.error("No se puedo guardar Composición del capital so ");
      });
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
    debugger
    if (this.modulo1.IcaratulaUnica.idTipoOrganizacion == 99) {
      this.modulo1.IcaratulaUnica.idSubTipoOrganizacion == 0
    }
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
        this.editableotros = (this.modulo1.IcaratulaUnica.idTipoOrganizacion == 99);
        if (this.modulo1.IcaratulaUnica.idTipoOrganizacion == 12) {

          this.getSubtipoOrgnizacion(this.modulo1.IcaratulaUnica.idTipoOrganizacion);
          this.editable = ((this.modulo1.IcaratulaUnica.idSubTipoOrganizacion || 0) > 0);

        }


        this.getCaratulaUnicaDirecciones(this.modulo1.IcaratulaUnica.id);
        this.getCaratulaUnicaInformacionFuncionamiento(this.modulo1.IcaratulaUnica.id);
        this.getCaratulaUnicaCapitalSocial(this.modulo1.IcaratulaUnica.id);

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

        result.forEach((element: any) => {
          if (element.idTipoDireccion == 1) {
            debugger
            this.modulo1.IDireccion = element;
            this.getMunicipios(this.modulo1.IDireccion.idDepartamento);

          }
          if (element.idTipoDireccion == 2) {
            debugger
            this.modulo1.IDireccionNotificacion = element;
            this.getMunicipiosNoti(this.modulo1.IDireccionNotificacion.idDepartamento);

          }
        });


      },
      err => {
        this.toastr.error("no se puedo cargar las direcciones ");
      }
    );

  }

  sumapublico(item: any) {
    debugger//(foo.bar || 0)
    this.modulo1.IcapitalSocialN.total = ((item.publico || 0) + (item.privado || 0));
    if (this.modulo1.IcapitalSocialN.total == undefined || this.modulo1.IcapitalSocialN.total < 100) {

      this.toastr.warning("La suma del capital nacional no es 100 ");

    }

  }
  sumapuExt(item: any) {
    debugger//(foo.bar || 0)
    this.modulo1.ICapitalSocialE.total = ((item.publico || 0) + (item.privado || 0));
    if (this.modulo1.ICapitalSocialE.total == undefined || this.modulo1.ICapitalSocialE.total < 100) {

      this.toastr.warning("La suma del capital extranjero no es 100 ");

    }

  }
  getCaratulaUnicaCapitalSocial(idCaratulaUnica: any) {

    this.httpCaratula.getCaratulaUnicaCapitalSocial(idCaratulaUnica).subscribe(
      result => {
        result.forEach((element: any) => {
          if (element.idTipoCapitalSocial == 1) {
            debugger
            this.modulo1.IcapitalSocialN = element;

          } else if (element.idTipoCapitalSocial == 2) {
            debugger
            this.modulo1.ICapitalSocialE = element;

          }

        });


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


    this.editableotros = (idTipoOrganizacion == 99);
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
