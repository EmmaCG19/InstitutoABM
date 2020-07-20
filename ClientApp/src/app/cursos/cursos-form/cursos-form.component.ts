import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { CursosService } from "../cursos.service";
import { ProfesoresService } from "src/app/profesores/profesores.service";
import { IProfesor } from "src/app/profesores/iprofesor";
import { ICurso } from "../icurso";

@Component({
  selector: "app-cursos-form",
  templateUrl: "./cursos-form.component.html",
  styleUrls: ["./cursos-form.component.css"],
})
export class CursosFormComponent implements OnInit {
  formGroup: FormGroup;
  modoEdicion: boolean = false;
  codCurso: number;
  profesorSeleccionado: number;

  capacidadMax: number = 30;
  fechaInicioValida: boolean;
  fechaFinValida: boolean;
  listaProfesores: IProfesor[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private profesoresService: ProfesoresService,
    private cursosService: CursosService
  ) {
    this.obtenerProfesores();
    this.cargarFormCurso();
  }

  ngOnInit() {
    //Inicializa los valores del form
    this.formGroup = this.formBuilder.group({
      codCurso: [],
      fechaInicio: [, Validators.required],
      fechaFin: [, Validators.required],
      capacidad: [, [Validators.required, Validators.max(this.capacidadMax)]],
      profesores: [null, [Validators.required]],
    });
  }

  cargarFormCurso() {
    this.route.paramMap.subscribe((params) => {
      this.codCurso = +params.get("codCurso");
    });

    if (isNaN(this.codCurso)) {
      console.log("El formato del codigo del curso no es válido");
      this.router.navigate(["/cursos"]);
    } else {
      if (this.codCurso) {
        this.modoEdicion = true;

        this.cursosService.getCursoById(this.codCurso).subscribe(
          (cursoApi) => this.cargarCurso(cursoApi),
          (error) => this.router.navigate(["/cursos"])
        );
      }
    }
  }

  guardarCurso() {
    //Necesito crear un profesor en base a los valores del form
    let nuevoCurso: ICurso = Object.assign({}, this.formGroup.value);
    nuevoCurso.profesorId = this.formGroup.get("profesores").value;

    console.table(nuevoCurso);

    if (this.modoEdicion) {
      //Edicion
      this.cursosService.actualizarCurso(this.codCurso, nuevoCurso).subscribe(
        (cursoApi) => {
          console.log("Curso guardado");
          this.router.navigate(["/cursos"]);
        },
        (error) => console.log(error)
      );
    } else {
      //Carga
      this.cursosService.agregarCurso(nuevoCurso).subscribe(
        (cursoApi) => {
          console.log("Curso cargado");
          this.router.navigate(["/cursos"]);
        },
        (error) => console.log(error)
      );
    }
  }

  //Cargar datos del profesor en el form
  cargarCurso(curso: ICurso) {
    this.formGroup.patchValue({
      codCurso: curso.codCurso,
      fechaInicio: this.datePipe.transform(curso.fechaInicio, "yyyy-MM-dd"),
      fechaFin: this.datePipe.transform(curso.fechaFin, "yyyy-MM-dd"),
      capacidad: curso.capacidad,
      profesores: curso.profesorId,
    });
  }

  obtenerProfesores() {
    this.profesoresService.getProfesores().subscribe(
      (profesoresApi) => (this.listaProfesores = profesoresApi),
      (error) => console.log(error)
    );
  }

  validarFechaFin() {
    this.fechaFinValida = true;
    let fechaInicio: Date = this.formGroup.controls["fechaInicio"].value;
    let fechaFin: Date = this.formGroup.controls["fechaFin"].value;

    if (CursosFormComponent.compareDate(fechaInicio, fechaFin) == 1)
      this.fechaFinValida = false;
  }

  private static compareDate(date1: Date, date2: Date): number {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    let d1 = new Date(date1);
    let d2 = new Date(date2);

    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;

    // Check if the first is greater than second
    if (d1 > d2) return 1;

    // Check if the first is less than second
    if (d1 < d2) return -1;
  }
}
