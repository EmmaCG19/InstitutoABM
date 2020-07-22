  import { Component, OnInit } from "@angular/core";
  import { FormGroup, FormBuilder, Validators } from "@angular/forms";
  import { MateriasService } from "src/app/materias/materias.service";
  import { InscripcionesService } from "../inscripciones.service";
  import { AlumnosService } from "src/app/alumnos/alumnos.service";
  import { IInscripcion } from "../iinscripcion";
  import { IAlumno } from "src/app/alumnos/IAlumno";
  import { IMateria } from "src/app/materias/imateria";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { InscripcionesFormComponent } from "../inscripciones-form/inscripciones-form.component";

  @Component({
    selector: "app-inscripcion-alumnos",
    templateUrl: "./inscripcion-alumnos.component.html",
    styleUrls: ["./inscripcion-alumnos.component.css"],
  })
  export class InscripcionAlumnosComponent implements OnInit {
    formGroup: FormGroup;
    modalForm: BsModalRef;
    alumnoSeleccionado: number;
    ListaAlumnos: IAlumno[] = [];
    InscripcionesAlumno: IInscripcion[] = [];

    constructor(
      public fb: FormBuilder,
      public materiasService: MateriasService,
      public inscripcionesService: InscripcionesService,
      public alumnosService: AlumnosService,
      public modalService: BsModalService
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

    openModalForm(nroLegajo: number, codCurso: number) {
      //Mediante el initial state podemos pasarle el alumno y curso seleccionado al modal-form
      const initialState = {
        modoEdicion: true,
        nroLegajo: nroLegajo,
        codCurso: codCurso,
        title: "Modificar Inscripcion",
      };

      //Hay que pasarle el form-component como argumento
      this.modalForm = this.modalService.show(InscripcionesFormComponent, {
        initialState,
      });

      this.actualizarContenido();
      
    }

    //Detecta cuando se cierra el modal y actualiza los cambios
    actualizarContenido() {
      this.modalService.onHide.subscribe(
        () => {
          this.obtenerInscripciones();
        },
        (error) => console.log(error)
      );
    }
  }
