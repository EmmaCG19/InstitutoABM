import { Component, OnInit } from "@angular/core";
import { Iinscripcion } from "./iinscripcion";
import { InscripcionesService } from "./inscripciones.service";

@Component({
  selector: "app-inscripciones",
  templateUrl: "./inscripciones.component.html",
  styleUrls: ["./inscripciones.component.css"],
})
export class InscripcionesComponent implements OnInit {
  alumnosCollapsed: boolean = true;
  cursosCollapsed: boolean = true;

  constructor(private inscripcionesService: InscripcionesService) {}

  ngOnInit() {
    
  }


  // this.getInscripciones
  // getInscripciones() {
  //   this.inscripcionesService.getInscripciones().subscribe(
  //     (inscripcionesApi) => (this.ListaInscripciones = inscripcionesApi),
  //     (error) => console.log(error)
  //   );
  // }

  // deleteInscripcion(codCurso: number, nroLegajo: number) {
  //   setTimeout(() => this.getInscripciones(), 2000);

  //   this.inscripcionesService
  //     .eliminarInscripcion(codCurso, nroLegajo)
  //     .subscribe(
  //       (inscripcionApi) => console.log(inscripcionApi),
  //       (error) => console.log(error)
  //     );
  // }
}
