import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IAlumno } from "./IAlumno";

@Injectable()
export class AlumnosService {
  private apiUrl = this.baseUrl + "api/alumnos";
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getAlumnos(): Observable<IAlumno[]> {
    console.log(this.apiUrl);
    return this.http.get<IAlumno[]>(this.apiUrl);
  }

  getAlumno(nroLegajo:number):Observable<IAlumno>
  {
    console.log(this.apiUrl);
    return this.http.get<IAlumno>(this.apiUrl +"/"+ nroLegajo);
  }

  // actualizarAlumno(nroLegajo:number, alumno: IAlumno): Observable<IAlumno>
  // {
  //   console.log(this.apiUrl);

  // }

  deleteAlumno(nroLegajo:number):Observable<IAlumno>{
    console.log(this.apiUrl);
    return this.http.delete<IAlumno>(this.apiUrl +"/"+ nroLegajo);
 }
 
}
