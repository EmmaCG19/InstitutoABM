import {IPersona} from "../IPersona";

export interface IAlumno extends IPersona {
    nroLegajo:number;
    fechaIngreso:Date;
    codCarrera:number;
}

