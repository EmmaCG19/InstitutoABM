import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAlumno } from "../IAlumno";
import { ICurso } from "src/app/cursos/icurso";
import { AlumnosService } from "../alumnos.service";

@Component({
  selector: "app-alumnos-form",
  templateUrl: "./alumnos-form.component.html",
  styleUrls: ["./alumnos-form.component.css"],
})
export class AlumnosFormComponent implements OnInit {
  modoEdicion: boolean = false;
  alumno: IAlumno;
  alumnoLegajo: number;
  ListadoCursos: ICurso[];

  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private router: Router
  ) {}

  ngOnInit() {
    //modoEdicion va a cambiar dependiendo de si trae o no algun parametro la ruta
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
      //obtener alumno
      this.obtenerAlumno(this.alumnoLegajo);

      if (this.alumno) {
        //cargar datos
        console.log("se puede cargar");
      } else {
        //editar datos
        this.modoEdicion = true;
        console.log("se puede editar");
      }
    }
  }

  obtenerAlumno(nroLegajo: number) {
    this.alumnosService.getAlumno(nroLegajo).subscribe(
      (alumnoApi) => {
        this.alumno = alumnoApi;
      },
      (error) => console.log(error)
    );

    // debugger;
    console.dir(this.alumno);
  }
}
