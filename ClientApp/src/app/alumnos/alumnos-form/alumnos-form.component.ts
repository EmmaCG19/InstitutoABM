import { Component, OnInit, Type } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAlumno } from "../IAlumno";
import { ICurso } from "src/app/cursos/icurso";
import { AlumnosService } from "../alumnos.service";
import { typeofExpr } from "@angular/compiler/src/output/output_ast";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-alumnos-form",
  templateUrl: "./alumnos-form.component.html",
  styleUrls: ["./alumnos-form.component.css"],
})
export class AlumnosFormComponent implements OnInit {
  modoEdicion: boolean = false;
  legajo: number;
  formGroup: FormGroup;
  ListadoCursos: ICurso[];

  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {

    this.traerAlumnoId();

  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nroLegajo: "",
      nombre: "",
      apellido: "",
      fechaNac: "",
      nroDoc: "",
      email: "",
      contacto: "",
      codCarrera:""
      // 'fechaIngreso':'',
    });

  }

  traerAlumnoId() {

    //Me trae el nro de legajo de la otra view
    this.route.paramMap.subscribe((params) => {
      this.legajo = +params.get("nroLegajo");
    });

    if (isNaN(this.legajo)) {
      //Si el formato no es valido
      console.log("El formato del legajo no es valido");
      this.router.navigate(["/alumnos"]);
    } else {
      this.modoEdicion = true;

      //Obtiene un alumno y lo settea a otra
      this.alumnosService.getAlumno(this.legajo).subscribe(
        (alumnoApi) =>  this.cargarAlumno(alumnoApi),
        (error) => this.router.navigate(["/alumnos"])
      );
    }
  }

  guardarAlumno(){

    let nuevoAlumno: IAlumno = Object.assign({}, this.formGroup.value);

    if(this.modoEdicion)
    {
      //Edicion
      //Necesito crear un alumno en base a los valores del form
      this.alumnosService.actualizarAlumno(this.legajo, nuevoAlumno).subscribe(
        (alumnoApi) => {
          console.log("Alumno guardado: ", alumnoApi);
          this.router.navigate(["/alumnos"]);
        },
        (error) => console.log(error)
      );

    }
    else 
    {
      //Carga

    }


  }

  cargarAlumno(alumno: IAlumno) {
    //Cargar alumno en form

    this.formGroup.patchValue({
      nombre: alumno.nombre, 
      apellido: alumno.apellido,
      nroLegajo: alumno.nroLegajo,
      fechaNac: this.datePipe.transform(alumno.fechaDeNacimiento, "yyyy-MM-dd"),
      nroDoc: alumno.nroDocumento,
      contacto: alumno.contacto,
      email: alumno.email, 
      codCarrera: alumno.codCarrera,
    });

    console.dir(this.formGroup);
  }
}
