import { Component, OnInit } from '@angular/core';
import {CarrerasService} from './carreras.service';
import {MateriasService} from '../materias/materias.service';
import { IMateria } from '../materias/imateria';
import { ICarrera } from './icarrera';

@Component({
  selector: "app-carreras",
  templateUrl: "./carreras.component.html",
  styleUrls: ["./carreras.component.css"],
})
export class CarrerasComponent implements OnInit {
  listaMaterias: IMateria[];
  listaCarreras: ICarrera[];
  carreraSeleccionada: number;

  constructor(
    private carrerasService: CarrerasService,
    private materiasService: MateriasService
  ) {}

  ngOnInit() {
    this.cargarCarreras();
    this.carreraSeleccionada = 0;
  }

  cargarCarreras() {
    this.carrerasService.getCarreras().subscribe(
      (carrerasApi) => (this.listaCarreras = carrerasApi),
      (error) => console.log(error)
    );
  }

  mostrarListaMaterias(event) {
    //Voy a recibir la opcion que se selecciono en el combo y con ese codigo voy a ir a buscar las materias
    debugger;
    this.carreraSeleccionada = parseInt(event.target.value);
    this.carrerasService.getMaterias(this.carreraSeleccionada).subscribe(
      (apiMaterias) => {this.listaMaterias = apiMaterias; console.log(apiMaterias)},
      (error) => console.log(error)
    );

  }
}
