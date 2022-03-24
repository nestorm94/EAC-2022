import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CaratulaUnicaService {
  private API_SERV = 'http://localhost:8080/modulo1/';

  constructor(private httpClient: HttpClient) { }

  //guardar caratula 
  public guardarCaratula(caratula: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'caratulaUnica', caratula);
  }
  //guardarInformacionFuncionamiento
  public guardarInformacionFuncionamiento(InformacionFuncionamiento: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarInformacionFuncionamiento/', InformacionFuncionamiento);
  }
  //guradar direccion
  public guardarDireccion(direccion: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarDireccion/', direccion);
  }
  //obtener la caratula unica 
  public cargarCaratulaUnica(): Observable<any> {
    
    return this.httpClient.get(this.API_SERV + 'cargarCaratulaUnica/', {
      params: { usuario: 'Nestorm' },
    });
  }
//lista de tipo de direcciones
  public getCaratulaUnicaDirecciones(idCaratulaUnica: any): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaDirecciones/', {
      params: { idCaratulaUnica: idCaratulaUnica },
    });
  }

  // lista tipo de docuemnto
  public getTipoDocumento(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoDocumento/');
  }

  //lista de tipo de registro
  public getTipoRegistro(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoRegistroMercantil/');
  }

  
  //getAllTipoIngresosNoOperacionales

  public getAllTipoIngresosNoOperacionales(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoIngresosNoOperacionales/');
  }
  //findAllEstadoEmpresa

  public findAllEstadoEmpresa(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'findAllEstadoEmpresa/');
  }

  //LISTA DE DEPARTAMENTOS
  public getDepartamento(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'findAllDepartamento/');
  }
  //LISTA DE MUNICIPIOS
  public getMunicipios(idDepto: any): Observable<any> {
    
    return this.httpClient.get(
      this.API_SERV + 'findMunicipioByIdDepartamento/',
      { params: { idDepartamento: idDepto } }
    );
  }
  //LISTA DE DEPARTAMENTOS
  public getTipoOrganizacion(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoOrganizacion/');
  }

  public getAllTipoCausa(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoCausa/');
  }

  //findSubTipoOrganizacionByIdTipoOrganizacion
  public findSubTipoOrganizacionByIdTipoOrganizacion(
    idTipoOrganizacion: any
  ): Observable<any> {
    return this.httpClient.get(
      this.API_SERV + 'findSubTipoOrganizacionByIdTipoOrganizacion/',
      { params: { idTipoOrganizacion: idTipoOrganizacion } }
    );
  }

  //getCaratulaUnicaInformacionFuncionamiento
  public getCaratulaUnicaInformacionFuncionamiento(
    idCaratulaUnica: any
  ): Observable<any> {
      return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaInformacionFuncionamiento/', {
        params: { idCaratulaUnica: idCaratulaUnica },
      });

  }
}
