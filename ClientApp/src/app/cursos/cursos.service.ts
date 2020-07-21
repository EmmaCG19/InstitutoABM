import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICurso } from "./icurso";
import { IMateria } from "../materias/imateria";

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl: string = this.baseUrl + "api/cursos";

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getCursos(): Observable<ICurso[]> {
    console.log(this.apiUrl);
    return this.http.get<ICurso[]>(this.apiUrl);
  }

  getCursoById(codCurso: number): Observable<ICurso> {
    console.log(this.apiUrl);
    return this.http.get<ICurso>(this.apiUrl + "/" + codCurso);
  }

  getMateriaCurso(codCurso:number):Observable<IMateria>{
    console.log(this.apiUrl);
    return this.http.get<IMateria>(this.apiUrl + "/" + codCurso + "/materia");
  }

  agregarCurso(curso: ICurso): Observable<ICurso> {
    curso.codCurso = 0;
    return this.http.post<ICurso>(this.apiUrl, curso);
  }

  actualizarCurso(
    codCurso: number,
    curso: ICurso
  ): Observable<ICurso> {
    curso.codCurso = +codCurso;
    return this.http.put<ICurso>(this.apiUrl + "/" + codCurso, curso);
  }

  eliminarCurso(codCurso: number): Observable<ICurso> {
    return this.http.delete<ICurso>(this.apiUrl + "/" + codCurso);
  }
}
