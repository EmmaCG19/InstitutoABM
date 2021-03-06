import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InscripcionesService } from "../inscripciones.service";
import { CursosService } from "src/app/cursos/cursos.service";
import { IInscripcion } from "../iinscripcion";
import { ICurso } from "src/app/cursos/icurso";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { InscripcionesFormComponent } from "../inscripciones-form/inscripciones-form.component";

@Component({
  selector: "app-inscripciones-cursos",
  templateUrl: "./inscripciones-cursos.component.html",
  styleUrls: ["./inscripciones-cursos.component.css"],
})
export class InscripcionesCursosComponent implements OnInit {
  formGroup: FormGroup;
  cursoSeleccionado: number;
  ListaCursos: ICurso[] = [];
  InscripcionesCurso: IInscripcion[] = [];
  modalForm: BsModalRef;

  constructor(
    public fb: FormBuilder,
    public inscripcionesService: InscripcionesService,
    public cursosService: CursosService,
    private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef
  ) {
    this.getCursos();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      cursos: [null, [Validators.required]],
    });
  }

  getCursos() {
    this.cursosService.getCursos().subscribe(
      (cursosApi) => (this.ListaCursos = cursosApi),
      (error) => console.log(error)
    );
  }

  //Si el alumno seleccionado es nulo, no mostrar ninguna lista.
  obtenerInscripciones() {
    this.cursoSeleccionado = this.formGroup.controls["cursos"].value;

    if (this.cursoSeleccionado) {
      this.inscripcionesService
        .getInscripcionesPorCurso(this.cursoSeleccionado)
        .subscribe(
          (inscripcionesApi) => (this.InscripcionesCurso = inscripcionesApi),
          (error) => console.log(error)
        );
    }
  }

  eliminarInscripcion(codCurso: number, nroLegajo: number) {
    setTimeout(() => this.obtenerInscripciones(), 2000);

    this.inscripcionesService
      .eliminarInscripcion(codCurso, nroLegajo)
      .subscribe(
        () => console.log("Inscripcion eliminada OK"),
        (error) => console.log(error)
      );
  }

  openModalForm(nroLegajo: number, codCurso: number) {
    //Mediante el initial state podemos pasarle el alumno y curso seleccionado al modal-form
    const initialState = {
      modoEdicion: true,
      nroLegajo: nroLegajo,
      codCurso: codCurso,
      title: "Modificar Inscripcion",
    };
    // this.modalForm.content.closeBtnName = 'Close';

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
