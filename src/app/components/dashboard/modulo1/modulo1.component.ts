import { Component, Injectable, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { CaratulaUnicaService } from "src/app/services/caratula-unica.service";
import { TipoDocumento } from "src/app/models/TipoDocumento";
import { Modulo1 } from "src/app/models/modulo1";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { TipoVariableEmpresa } from "src/app/models/TipoVariableEmpresa";
import { IngresosNoOperacioneales } from "src/app/models/IngresosNoOperacioneales";
import { TokenStorageService } from '../../../services/token-storage.service';


import { DatePipe } from '@angular/common'




@Component({
  selector: "app-modulo1",
  templateUrl: "./modulo1.component.html",
  styleUrls: ["./modulo1.component.css"],
})

export class Modulo1Component implements OnInit {
  public editable?: boolean;
  public editableotroEstado?: boolean;
  public editableotros?: boolean;
  public editableo11?: boolean;

  public token!: any;
  public username!: any;


  @ViewChild(MatAccordion) accordion!: MatAccordion;
  step = 0;


  public numeral1!: FormGroup;
  public numeral2!: FormGroup;

  public numeromeses!: Boolean;

  public digitoV!: boolean;

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
  public listNoOper!: IngresosNoOperacioneales[];
  public listTipoCausa!: any[];
  public listVariable!: TipoVariableEmpresa[];
  public listCIIUVariable!: any[];
  public listOperacion!: any[];



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
    private _formBuild: FormBuilder,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe) {
    this.token = (this.tokenStorage.getToken());

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
    this.getAllTipoVariable();
    this.getAllTipoOperacion();

    this.buildForm()

    this.modulo1 = {
      IcaratulaUnica: {},
      IDireccion: {},
      IInformacionFuncionamiento: {},
      ICapitalSocialE: {},
      IIngresosNoOperacioneales: [],
      IDireccionNotificacion: {},
      IcapitalSocialN: {},
      IVariableEmpresa: [],
    };

    this.token = ("Bearer " + this.tokenStorage.getToken());



  }


  inicilaizarCaratulaUnica() {

    this.modulo1 = {
      IcaratulaUnica: {},
      IDireccion: {},
      IInformacionFuncionamiento: {},
      ICapitalSocialE: {},
      IIngresosNoOperacioneales: [],
      IDireccionNotificacion: {},
      IcapitalSocialN: {},
      IVariableEmpresa: [],
    };

  }


  buildForm() {

    this.numeral1 = this._formBuild.group({
      numeroDocumento: new FormControl('', [Validators.required, Validators.max(10)]),
      digitoVerificacion: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      numeroCamara: new FormControl('', Validators.required),
      numeroRegistro: new FormControl('', Validators.required),
      idTipoDocumento: new FormControl('', Validators.required),
      idTipoRegistroMercantil: new FormControl('', Validators.required),
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

    debugger
    this.modulo1.IDireccion.idTipoDireccion = 1;
    this.modulo1.IDireccion.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
    this.modulo1.IDireccionNotificacion.idTipoDireccion = 2;
    this.modulo1.IDireccionNotificacion.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;

    this.modulo1.IcapitalSocialN.idTipoCapitalSocial = 1;
    this.modulo1.IcapitalSocialN.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
    this.modulo1.ICapitalSocialE.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;

    this.modulo1.ICapitalSocialE.idTipoCapitalSocial = 2;

    //guardar tipo de variable



    for (const variable of this.listVariable) {
      debugger
      variable.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
      variable.idSeccion = variable.codigo;
      if (variable.idSeccion == 13) {
        variable.idCodigoCIIU = '12';
      }
      this.guardarvariableEmpresa(variable);

    }

    // guardar ingreso no operacional


    for (const variable of this.listNoOper) {

      variable.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
      this.guardarIngresosNoOperacionales(variable);

    }
    //guardar operacon

    for (const variable of this.listOperacion) {
      debugger
      variable.idCaratulaUnica = this.modulo1.IcaratulaUnica.id
      variable.idTipoOperacion = variable.idTipoOperacion
      if (variable.valor == 1) {
        variable.bienes = variable.valor
        variable.servicios = null
        variable.ninguna = null
      }
      else if (variable.valor == 2) {
        variable.bienes = null
        variable.servicios = variable.valor
        variable.ninguna = null
      }
      else if (variable.valor == 3) {
        variable.bienes = null
        variable.servicios = null
        variable.ninguna = variable.valor
      }
      this.guardarOperacion(variable);

    }

    //guardar direccion
    this.httpCaratula.guardarCapitalSocial(this.modulo1.ICapitalSocialE).subscribe((resp) => {
      this.modulo1.ICapitalSocialE = resp;
    },
      (err) => {
        this.toastr.error("No se puedo guardar Composición del capital social ");
      });


    this.httpCaratula.guardarCapitalSocial(this.modulo1.IcapitalSocialN).subscribe((resp) => {
      this.modulo1.IcapitalSocialN = resp;
    },
      (err) => {
        this.toastr.error("No se puedo guardar Composición del capital social ");
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
    debugger
    this.httpCaratula.guardarInformacionFuncionamiento(this.modulo1.IInformacionFuncionamiento).subscribe(
      (resp) => {

        this.modulo1.IInformacionFuncionamiento = resp;
        this.cargarCaratulaUnica();
        this.toastr.success("se guardo el modulo 1 exitosamente");
      },
      (err) => {
        this.toastr.error("No se puedo guardar la inforacion de mudulo 1");
      }
    );

    //guarda la caratula 

    if (this.modulo1.IcaratulaUnica.idTipoOrganizacion == 99) {
      this.modulo1.IcaratulaUnica.idSubTipoOrganizacion == 0
    }
    this.httpCaratula.guardarCaratula(this.modulo1.IcaratulaUnica).subscribe(
      (resp) => {

        this.modulo1.IcaratulaUnica = resp;
        this.toastr.success("se guardo el modulo 1 exitosamente");
      },
      (err) => {
        this.toastr.error("No se puedo guardar la Dirección");
      }
    );
  }

  cargarCaratulaUnica() {
    this.spinner.show();

    this.toastr.clear();
    this.httpCaratula.cargarCaratulaUnica().subscribe(
      result => {
        this.modulo1.IcaratulaUnica = result;


        let fechaConstitucionDesde = this.datepipe.transform(this.modulo1.IcaratulaUnica.fechaConstitucionDesde, 'yyyy-MM-dd');
        this.modulo1.IcaratulaUnica.fechaConstitucionDesde = (fechaConstitucionDesde || undefined);


        let fechaConstitucionHasta = this.datepipe.transform(this.modulo1.IcaratulaUnica.fechaConstitucionHasta, 'yyyy-MM-dd');
        this.modulo1.IcaratulaUnica.fechaConstitucionHasta = (fechaConstitucionHasta || undefined)


        this.modulo1.IcaratulaUnica.fechaConstitucionDesde

        if (this.modulo1.IcaratulaUnica.idTipoDocumento == 1) {
          this.digitoV = false;
        }

        this.editableotros = (this.modulo1.IcaratulaUnica.idTipoOrganizacion == 99);
        if (this.modulo1.IcaratulaUnica.idTipoOrganizacion == 12) {

          this.getSubtipoOrgnizacion(this.modulo1.IcaratulaUnica.idTipoOrganizacion);
          this.editable = ((this.modulo1.IcaratulaUnica.idSubTipoOrganizacion || 0) > 0);

        }
        if (this.modulo1.IcaratulaUnica.idEstadoEmpresa == 7) {

          this.editableotroEstado = ((this.modulo1.IcaratulaUnica.idEstadoEmpresa || 0) > 0);

        }
        this.getCaratulaUnicaDirecciones(this.modulo1.IcaratulaUnica.id);
        this.getCaratulaUnicaInformacionFuncionamiento(this.modulo1.IcaratulaUnica.id);
        this.getCaratulaUnicaCapitalSocial(this.modulo1.IcaratulaUnica.id);
        this.getCaratulaUnicaIngresosNoOperacionales(this.modulo1.IcaratulaUnica.id);
        this.getCaratulaUnicaVariableEmpresa(this.modulo1.IcaratulaUnica.id);
        this.getCaratulaUnicaOperacion(this.modulo1.IcaratulaUnica.id);


        this.spinner.hide();
        this.toastr.success("se cargo el modulo exitosamente ");

      },
      err => {


        this.toastr.error("No se puedo cargar la información el modulo ");
      }
    );
  }

  guardarvariableEmpresa(variableEmpresa: any) {
    this.httpCaratula.guardarVariableEmpresa(variableEmpresa).subscribe((resp) => {

      this.modulo1.IVariableEmpresa = resp;
    },
      (err) => {
        this.toastr.error("No se puedo guardar variables principales");
      });

  }
  getCaratulaUnicaVariableEmpresa(idCaratulaUnica: any) {

    this.httpCaratula.getCaratulaUnicaVariableEmpresa(idCaratulaUnica).subscribe(
      result => {

        if (result.length > 0) {

          this.listVariable.forEach(element => {

            var item = result.find((x: any) => x.idSeccion == element.codigo)
            if (item != null) {

              element.id = item.idTipoOperacion
              element.numeroEstablecimientos = item.numeroEstablecimientos
              element.ingreso = item.ingreso
              element.personalOcupado = item.personalOcupado
              element.remuneracion = item.remuneracion
              element.otrosCostosGastos = item.otrosCostosGastos
              element.idCodigoCIIU = item.idCodigoCIIU
              element.remuneracion = item.remuneracion
            }
          })

        } else {
          this.getAllTipoVariable();
        }



      },
      err => {
        this.toastr.error("No se pudo cargar la información de capital social");
      }
    );
  }
  //guardarOperacion
  guardarOperacion(operacion: any) {
    this.httpCaratula.guardarOperacion(operacion).subscribe((resp) => {

    },
      (err) => {
        this.toastr.error("No se puedo guardar variables principales");
      });

  }

  guardarIngresosNoOperacionales(IngresosNoOperacioneales: any) {

    this.httpCaratula.guardarIngresosNoOperacionales(IngresosNoOperacioneales).subscribe((resp) => {
      this.modulo1.IIngresosNoOperacioneales = resp;
    },
      (err) => {
        this.toastr.error("No se puedo guardar variables principales");
      });

  }
  getCaratulaUnicaOperacion(idCaratulaUnica: any) {
    this.httpCaratula.getCaratulaUnicaOperacion(idCaratulaUnica).subscribe(
      result => {
        if (result.length > 0) {
          debugger
          this.listOperacion.forEach(element => {
            var item = result.find((x: any) => x.idTipoOperacion == element.idTipoOperacion)
            if (item != null) {
              debugger
              element.id = item.id
              if (item.bienes == 1) {
                element.valor = 1
              } else if (item.servicios == 2) {
                element.valor = 2
              } else if (item.ninguna == 3) {
                item.valor = 3
              }

              element.bienes = item.bienes
              element.servicios = item.servicios
              element.ninguna = item.ninguna
            }
          })
          console.log('lista de operacion 1:', this.listOperacion);

        } else {
          this.getAllTipoOperacion()
        }
      },
      err => {
        this.toastr.error("No se puedo cargar las direcciones ");
      }
    );

  }

  getCaratulaUnicaIngresosNoOperacionales(idCaratulaUnica: any) {

    this.httpCaratula.getCaratulaUnicaIngresosNoOperacionales(idCaratulaUnica).subscribe(
      result => {

        if (result.length > 0) {

          this.listNoOper.forEach(element => {
            var item = result.find((x: any) => x.idTipoIngresosNoOperacionales == element.codigo)
            if (item != null) {
              element.id = item.id
              element.valor = item.valor
            }
          })
        } else {
          this.getAllTipoIngresosNoOperacionales()
        }
      },
      err => {
        this.toastr.error("No se puedo cargar las direcciones ");
      }
    );
  }

  // lista de direcciones
  getCaratulaUnicaDirecciones(idCaratulaUnica: any) {

    this.httpCaratula.getCaratulaUnicaDirecciones(idCaratulaUnica).subscribe(
      result => {

        result.forEach((element: any) => {
          if (element.idTipoDireccion == 1) {

            this.modulo1.IDireccion = element;
            this.getMunicipios(this.modulo1.IDireccion.idDepartamento);

          }
          if (element.idTipoDireccion == 2) {

            this.modulo1.IDireccionNotificacion = element;
            this.getMunicipiosNoti(this.modulo1.IDireccionNotificacion.idDepartamento);

          }
        });


      },
      err => {
        this.toastr.error("No se puedo cargar las direcciones ");
      }
    );

  }

  sumacapitalsocial(item: any) {

    debugger
    if (item.idTipoCapitalSocial = 1) { this.modulo1.IcapitalSocialN.total = ((this.modulo1.IcapitalSocialN.publico || 0) + (this.modulo1.IcapitalSocialN.privado || 0)); }
    if (item.idTipoCapitalSocial = 2) { this.modulo1.ICapitalSocialE.total = ((this.modulo1.ICapitalSocialE.publico || 0) + (this.modulo1.ICapitalSocialE.privado || 0)); }

    //this.modulo1.IcapitalSocialN.total = (this.modulo1.IcapitalSocialN.publico|| 0) + (this.modulo1.IcapitalSocialN.privado || 0); 

    if ((((this.modulo1.IcapitalSocialN.total || 0) + (this.modulo1.ICapitalSocialE.total || 0)) != 100)) {
      this.toastr.warning("La suma del capital nacional  y  extranjero no es 100 ");
    }
  }
  sumacapitalsocialExtrangero(item: any) {

    debugger
    if (item.idTipoCapitalSocial = 1) { this.modulo1.IcapitalSocialN.total = ((this.modulo1.IcapitalSocialN.publico || 0) + (this.modulo1.IcapitalSocialN.privado || 0)); }
    if (item.idTipoCapitalSocial = 2) { this.modulo1.ICapitalSocialE.total = ((this.modulo1.ICapitalSocialE.publico || 0) + (this.modulo1.ICapitalSocialE.privado || 0)); }

    if ((((this.modulo1.IcapitalSocialN.total || 0) + (this.modulo1.ICapitalSocialE.total || 0)) != 100)) {
      this.toastr.warning("La suma del capital nacional  y  extranjero no es 100 ");
    }
  }


  getCaratulaUnicaCapitalSocial(idCaratulaUnica: any) {

    this.httpCaratula.getCaratulaUnicaCapitalSocial(idCaratulaUnica).subscribe(
      result => {
        debugger
        if (result.length > 0) {
          result.forEach((element: any) => {
            if (element.idTipoCapitalSocial == 1) {

              this.modulo1.IcapitalSocialN = element;

            } else if (element.idTipoCapitalSocial == 2) {

              this.modulo1.ICapitalSocialE = element;

            }

          });
        }
        else {
          this.modulo1.IcapitalSocialN = {

            id:0,
            publico:0,
            privado:0,
            total:0,
            idTipoCapitalSocial:0,
            idCaratulaUnica:0,
          }
          this.modulo1.ICapitalSocialE = {

            id:0,
            publico:0,
            privado:0,
            total:0,
            idTipoCapitalSocial:0,
            idCaratulaUnica:0,
          }



        }},
        err => {
          this.toastr.error("No se pudo cargar la información de capital social");
        }
    );

  }
  meses() {
    if (this.modulo1.IInformacionFuncionamiento.mesesOperacion == 12) {
      this.numeromeses = true;
    } else {
      this.numeromeses = false;
    }


  }

  cambioEstado(item: any) {

    if (this.modulo1.IcaratulaUnica.idEstadoEmpresa == 7) {

      this.editableotroEstado = ((this.modulo1.IcaratulaUnica.idEstadoEmpresa || 0) > 0);

    } else {
      this.editableotroEstado = false;
    }

  }

  //listas de parametros

  getAllTipoVariable() {

    this.httpCaratula.getAllTipoVariable().subscribe(
      result => {

        result.forEach((element: any) => {
          result.id = 0;
          this.httpCaratula.findCodigoCIIUByIdTipoVariable(element.codigo).subscribe(
            result => {

              element.listCIIU = result;
              element.listCIIU.unshift({
                codigo: "0",
                nombre: "Seleccione el codigo CIIU",
                id: 0
              });

            }
          )
        });
        this.listVariable = result;
        console.log("lista de variables:", this.listVariable)
      },
      err => {
        this.toastr.error("No se puedo cargar la lista de tipo de variables ");
      })
  }

  findCodigoCIIUByIdTipoVariable(idTipoOrganizacion: any) {
    this.httpCaratula.findCodigoCIIUByIdTipoVariable(idTipoOrganizacion).subscribe(
      result => {
        this.listCIIUVariable = result;
      },
      err => {
        this.toastr.error("No se puedo cargar la lista de CIIU ");
      }
    )


  }
  getAllTipoOperacion() {
    this.httpCaratula.getAllTipoOperacion().subscribe(
      result => {
        console.log('lista de tipo operacion', result);
        this.listOperacion = result;
        this.listOperacion.forEach(element => {
          debugger
          element.idTipoOperacion = element.id
          element.lista = [{ id: 1, value: "Bienes" }, { id: 2, value: "Servicios" }, { id: 3, value: "Ninguno" }]

        })
        console.log('lista de tipo operacion', this.listOperacion);
      },
      err => {
        this.toastr.error('No se puede cargar la información de operaciones');
      }
    )


  }

  getTipoDocumento() {
    this.httpCaratula.getTipoDocumento().subscribe(
      result => {
        this.listTipoDocumento = result;
      },
      err => {
        this.toastr.error('No se puede cargar la información de tipo de documentos');
      }
    )

  }

  getTipoRegistro() {
    this.httpCaratula.getTipoRegistro().subscribe(
      result => {

        this.listTipoRegMercantil = result;

      },
      err => {
        this.toastr.error('No se puede cargar la información de tipo registro');
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
        this.toastr.error('No se puede cargar la información de deparatamentos');
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
        this.toastr.error('No se puede cargar la información de municipios');
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

        this.toastr.error("No se puedo cargar la lista de estado de empresa ");
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
        this.toastr.error('No se puede cargar la información de departamentos');
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
        this.toastr.error('No se puede cargar la información de municipios');
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
        this.toastr.error('No se puede cargar la información de tipo organización');
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
        this.toastr.error('No se puede cargar la información de subtipo organización');
      }
    )

  }

  getAllTipoIngresosNoOperacionales() {
    this.httpCaratula.getAllTipoIngresosNoOperacionales().subscribe(

      result => {

        this.listNoOper = result;
        this.listNoOper.forEach(element => {
          element.id = 0;
          element.idCaratulaUnica = this.modulo1.IcaratulaUnica.id;
          element.idTipoIngresosNoOperacionales = element.codigo;

        })

      },
      err => {
        this.toastr.error('No se puede cargar la información de ingresos no operacionles');
      }
    )

  }

  sumaNoOperacionales() {
    let suma = 0;
    for (let index = 0; index < this.listNoOper.length - 1; index++) {
      let item = suma;
      suma = item + (this.listNoOper[index].valor || 0);
      this.listNoOper[4].valor = suma;
    }


    //this.listNoOper[4].valor = ((this.listNoOper[0].valor || 0) + (this.listNoOper[1].valor || 0) + (this.listNoOper[2].valor || 0) + (this.listNoOper[3].valor || 0) || 0)

  }

  sumaNovariablesnumeroEstablecimientos() {
    let suma = 0;

    for (let index = 0; index < this.listVariable.length - 1; index++) {
      let item = suma;

      suma = item + (this.listVariable[index].numeroEstablecimientos || 0);
      this.listVariable[12].numeroEstablecimientos = suma;

    }
  }
  sumaNovariablesingreso() {
    let suma = 0;

    for (let index = 0; index < this.listVariable.length - 1; index++) {
      let item = suma;
      suma = item + (this.listVariable[index].ingreso || 0);
      this.listVariable[12].ingreso = suma;
    }
  }
  sumaNovariablespersonalOcupado() {
    let suma = 0;

    for (let index = 0; index < this.listVariable.length - 1; index++) {
      let item = suma;
      suma = item + (this.listVariable[index].personalOcupado || 0);
      this.listVariable[12].personalOcupado = suma;
    }
  }
  sumaNovariablesremuneracion() {
    let suma = 0;

    for (let index = 0; index < this.listVariable.length - 1; index++) {
      let item = suma;
      suma = item + (this.listVariable[index].remuneracion || 0);
      this.listVariable[12].remuneracion = suma;
    }
  }
  sumaNovariablesotrosCostosGastos() {
    let suma = 0;

    for (let index = 0; index < this.listVariable.length - 1; index++) {
      let item = suma;
      suma = item + (this.listVariable[index].otrosCostosGastos || 0);
      this.listVariable[12].otrosCostosGastos = suma;
    }
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
        this.toastr.error('No se puede cargar la información de tipo causa');
      }
    )


  }
  getCaratulaUnicaInformacionFuncionamiento(idCaratulaUnica: any) {

    this.httpCaratula.getCaratulaUnicaInformacionFuncionamiento(idCaratulaUnica).subscribe(
      result => {
        this.modulo1.IInformacionFuncionamiento = result;

        let fechaDiligenciamiento = this.datepipe.transform(this.modulo1.IInformacionFuncionamiento.fechaDiligenciamiento, 'yyyy-MM-dd');
        this.modulo1.IInformacionFuncionamiento.fechaDiligenciamiento = (fechaDiligenciamiento || undefined);

        console.log('fecha de constitucion :', this.modulo1.IInformacionFuncionamiento.fechaDiligenciamiento);



      },
      err => {
        this.toastr.error('No se puede cargar la información');
      }
    );

  }

  tipoDoc(item: any) {

    if (item == "1") {
      this.digitoV = true;
    } else {
      this.digitoV = false;
    }
    console.log('validacon', this.digitoV)

  }
}

