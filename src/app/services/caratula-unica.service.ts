import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CaratulaUnicaService {
  private API_SERV = 'http://localhost:8080/modulo1/';
  public token!: any;
  public username!: any;



  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService,) {

    this.token = (this.tokenStorage.getUser().tokenType + ' ' + this.tokenStorage.getToken());
    this.username = this.tokenStorage.getUser().username;


  }



  //guardar caratula 
  public guardarCaratula(caratula: any): Observable<any> {
    debugger
    return this.httpClient.post(this.API_SERV + 'caratulaUnica', caratula, { headers: { Authorization: this.token } });
  }
  //guardarInformacionFuncionamiento
  public guardarInformacionFuncionamiento(InformacionFuncionamiento: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarInformacionFuncionamiento/', InformacionFuncionamiento, { headers: { Authorization: this.token } });
  }
  //guradar direccion
  public guardarDireccion(direccion: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarDireccion/', direccion, { headers: { Authorization: this.token } });
  }

  //guardarCapitalSocial
  public guardarCapitalSocial(CapitalSocial: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarCapitalSocial/', CapitalSocial, { headers: { Authorization: this.token } });
  }
  //getCaratulaUnicaCapitalSocial
  public getCaratulaUnicaCapitalSocial(idCaratulaUnica: any): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaCapitalSocial/', {
      headers: { Authorization: this.token }, params: { idCaratulaUnica: idCaratulaUnica },
    });
  }
  //guardarVariableEmpresa

  public guardarVariableEmpresa(variableEmpresa: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarVariableEmpresa/', variableEmpresa,{ headers: { Authorization: this.token } });
  }

  //guardarIngresosNoOperacionales
  public guardarIngresosNoOperacionales(IngresosNoOperacioneales: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarIngresosNoOperacionales/', IngresosNoOperacioneales,{ headers: { Authorization: this.token } });
  }
  //getCaratulaUnicaIngresosNoOperacionales
  public getCaratulaUnicaIngresosNoOperacionales(idCaratulaUnica: any): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaIngresosNoOperacionales/', {
      headers: { Authorization: this.token }, params: { idCaratulaUnica: idCaratulaUnica },
    });
  }
  //getCaratulaUnicaOperacion
  public getCaratulaUnicaOperacion(idCaratulaUnica: any): Observable<any> {
    debugger
    return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaOperacion/', {
      headers: { Authorization: this.token }, params: { idCaratulaUnica: idCaratulaUnica }
    });
  }
  //guardarOperacion
  public guardarOperacion(operacion: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarOperacion/', operacion,{ headers: { Authorization: this.token } });
  }

  //getAllTipoOperacion

  public getAllTipoOperacion(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoOperacion/', { headers: { Authorization: this.token } });
  }


  //obtener la caratula unica 
  public cargarCaratulaUnica(): Observable<any> {

    return this.httpClient.get(this.API_SERV + 'cargarCaratulaUnica/', {
      headers: { Authorization: this.token }, params: { usuario: this.username },
    });
  }
  //lista de tipo de direcciones
  public getCaratulaUnicaDirecciones(idCaratulaUnica: any): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaDirecciones/', {
      headers: { Authorization: this.token }, params: { idCaratulaUnica: idCaratulaUnica },
    });
  }

  //getCaratulaUnicaVariableEmpresa

  public getCaratulaUnicaVariableEmpresa(idCaratulaUnica: any): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaVariableEmpresa/', {
      headers: { Authorization: this.token }, params: { idCaratulaUnica: idCaratulaUnica },
    });
  }
  // lista tipo de docuemnto
  public getTipoDocumento(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoDocumento/', { headers: { Authorization: this.token } });
  }

  //lista de tipo de registro
  public getTipoRegistro(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoRegistroMercantil/', { headers: { Authorization: this.token } });
  }


  //getAllTipoIngresosNoOperacionales

  public getAllTipoIngresosNoOperacionales(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoIngresosNoOperacionales/', { headers: { Authorization: this.token }});
  }
  //findAllEstadoEmpresa

  public findAllEstadoEmpresa(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'findAllEstadoEmpresa/', { headers: { Authorization: this.token } });
  }

  //LISTA DE DEPARTAMENTOS
  public getDepartamento(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'findAllDepartamento/', { headers: { Authorization: this.token } });
  }
  //LISTA DE MUNICIPIOS
  public getMunicipios(idDepto: any): Observable<any> {

    return this.httpClient.get(
      this.API_SERV + 'findMunicipioByIdDepartamento/',
      { headers: { Authorization: this.token }, params: { idDepartamento: idDepto } },
    );
  }
  //LISTA DE DEPARTAMENTOS
  public getTipoOrganizacion(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoOrganizacion/', { headers: { Authorization: this.token } });
  }

  public getAllTipoCausa(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoCausa/', { headers: { Authorization: this.token } });
  }

  //findSubTipoOrganizacionByIdTipoOrganizacion
  public findSubTipoOrganizacionByIdTipoOrganizacion(
    idTipoOrganizacion: any
  ): Observable<any> {
    return this.httpClient.get(
      this.API_SERV + 'findSubTipoOrganizacionByIdTipoOrganizacion/',
      { headers: { Authorization: this.token }, params: { idTipoOrganizacion: idTipoOrganizacion } }
    );
  }
  //getAllTipoVariable

  public getAllTipoVariable(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoVariable/', { headers: { Authorization: this.token } });
  }

  //findCodigoCIIUByIdTipoVariable
  public findCodigoCIIUByIdTipoVariable(idTipoVariable: any): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'findCodigoCIIUByIdTipoVariable/', { headers: { Authorization: this.token }, params: { idTipoVariable: idTipoVariable } });
  }

  //getCaratulaUnicaInformacionFuncionamiento
  public getCaratulaUnicaInformacionFuncionamiento(
    idCaratulaUnica: any
  ): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaInformacionFuncionamiento/', {
      headers: { Authorization: this.token }, params: { idCaratulaUnica: idCaratulaUnica },
    });

  }
}
