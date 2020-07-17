import { IPersona } from "../ipersona";
import { IMateria } from "../materias/imateria";

export interface IProfesor extends IPersona {
  profesorId: number;
  codMateria: number;
  materia: IMateria;
}
