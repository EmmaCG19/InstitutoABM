import { Component, OnInit, Type } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAlumno } from "../IAlumno";
import { typeofExpr, THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

import { DatePipe } from "@angular/common";
import { AlumnosService } from "../alumnos.service";
import { CarrerasService } from "../../carreras/carreras.service";
import { ICarrera } from "../../carreras/icarrera";
import { stringify } from "querystring";

@Component({
  selector: "app-alumnos-form",
  templateUrl: "./alumnos-form.component.html",
  styleUrls: ["./alumnos-form.component.css"],
})
export class AlumnosFormComponent implements OnInit {
  modoEdicion: boolean = false;
  legajo: number;
  formGroup: FormGroup;

  ListaCarreras: ICarrera[];
  ListaAlumnos: IAlumno[];

  dniExistente: boolean;
  dniAlumno: number;

  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private carrerasService: CarrerasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.obtenerCarreras();
    this.obtenerAlumnos();
    this.cargarFormAlumno();
  }

  ngOnInit() {
    //Inicializa los valores del form
    this.dniExistente = false;

    this.formGroup = this.formBuilder.group({
      nroLegajo: [],
      nombre: [, [Validators.required]],
      apellido: [, [Validators.required]],
      nroDocumento: [, [Validators.required]],
      fechaDeNacimiento: [, [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      contacto: [, [Validators.minLength(8), Validators.maxLength(8)]],
      carreras: [null, [Validators.required]],
      fechaIngreso: [, [Validators.required]],
    });
  }

  cargarFormAlumno() {
    //Me trae el nro de legajo de la otra view
    this.route.paramMap.subscribe((params) => {
      this.legajo = +params.get("nroLegajo");
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
    nuevoAlumno.codCarrera = this.formGroup.get("carreras").value;
    nuevoAlumno.contacto = nuevoAlumno.contacto.trim().length
      ? "11" + nuevoAlumno.contacto
      : null;

    console.dir(nuevoAlumno);

    if (this.modoEdicion) {
      //Edicion
      this.alumnosService.actualizarAlumno(this.legajo, nuevoAlumno).subscribe(
        (alumnoApi) => {
          console.log("Alumno guardado");
          this.router.navigate(["/alumnos"]);
        },
        (error) => console.log(error)
      );
    } else {
      //Carga
      this.alumnosService.crearAlumno(nuevoAlumno).subscribe(
        (alumnoApi) => {
          console.log("Alumno cargado");
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
      contacto: alumno.contacto? alumno.contacto.slice(2, alumno.contacto.length): null,
      email: alumno.email,
      carreras: alumno.codCarrera,
      fechaIngreso: this.datePipe.transform(alumno.fechaIngreso, "yyyy-MM-dd"),
    });

    this.dniAlumno = alumno.nroDocumento;
  }

  obtenerCarreras() {
    this.carrerasService.getCarreras().subscribe(
      (carrerasApi) => (this.ListaCarreras = carrerasApi),
      (error) => console.log(error)
    );
  }

  obtenerAlumnos() {
    //Obtener todos los alumnos
    this.alumnosService.getAlumnos().subscribe(
      (alumnosApi) => (this.ListaAlumnos = alumnosApi),
      (error) => console.log(error)
    );
  }

  //Validar la existencia del DNI
  validarDNI() {
    let dni: number = this.formGroup.get("nroDocumento").value;
    let dniCargados = this.ListaAlumnos.map((a) => a.nroDocumento);

    if (dniCargados.includes(dni) && dni != this.dniAlumno)
      this.dniExistente = true;
    else this.dniExistente = false;
  }
}

//Validar el formato del mail
// validarMail() {
//   let email: string = this.formGroup.get("email").value;

// }
//   if (email.search("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$") != -1)
//     this.mailValido = true;
//   else
//     this.mailValido = false;
