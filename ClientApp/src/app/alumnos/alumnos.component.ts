import { Component, OnInit } from '@angular/core';
import { IAlumno } from './IAlumno';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos: IAlumno[];
  constructor(private alumnosService:AlumnosService) { }

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos()
  {
    //nos vamos a suscribir al servicio que trae todos los alumnos de la base de datos
    // debugger;
    this.alumnosService.getAlumnos()
                       .subscribe(alumnosEnApi => this.alumnos = alumnosEnApi,
                      error => console.error(error));
  }

  eliminar(nroLegajo:number)
  {
    debugger;
    this.alumnosService.deleteAlumno(nroLegajo);
  }

}
