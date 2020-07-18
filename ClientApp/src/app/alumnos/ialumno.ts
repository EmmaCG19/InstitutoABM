import {IPersona} from "../ipersona";

export interface IAlumno extends IPersona {
    nroLegajo:number;
    fechaIngreso:Date;
    codCarrera:number;
}

