import { Component, OnInit } from '@angular/core';
import { IAlumno } from './IAlumno';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: "app-alumnos",
  templateUrl: "./alumnos.component.html",
  styleUrls: ["./alumnos.component.css"],
})
export class AlumnosComponent implements OnInit {
  ListadoAlumnos: IAlumno[];
  constructor(private alumnosService: AlumnosService) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    //nos vamos a suscribir al servicio que trae todos los alumnos de la base de datos
    this.alumnosService.getAlumnos().subscribe(
      (alumnosEnApi) => (this.ListadoAlumnos = alumnosEnApi),
      (error) => console.error(error)
    );
    console.dir(this.ListadoAlumnos);
  }

  eliminarAlumno(nroLegajo: number) {
    this.alumnosService.deleteAlumno(nroLegajo).subscribe(
      (alumno) => this.eliminoOK(alumno.nroLegajo),
      (error) => console.log(error)
    );
  }

  private eliminoOK(nroLegajo: number) {
    console.log(`Se elimino el alumno con id ${nroLegajo}!`);
    this.ngOnInit();
  }

  
}
