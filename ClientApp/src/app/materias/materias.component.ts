
import { Component, OnInit } from '@angular/core';
import { MateriasService} from './materias.service'
import { IMateria } from './imateria';

@Component({
  selector: "app-materias",
  templateUrl: "./materias.component.html",
  styleUrls: ["./materias.component.css"],
})
export class MateriasComponent implements OnInit {
  listadoMaterias: IMateria[];

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
}
