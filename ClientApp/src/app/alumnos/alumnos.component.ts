import { Component, OnInit } from "@angular/core";
import { IAlumno } from "./IAlumno";
import { AlumnosService } from "./alumnos.service";
import { InscripcionesService } from "../inscripciones/inscripciones.service";
import { ICurso } from "../cursos/icurso";
import { IInscripcion } from "../inscripciones/iinscripcion";
import { NoDeleteModalComponent } from "../no-delete-modal/no-delete-modal.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-alumnos",
  templateUrl: "./alumnos.component.html",
  styleUrls: ["./alumnos.component.css"],
})
export class AlumnosComponent implements OnInit {
  ListadoAlumnos: IAlumno[];
  ListaInscripcionesAlumno: IInscripcion[];
  modalError: BsModalRef;

  constructor(
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesService,
    public modalService: BsModalService
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnosService.getAlumnos().subscribe(
      (alumnosEnApi) => (this.ListadoAlumnos = alumnosEnApi),
      (error) => console.error(error)
    );
  }

  eliminarAlumno(nroLegajo: number) {
    setTimeout(() => this.cargarAlumnos(), 1000);
    this.alumnosService.deleteAlumno(nroLegajo).subscribe(
      (alumno) => console.log("Alumno eliminado"),
      (error) => console.log(error)
    );
  }

  eliminarAlumnoValido(nroLegajo: number) {
    this.inscripcionesService.getInscripcionesPorAlumno(nroLegajo).subscribe(
      (cursosApi) => {
        console.log(cursosApi);

        debugger;
        if (cursosApi.length) this.openModalError();
        else this.eliminarAlumno(nroLegajo);
      },
      (error) => console.log(error)
    );
  }

  openModalError() {
    const initialState = {
      mensajeError: "El alumno está inscripto a un curso",
    };

    this.modalError = this.modalService.show(NoDeleteModalComponent, {
      initialState,
    });
  }
}
