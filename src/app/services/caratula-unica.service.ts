import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CaratulaUnicaService {

  
    private API_SERV = "http://localhost:8080/modulo1/";
    

    constructor(private httpClient: HttpClient) { }

    public guardarCaratula(caratula: any): Observable<any> {
      debugger
      console.log(caratula);
      return this.httpClient.post(this.API_SERV+"caratulaUnica", caratula);
  }

    
}