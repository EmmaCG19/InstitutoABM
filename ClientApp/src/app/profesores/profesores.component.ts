import { Component, OnInit } from "@angular/core";
import { IProfesor } from "./IProfesor";
import { ProfesoresService } from "./profesores.service";
import { IMateria } from "../materias/imateria";

@Component({
  selector: "app-profesores",
  templateUrl: "./profesores.component.html",
  styleUrls: ["./profesores.component.css"],
})
export class ProfesoresComponent implements OnInit {
  ListaProfesores: IProfesor[];

  constructor(private profesoresService: ProfesoresService) {}

  ngOnInit() {
    this.getProfesores();
  }

  getProfesores() {
    this.profesoresService.getProfesores().subscribe(
      (profesor) => (this.ListaProfesores = profesor),
      (error) => console.log(error)
    );
  }

  getMateria(codProfesor: number): string {
    let nombreMateria: string;
    this.profesoresService.getMateriaProfesor(codProfesor).subscribe(
      (m) => (nombreMateria = m.nombre),
      (error) => console.log(error)
    );

    return nombreMateria;
  }

  //FALTA DELETE PROFESOR
  eliminarProfesor(codProfesor: number) {
    this.profesoresService.eliminarProfesor(codProfesor).subscribe(
      (profesorEliminado) => {
        console.dir(profesorEliminado);
      },
      (error) => console.log(error)
    );
  }
}
