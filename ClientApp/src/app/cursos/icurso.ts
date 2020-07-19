import { IProfesor } from "../profesores/IProfesor";

export interface ICurso {
    codCurso:number;
    profesorId:number;
    profesor: IProfesor;
    fechaInicio: Date;
    fechaFin: Date;
    capacidad:number;
}
