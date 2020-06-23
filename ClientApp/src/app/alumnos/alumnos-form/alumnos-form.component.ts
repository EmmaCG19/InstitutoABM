import { Component, OnInit, Type } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAlumno } from "../IAlumno";
import { typeofExpr, THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { FormGroup, FormBuilder } from "@angular/forms";

import { DatePipe } from "@angular/common";
import { AlumnosService } from "../alumnos.service";
import { CarrerasService } from "../../carreras/carreras.service";
import { ICarrera } from "../../carreras/icarrera";

@Component({
  selector: "app-alumnos-form",
  templateUrl: "./alumnos-form.component.html",
  styleUrls: ["./alumnos-form.component.css"],
})
export class AlumnosFormComponent implements OnInit {
  modoEdicion: boolean = false;
  legajo: number;
  formGroup: FormGroup;
  carreraSeleccionada: number;
  listaCarreras: ICarrera[];

  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private carrerasService: CarrerasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.obtenerCarreras();
    this.cargarFormAlumno();
  }

  ngOnInit() {
    //Inicializa los valores del form
    this.formGroup = this.formBuilder.group({
      nroLegajo: "",
      nombre: "",
      apellido: "",
      nroDocumento: "",
      fechaDeNacimiento: "",
      email: "",
      contacto: "",
      fechaIngreso: "",
      codCarrera: "",
    });
  }

  cargarFormAlumno() {
    //Me trae el nro de legajo de la otra view
    this.route.paramMap.subscribe((params) => {
      this.legajo = +params.get("nroLegajo");
      this.carreraSeleccionada = 0;
    });

    if (isNaN(this.legajo)) {
      //Si el formato no es valido
      console.log("El formato del legajo no es valido");
      this.router.navigate(["/alumnos"]);
    } else {
      if (this.legajo) {
        this.modoEdicion = true;

        //Obtiene un alumno y lo settea a otra
        this.alumnosService.getAlumno(this.legajo).subscribe(
          (alumnoApi) => this.cargarAlumno(alumnoApi),
          (error) => this.router.navigate(["/alumnos"])
        );
        }
    }
  }

  guardarAlumno() {
    //Necesito crear un alumno en base a los valores del form
    let nuevoAlumno: IAlumno = Object.assign({}, this.formGroup.value);
    nuevoAlumno.codCarrera = this.carreraSeleccionada;
    console.dir(nuevoAlumno);

    debugger;

    if (this.modoEdicion) {
      //Edicion
      this.alumnosService.actualizarAlumno(this.legajo, nuevoAlumno).subscribe(
        (alumnoApi) => {
          window.alert("Alumno guardado!");
          this.router.navigate(["/alumnos"]);
        },
        (error) => console.log(error)
      );
    } else {
      //Carga
      this.alumnosService.crearAlumno(nuevoAlumno).subscribe(
        (alumnoApi) => {
          window.alert("Alumno cargado!");
          this.router.navigate(["/alumnos"]);
        },
        (error) => console.log(error)
      );
    }
  }

  //Cargar datos del alumno en el form
  cargarAlumno(alumno: IAlumno) {
    
    this.formGroup.patchValue({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      nroLegajo: alumno.nroLegajo,
      //Utilizo este formato para que me lo tome el date picker
      fechaDeNacimiento: this.datePipe.transform(
        alumno.fechaDeNacimiento,
        "yyyy-MM-dd"
      ),
      nroDocumento: alumno.nroDocumento,
      contacto: alumno.contacto,
      email: alumno.email,
      codCarrera: alumno.codCarrera,
      fechaIngreso: this.datePipe.transform(
        alumno.fechaIngreso,
        "yyyy-MM-dd"
      ),
    });

    debugger;
    this.carreraSeleccionada = alumno.codCarrera;
    // this.carreraSeleccionada = this.formGroup.get("codCarrera").value;

  }

  obtenerCarreras() {
    this.carrerasService.getCarreras().subscribe(
      (carrerasApi) => (this.listaCarreras = carrerasApi),
      (error) => console.log(error)
    );
  }

  //Obtiene el codigo de la carrera seleccionada del combobox de carreras
  getCarreraSeleccionada(event) {
    
    this.carreraSeleccionada = parseInt(event.target.value);
    
  }

  //Al editar, tengo que traer el codigo de la carrera y que sea cargado como seleccionado en la select list
}
