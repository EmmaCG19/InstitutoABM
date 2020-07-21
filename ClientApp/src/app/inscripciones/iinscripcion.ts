import { IAlumno } from "../alumnos/IAlumno";
import { ICurso } from "../cursos/icurso";

export interface IInscripcion {
  codCurso: number;
  curso: ICurso;
  nroLegajo: number;
  alumno: IAlumno;
  notaPrimerParcial: number | null;
  notaSegundoParcial: number | null;
  notaFinal: number | null;
  fechaInscripcion: Date;
}
