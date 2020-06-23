import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICarrera } from "./icarrera";

@Injectable()
export class CarrerasService {
  
  private apiUrl = this.baseUrl + "api/carreras";
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getCarreras(): Observable<ICarrera[]> {
    console.log(this.apiUrl);
    return this.http.get<ICarrera[]>(this.apiUrl);
  }

  getCarrera(codCarrera: number): Observable<ICarrera> {
    console.log(this.apiUrl);
    return this.http.get<ICarrera>(this.apiUrl + "/" + codCarrera);
  }

  crearCarrera(carrera: ICarrera):Observable<ICarrera>{
    debugger;
    carrera.codCarrera = 0;
    return this.http.post<ICarrera>(this.apiUrl, carrera);
  }

  actualizarCarrera(codCarrera:number, carrera: ICarrera): Observable<ICarrera>
  {
    debugger;
    console.log(codCarrera, carrera);
    console.log(this.apiUrl);
    carrera.codCarrera =+ codCarrera;
    return this.http.put<ICarrera>(this.apiUrl + "/" + codCarrera, carrera);
  }

  deleteCarrera(codCarrera: number): Observable<ICarrera> {
    console.log(this.apiUrl);
    return this.http.delete<ICarrera>(this.apiUrl + "/" + codCarrera);
  }
}
