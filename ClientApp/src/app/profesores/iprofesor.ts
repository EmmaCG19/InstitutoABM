import { IPersona } from "../IPersona";
import { IMateria } from "../materias/imateria";

export interface IProfesor extends IPersona {
    id: number;
    codMateria: number;
}
