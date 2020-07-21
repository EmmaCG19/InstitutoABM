import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MateriasService } from "src/app/materias/materias.service";
import { InscripcionesService } from "../inscripciones.service";
import { AlumnosService } from "src/app/alumnos/alumnos.service";
import { IInscripcion } from "../iinscripcion";
import { IAlumno } from "src/app/alumnos/IAlumno";
import { IMateria } from "src/app/materias/imateria";

@Component({
  selector: "app-inscripcion-alumnos",
  templateUrl: "./inscripcion-alumnos.component.html",
  styleUrls: ["./inscripcion-alumnos.component.css"],
})
export class InscripcionAlumnosComponent implements OnInit {
  formGroup: FormGroup;
  alumnoSeleccionado: number;
  ListaAlumnos: IAlumno[] = [];
  InscripcionesAlumno: IInscripcion[] = [];

  constructor(
    public fb: FormBuilder,
    public materiasService: MateriasService,
    public inscripcionesService: InscripcionesService,
    public alumnosService: AlumnosService
  ) {
    this.getAlumnos();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      alumnos: [null, [Validators.required]],
    });
  }

  getAlumnos() {
    this.alumnosService.getAlumnos().subscribe(
      (alumnosApi) => (this.ListaAlumnos = alumnosApi),
      (error) => console.log(error)
    );
  }

  //Si el alumno seleccionado es nulo, no mostrar ninguna lista.
  obtenerInscripciones() {
    this.alumnoSeleccionado = this.formGroup.controls["alumnos"].value;

    if (this.alumnoSeleccionado) {
      this.inscripcionesService
        .getInscripcionesPorAlumno(this.alumnoSeleccionado)
        .subscribe(
          (inscripcionesApi) => (this.InscripcionesAlumno = inscripcionesApi),
          (error) => console.log(error)
        );
    }
  }

  eliminarInscripcion( codCurso:number, nroLegajo:number){
    
    setTimeout(() => this.obtenerInscripciones(), 2000);
    
    this.inscripcionesService.eliminarInscripcion(codCurso, nroLegajo)
    .subscribe(() => console.log("Inscripcion eliminada OK"),
     error => console.log(error));

  }
}
