import { Component, OnInit } from "@angular/core";
import { CarrerasService } from "./carreras.service";
import { MateriasService } from "../materias/materias.service";
import { IMateria } from "../materias/imateria";
import { ICarrera } from "./icarrera";
import { ICarreraMateria } from "../icarrera-materia";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-carreras",
  templateUrl: "./carreras.component.html",
  styleUrls: ["./carreras.component.css"],
})
export class CarrerasComponent implements OnInit {
  carreraSeleccionada: number;
  materiaSeleccionada: number;
  sePuedeCargar: boolean;
  llegoTope:boolean;
  listaCarreras: ICarrera[];
  listaMaterias: IMateria[];
  materiasPorCarrera: IMateria[];
  materiasDisponibles: IMateria[];

  constructor(
    private carrerasService: CarrerasService,
    private materiasService: MateriasService
  ) {}

  ngOnInit() {
    this.cargarCarreras();
    this.cargarMaterias();
    this.llegoTope = false;
    this.sePuedeCargar = true;
    this.carreraSeleccionada = 0;
    this.materiaSeleccionada = 0;
  }

  actualizarInfo() {
    //Vuelvo a actualizar el combobox

    this.getMateriasCarrera(this.carreraSeleccionada);
    this.materiaSeleccionada = 0;
    this.verificarCargaMaterias();
  }

  //Mostrar o no la dropdownlist de materias a asignar
  verificarCargaMaterias() {
    
      if (this.materiasPorCarrera.length <= this.listaMaterias.length - 1 && !this.llegoTope) {
        this.llegoTope = true;
        this.sePuedeCargar = false;
      }

      if (this.materiasPorCarrera.length == this.listaMaterias.length)
        this.sePuedeCargar = true;
    
  }
  cargarCarreras() {
    this.carrerasService.getCarreras().subscribe(
      (carrerasApi) => (this.listaCarreras = carrerasApi),
      (error) => console.log(error)
    );
  }

  cargarMaterias() {
    this.materiasService.getMaterias().subscribe(
      (materiasApi) => (this.listaMaterias = materiasApi),
      (error) => console.log(error)
    );
  }

  cargarInfoCarrera(event) {
    this.carreraSeleccionada = parseInt(event.target.value);
    this.getMateriasCarrera(this.carreraSeleccionada);
  }

  getMateriasCarrera(codCarrera: number) {
    this.carrerasService.getMateriasCarrera(codCarrera).subscribe(
      (apiMaterias) => {
        this.materiasPorCarrera = apiMaterias;
        this.getMateriasDisponibles(apiMaterias);
      },
      (error) => console.log(error)
    );
  }

  //Una lista de las materias que todavia se pueden anotar
  getMateriasDisponibles(materiasCarrera: IMateria[]) {
    this.materiasDisponibles = this.listaMaterias.filter(
      (m) => !this.estaAsignada(m, materiasCarrera)
    );
  }

  private estaAsignada(materia: IMateria, materias: IMateria[]): boolean {
    for (let materiaCarrera of materias) {
      if (materia.codMateria === materiaCarrera.codMateria) return true;
    }
    return false;
  }

  eliminarMateria(codMateria: number) {
    setTimeout((f) => this.actualizarInfo(), 1000);

    //ASYNC REQUEST - llega luego
    this.carrerasService
      .eliminarMateriaDeCarrera(this.carreraSeleccionada, codMateria)
      .subscribe(
        (materiaCarreraApi) => console.log(materiaCarreraApi),
        (error) => console.log(error)
      );
  }

  getMateriaSeleccionada(event) {
    this.materiaSeleccionada = parseInt(event.target.value);
  }

  //Tengo que obtener el codigo de la materia de la select list de materias disponibles
  cargarMateria() {
    let nuevaMateria: ICarreraMateria = {
      codCarrera: this.carreraSeleccionada,
      codMateria: this.materiaSeleccionada,
    };

    setTimeout((f) => this.actualizarInfo(), 1000);
    this.carrerasService.cargarMateriaEnCarrera(nuevaMateria).subscribe();
  }
}
