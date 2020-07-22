import { Component, OnInit } from "@angular/core";
import { IProfesor } from "./IProfesor";
import { ProfesoresService } from "./profesores.service";
import { IMateria } from "../materias/imateria";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NoDeleteModalComponent } from "../no-delete-modal/no-delete-modal.component";

@Component({
  selector: "app-profesores",
  templateUrl: "./profesores.component.html",
  styleUrls: ["./profesores.component.css"],
})
export class ProfesoresComponent implements OnInit {
  ListaProfesores: IProfesor[];
  modalError: BsModalRef;

  constructor(private profesoresService: ProfesoresService, 
    public modalService: BsModalService) {}

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

  eliminarProfesor(codProfesor: number) {
    setTimeout( () => this.getProfesores(), 1000);

    this.profesoresService.eliminarProfesor(codProfesor).subscribe(
      (profesorEliminado) => {
        console.dir(profesorEliminado);
      },
      (error) => console.log(error)
    );
  }

  eliminarProfesorValido(profesorId: number) {
    this.profesoresService.getCursosById(profesorId).subscribe(
      (cursosApi) => {
        console.log(cursosApi);

        if (cursosApi.length) 
          this.openModalError();
        else 
          this.eliminarProfesor(profesorId);
      },
      (error) => console.log(error)
    );
  }

  openModalError() {
    const initialState = {
      mensajeError: "El profesor está asignado a un curso"
    };

    this.modalError = this.modalService.show(NoDeleteModalComponent, {
      initialState,
    });
  }
}
