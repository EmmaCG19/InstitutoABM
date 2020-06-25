import { Component, OnInit, Type } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAlumno } from "../IAlumno";
import { typeofExpr, THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Validators} from "@angular/forms";

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
  carreraSeleccionada: number;
  listaCarreras: ICarrera[];
  alumnosCargados: IAlumno[];
  dniExistente: boolean;
  mailValido:boolean;

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
    this.mailValido = true;
    this.dniExistente = false;

    this.formGroup = this.formBuilder.group({
      nroLegajo: "",
      nombre: "",
      apellido: "",
      nroDocumento: "",
      fechaDeNacimiento: "",
      email: "",
      contacto: "",
      codCarrera: "",
      fechaIngreso: "",
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
    nuevoAlumno.contacto = nuevoAlumno.contacto.trim().length
      ? "11" + nuevoAlumno.contacto
      : ""; 

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
      contacto: alumno.contacto.slice(2, alumno.contacto.length),
      email: alumno.email,
      codCarrera: alumno.codCarrera,
      fechaIngreso: this.datePipe.transform(alumno.fechaIngreso, "yyyy-MM-dd"),
    });

    this.carreraSeleccionada = alumno.codCarrera;
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


  obtenerAlumnos() {
    //Obtener todos los alumnos
    this.alumnosService.getAlumnos().subscribe(
      (alumnosApi) => (this.alumnosCargados = alumnosApi),
      (error) => console.log(error)
    );
  }

  //Validar el formato del mail
  validarMail() {
    let email: string = this.formGroup.get("email").value;

    if (email.search("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$") != -1)
      this.mailValido = true;
    else
      this.mailValido = false;  
  }

  //Validar la existencia del DNI
  validarDNI() {
    let dni: number = this.formGroup.get("nroDocumento").value;
    let dniCargados = this.alumnosCargados.map((a) => a.nroDocumento);

    if (dniCargados.includes(dni)) 
      this.dniExistente = true;
    else
      this.dniExistente = false;  
    
  }

  
}
