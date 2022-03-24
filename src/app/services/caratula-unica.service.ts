import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CaratulaUnicaService {
  private API_SERV = 'http://localhost:8080/modulo1/';

  constructor(private httpClient: HttpClient) { }

  public guardarCaratula(caratula: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'caratulaUnica', caratula);
  }
  public guardarDireccion(direccion: any): Observable<any> {
    return this.httpClient.post(this.API_SERV + 'guardarDireccion/', direccion);
  }
  public cargarCaratulaUnica(): Observable<any> {
    debugger;
    return this.httpClient.get(this.API_SERV + 'cargarCaratulaUnica/', {
      params: { usuario: 'Nestorm' },
    });
  }

  public getCaratulaUnicaDirecciones(idCaratulaUnica: any): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getCaratulaUnicaDirecciones/', {
      params: { idCaratulaUnica: idCaratulaUnica },
    });
  }

  public getTipoDocumento(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoDocumento/');
  }
  public getTipoRegistro(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoRegistroMercantil/');
  }

  
  //getAllTipoIngresosNoOperacionales

  public getAllTipoIngresosNoOperacionales(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'getAllTipoIngresosNoOperacionales/');
  }

  public getDepartamento(): Observable<any> {
    return this.httpClient.get(this.API_SERV + 'findAllDepartamento/');
  }
  public getMunicipios(idDepto: any): Observable<any> {
    debugger;
    return this.httpClient.get(
      this.API_SERV + 'findMunicipioByIdDepartamento/',
      { params: { idDepartamento: idDepto } }
    );
  }
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
}
