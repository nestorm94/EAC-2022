import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@Angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CaratulaUnicaService {

    private API_SERV = "http://localhost:8080/modulo1/caratulaUnica";

    constructor(private httpClient: HttpClient) { }

    public guardarCaratula(caratula: any): Observable<any> {
        return this.httpClient.post(this.API_SERV, caratula);
    }
}