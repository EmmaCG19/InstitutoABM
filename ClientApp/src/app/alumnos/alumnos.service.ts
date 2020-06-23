import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IAlumno } from "./ialumno";

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

  getAlumno(nroLegajo: number): Observable<IAlumno> {
    console.log(this.apiUrl);
    return this.http.get<IAlumno>(this.apiUrl + "/" + nroLegajo);
  }

  crearAlumno(alumno: IAlumno):Observable<IAlumno>{
    alumno.nroLegajo = 0;
    debugger;
    return this.http.post<IAlumno>(this.apiUrl, alumno);
  }

  actualizarAlumno(nroLegajo:number, alumno: IAlumno): Observable<IAlumno>
  {
    debugger;
    console.log(nroLegajo, alumno);
    console.log(this.apiUrl);
    alumno.nroLegajo =+ nroLegajo;
    return this.http.put<IAlumno>(this.apiUrl + "/" + nroLegajo, alumno);
  }

  deleteAlumno(nroLegajo: number): Observable<IAlumno> {
    console.log(this.apiUrl);
    return this.http.delete<IAlumno>(this.apiUrl + "/" + nroLegajo);
  }
}
