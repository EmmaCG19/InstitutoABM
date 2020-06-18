import {IPersona} from "../IPersona";
import {ICurso} from "../cursos/ICurso";
import {IEspecialidad} from "../IEspecialidad";

export interface IAlumno extends IPersona {
    nroLegajo:number;
    fechaDeIngreso:Date;
    curso: ICurso;
    nivel: number;
    especialidad: IEspecialidad;
}

