import { IAlumno } from "../alumnos/IAlumno";
import { ICurso } from "../cursos/icurso";

export interface Iinscripcion {
  codCurso: number;
  curso: ICurso;
  nroLegajo: number;
  alumno: IAlumno;
  notaPrimerParcial: number;
  notaSegundoParcial: number;
  notaFinal: number;
  fechaInscripcion: Date;
}
