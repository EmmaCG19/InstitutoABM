
import { Component, OnInit } from '@angular/core';
import { MateriasService} from './materias.service'
import { IMateria } from './imateria';
import { ICarrera } from '../carreras/icarrera';

@Component({
  selector: "app-materias",
  templateUrl: "./materias.component.html",
  styleUrls: ["./materias.component.css"],
})
export class MateriasComponent implements OnInit {
  listadoMaterias: IMateria[];
  listaCarrerasMateria: ICarrera[];

  constructor(private materiasService: MateriasService) {}

  ngOnInit() {
    //Inicializacion
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materiasService.getMaterias().subscribe(
      (materiasApi) => (this.listadoMaterias = materiasApi),
      (error) => console.log(error)
    );
  }

  eliminarMateria(codMateria: number) {

      setTimeout((f) => this.ngOnInit(), 1000);

      this.materiasService.deleteMateria(codMateria).subscribe(
        (materiaApi) => console.log(materiaApi),
        (error) => console.log(error)
      );
    
  }
}
