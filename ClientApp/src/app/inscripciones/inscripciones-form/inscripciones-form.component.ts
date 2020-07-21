import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlumnosService } from "src/app/alumnos/alumnos.service";
import { CursosService } from "src/app/cursos/cursos.service";
import { IAlumno } from "src/app/alumnos/IAlumno";
import { ICurso } from "src/app/cursos/icurso";
import { BsModalRef } from "ngx-bootstrap/modal";
import { CarrerasService } from "src/app/carreras/carreras.service";
import { IMateria } from "src/app/materias/imateria";
import { IInscripcion } from "../iinscripcion";

@Component({
  selector: "app-inscripciones-form",
  templateUrl: "./inscripciones-form.component.html",
  styleUrls: ["./inscripciones-form.component.css"],
})
export class InscripcionesFormComponent implements OnInit {
  //Modal
  codCurso: number;
  nroLegajo: number;
  modoEdicion: boolean;
  title: string;

  formGroup: FormGroup;
  ListaAlumnos: IAlumno[];
  ListaCursos: ICurso[];
  ListaCursosDisponibles: ICurso[] = [];
  ListaMateriasDisponibles: IMateria[] = [];

  alumnoSeleccionado: IAlumno;
  inscripcionSeleccionada: IInscripcion;
  notas: number[] = [];
  notaPrimerParcial: number;
  notaSegundoParcial: number;
  notaFinal: number;

  constructor(
    private fb: FormBuilder,
    public modalForm: BsModalRef,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private carrerasService: CarrerasService
  ) {
    this.getAlumnos();
    this.getCursos();
    this.cargarNotas();
  }

  ngOnInit() {
    // console.log("Modo Edicion: ", this.modoEdicion);
    // console.log("NroLegajo: ", this.nroLegajo);
    // console.log("CodCurso: ", this.codCurso);
    // console.log("title: ", this.title);

    this.formGroup = this.fb.group({
      alumnos: [this.nroLegajo, Validators.required],
      cursosDisponibles: [this.codCurso, Validators.required],
      notaPrimerParcial: [null],
      notaSegundoParcial: [null],
      notaFinal: [null],
      fechaInscripcion: [, Validators.required],
    });

    //CARGAR FORM SI MODO EDICION
    if (this.modoEdicion) {
      this.cargarForm();
    }
  }

  cargarNotas() {
    for (let i = 0; i < 10; i++) {
      this.notas.push(i+1);
    }
  }

  getAlumnos() {
    this.alumnosService.getAlumnos().subscribe(
      (alumnosApi) => (this.ListaAlumnos = alumnosApi),
      (error) => console.log(error)
    );
  }

  getCursos() {
    this.cursosService.getCursos().subscribe(
      (cursosApi) => (this.ListaCursos = cursosApi),
      (error) => console.log(error)
    );
  }

  //Filtro los cursos en aquellos que tengan una materia del plan de carrera del alumno
  getCursosDisponibles() {
    this.nroLegajo = this.formGroup.controls["alumnos"].value;

    if (this.nroLegajo) {
      console.log("NroLegajo: ", this.nroLegajo);
      setTimeout(() => {
        let codMaterias: number[] = this.ListaMateriasDisponibles.map(
          (m) => m.codMateria
        );

        this.ListaCursosDisponibles = this.ListaCursos.filter((c) =>
          codMaterias.includes(c.profesor.codMateria)
        );

        // console.log("Lista de materias disponibles:");
        // console.log(this.ListaMateriasDisponibles);
        // console.log("Lista cursos disponibles");
        // console.log(this.ListaCursosDisponibles);
      }, 2000);

      this.getMateriasCarrera();
    } else {
      console.log("Es una legajo invalido");
      this.ListaCursosDisponibles = [];
    }
  }

  //Obtengo las materias de una carrera
  getMateriasCarrera() {
    setTimeout(() => {
      this.carrerasService
        .getMateriasCarrera(this.alumnoSeleccionado.codCarrera)
        .subscribe(
          (materiasApi) => (this.ListaMateriasDisponibles = materiasApi),
          (error) => console.log(error)
        );
    }, 1000);

    this.getAlumnoSeleccionado();
  }

  //Obtengo los datos del alumno
  getAlumnoSeleccionado() {
    this.alumnosService.getAlumno(this.nroLegajo).subscribe(
      (alumnoApi) => (this.alumnoSeleccionado = alumnoApi),
      (error) => console.log(error)
    );
  }

  cargarForm() {
    this.formGroup;
  }

  //Tener en cuenta el modoEdicion para cargar o editar
  guardarInscripcion() {
    if (this.modoEdicion) console.log("Inscripcion editada");
    else console.log("Inscripcion creada");
  }
}

/*
Notas:
Si la materia es promocionable y el alumno tiene dos notas mas de siete, 
la nota del final no es necesaria

Tengo que obtener aquellos cursos que tengan una materia 
que pertenezca a la carrera del alumno

CURSO DISPONIBLE:
1) La materia del curso tiene que estar en la carrera del alumno
2) La fecha actual no puede ser mayor a la fecha de finalizacion del curso
3) La cantidad de inscriptos no puede ser mayor a la capacidad del curso.
*/

// this.ListaCursosDisponibles = this.ListaCursos.filter((c) =>
// this.ListaMateriasDisponibles.includes(c.profesor.materia)
// );
