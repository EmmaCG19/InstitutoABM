import { Component, OnInit, Type } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAlumno } from "../IAlumno";
import { ICurso } from "src/app/cursos/icurso";
import { AlumnosService } from "../alumnos.service";
import { typeofExpr } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-alumnos-form",
  templateUrl: "./alumnos-form.component.html",
  styleUrls: ["./alumnos-form.component.css"],
})
export class AlumnosFormComponent implements OnInit {
  modoEdicion: boolean = false;
  alumnoLegajo: number;
  Alumno: IAlumno;
  ListadoCursos: ICurso[];
  
  // Alumno: IAlumno = {nombre:"Test", apellido: "Edicion", codCarrera:1, nroDocumento:1234, email:"algo@gmail.com", fechaDeNacimiento: new Date(), fechaIngreso: new Date(), nroContacto: "1138419140", nroLegajo:10 };
  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.alumnoLegajo = +params.get("nroLegajo");
    });
    this.cargarDatosAlumno();
  }

  cargarDatosAlumno() {
    if (isNaN(this.alumnoLegajo)) {
      //volver al menu alumnos
      console.log("El formato del legajo no es valido");
      this.router.navigate(["/alumnos"]);
    } else {
      //obtener Alumno
      this.obtenerAlumno(this.alumnoLegajo);

      if (this.Alumno) {
        //editar datos
        // this.modoEdicion = true;
      } else {
        //cargar datos
      }
    }
  }

  obtenerAlumno(nroLegajo: number) {

    console.log("Nro de legajo: " + nroLegajo);
    
    this.alumnosService.getAlumno(nroLegajo).subscribe(
      (alumnoApi) => 
        {this.Alumno = alumnoApi; console.log(typeof(this.Alumno))},
      (error) => console.log(error));

      console.log(`El alumno con legajo ${nroLegajo} es: ${this.Alumno}`);
  }

}
