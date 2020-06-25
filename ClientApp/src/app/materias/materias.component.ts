
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

      //IMPLEMENTAR UNA VALIDACION PARA QUE NO SE ELIMINEN MATERIAS QUE FUERON ASIGNADAS EN CARRERAS
      // this.materiasService.getCarrerasPorMateria(codMateria)
      // .subscribe( carrerasApi => console.log(carrerasApi)
      //   , error => console.log(error))

      setTimeout((f) => this.ngOnInit(), 1000);

      // if(this.listaCarrerasMateria)
      this.materiasService.deleteMateria(codMateria).subscribe(
        (materiaApi) => console.log(materiaApi),
        (error) => console.log(error)
      );
    
  }
}
