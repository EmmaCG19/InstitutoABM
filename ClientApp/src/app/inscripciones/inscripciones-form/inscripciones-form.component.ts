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
import { InscripcionesService } from "../inscripciones.service";

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
  ListaMateriasInscriptas: IMateria[];
  ListaMateriasDisponibles: IMateria[];
  ListaCursosDisponibles: ICurso[];

  alumnoSeleccionado: IAlumno;
  notas: number[] = [];
  notaPrimerParcial: number;
  notaSegundoParcial: number;
  notaFinal: number;
  hayResultados: boolean = true;
  mensajeBusqueda:string;

  constructor(
    private fb: FormBuilder,
    public modalForm: BsModalRef,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private carrerasService: CarrerasService,
    private inscripcionesService: InscripcionesService
  ) {
    this.getAlumnos();
    this.getCursos();
    this.cargarNotas();
  }

  ngOnInit() {
    

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
      this.notas.push(i + 1);
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

  //Obtener inscripciones del alumno
  getMateriasInscriptas() {
    this.alumnosService.getMateriasAlumno(this.nroLegajo).subscribe(
      (materiasApi) => {
        this.ListaMateriasInscriptas = materiasApi;
        console.log("Materias inscriptas OK");
      },

      (error) => console.log(error)
    );
  }

  //Filtro los cursos en aquellos que tengan una materia del plan de carrera del alumno
  getCursosDisponibles() {
    this.mensajeBusqueda = "Carga de cursos en proceso...";
    this.nroLegajo = this.formGroup.controls["alumnos"].value;

    this.disableCursosList();

    if (this.nroLegajo) {
      console.log("NroLegajo: ", this.nroLegajo);
      setTimeout(() => {
        //Obtener los codigos de las materias
        let materiasCarrera: number[] = this.ListaMateriasDisponibles.map(
          (m) => m.codMateria
        );

        let materiasInscriptas: number[] = this.ListaMateriasInscriptas.map(
          (m) => m.codMateria
        );

        //Obtener aquellos cursos cuya materia pertenezcan a la carrera y no esté siendo cursada
        this.ListaCursosDisponibles = this.ListaCursos.filter((c) =>
          materiasCarrera.includes(c.profesor.codMateria)
        ).filter((c) => !materiasInscriptas.includes(c.profesor.codMateria));

        //Habilito la lista
        this.formGroup.controls["cursosDisponibles"].enable();

        if (this.ListaCursosDisponibles.length) 
            this.hayResultados = true;
        else  
            this.mensajeBusqueda = "No existen cursos disponibles para este alumno";      
        
      }, 2000);

      this.getMateriasCarrera();
      this.getMateriasInscriptas();
    } else {
      console.log("Es un legajo invalido");
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

  //Carga o modifica una inscripcion
  guardarInscripcion() {
    let nuevaInscripcion: IInscripcion = Object.assign(
      {},
      this.formGroup.value
    );

    //Cargar el codigo del curso y el nro legajo
    nuevaInscripcion.nroLegajo = this.nroLegajo;
    nuevaInscripcion.codCurso = this.formGroup.get("cursosDisponibles").value;

    console.dir(nuevaInscripcion);
    debugger;

    if (this.modoEdicion) console.log("Inscripcion editada");
    else {
      this.inscripcionesService.agregarInscripcion(nuevaInscripcion).subscribe(
        (inscripcionApi) => console.log("Inscripcion creada"),
        (error) => console.log(error)
      );

      //Hide modal
      this.modalForm.hide();
    }
  }

  //Deshabilito la lista de cursos hasta que se hayan cargado
  private disableCursosList() {
    // this.formGroup.controls["cursosDisponibles"].setValue(null);
    // this.formGroup.controls["cursosDisponibles"].disable();
    this.formGroup.controls["cursosDisponibles"].reset();
    this.hayResultados = false;
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
4) El alumno no tiene que estar inscripto en el mismo con anterioridad.

CONDICIONES FECHA ACTUAL Y CAPACIDAD:

- FILTRAR DIRECTAMENTE Y QUE EL USUARIO NO SE ENTERE PORQUE RAZON NO APARECE EL CURSO
- DEJAR QUE EL USUARIO SELECCIONE Y AL MOMENTO DE GUARDAR QUE SALTE LA ALERTA CORRESPONDIENTE
*/

//Si pepito tiene en su lista de inscripciones a un curso que como materia tiene matematica, no va a estar inscripto en la misma

//TEST
// console.log("Materias disponibles: ");
// console.log(this.ListaMateriasDisponibles);
// console.log("Materias Inscriptas: ");
// console.log(this.ListaMateriasInscriptas);
// console.log("Cursos disponibles: ");
// console.log(this.ListaCursosDisponibles);

// console.log("Modo Edicion: ", this.modoEdicion);
// console.log("NroLegajo: ", this.nroLegajo);
// console.log("CodCurso: ", this.codCurso);
// console.log("title: ", this.title);