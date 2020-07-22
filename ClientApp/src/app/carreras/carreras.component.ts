import { Component, OnInit } from "@angular/core";
import { CarrerasService } from "./carreras.service";
import { MateriasService } from "../materias/materias.service";
import { IMateria } from "../materias/imateria";
import { ICarrera } from "./icarrera";
import { ICarreraMateria } from "./carreras-materias/icarrera-materia";
import { ThrowStmt } from "@angular/compiler";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-carreras",
  templateUrl: "./carreras.component.html",
  styleUrls: ["./carreras.component.css"],
})
export class CarrerasComponent implements OnInit {
  formGroup: FormGroup;
  carreraSeleccionada: number;
  materiaSeleccionada: number;

  ListaCarreras: ICarrera[];
  ListaMaterias: IMateria[];
  ListaMateriasCarrera: IMateria[] = [];
  ListaMateriasDisponibles: IMateria[] = [];

  llegoTope: boolean;
  sePuedeCargar: boolean;

  constructor(
    private carrerasService: CarrerasService,
    private materiasService: MateriasService,
    private fb: FormBuilder
  ) {
    this.cargarCarreras();
    this.cargarMaterias();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      carreras: [{value: null, disabled: true}],
      materiasDisponibles: [{value: null, disabled: true}],
    });

    this.llegoTope = false;
    this.sePuedeCargar = true;
  }

  actualizarInfo() {
    //Vuelvo a actualizar el combobox
    this.listarMateriasCarrera();
    // this.verificarCargaMaterias();
  }

  //Mostrar o no la dropdownlist de materias a asignar
  verificarCargaMaterias() {
    // console.log("Tope antes?: ", this.llegoTope);
    // console.log("Se puede cargar antes?", this.sePuedeCargar);

    if (
      this.ListaMateriasCarrera.length == this.ListaMaterias.length - 1 &&
      !this.llegoTope
    ) {
      this.llegoTope = true;
      this.sePuedeCargar = false;
    }

    if (this.ListaMateriasCarrera.length == this.ListaMaterias.length)
      this.sePuedeCargar = true;

    // console.log("Tope despues?: ", this.llegoTope);
    // console.log("Se puede cargar despues?", this.sePuedeCargar);
  }

  cargarCarreras() {
    this.carrerasService.getCarreras().subscribe(
      (carrerasApi) => {
        // debugger;
        this.ListaCarreras = carrerasApi;
        this.formGroup.get("carreras").enable();
      },
      (error) => console.log(error)
      );
    }
    
  cargarMaterias() {
    this.materiasService.getMaterias().subscribe(
      (materiasApi) => (this.ListaMaterias = materiasApi),
      (error) => console.log(error)
      );
    }
    
  listarMateriasCarrera() {
    //Obtengo la carrera selecciona con el [formGroup]
    this.carreraSeleccionada = this.formGroup.get("carreras").value;
    this.formGroup.get('materiasDisponibles').reset();

    
    console.log("Cod.Carrera: ", this.carreraSeleccionada);
    if (this.carreraSeleccionada) {
      this.carrerasService
      .getMateriasCarrera(this.carreraSeleccionada)
      .subscribe(
        (apiMaterias) => {
          this.ListaMateriasCarrera = apiMaterias;

          console.log("Materias Carrera:");
          console.log(this.ListaMateriasCarrera);
          this.getMateriasDisponibles(apiMaterias);
          this.formGroup.get("materiasDisponibles").enable();
          
          },
          (error) => console.log(error)
        );
    }
  }

  //Una lista de las materias que todavia se pueden anotar
  getMateriasDisponibles(materiasCarrera: IMateria[]) {
    let codMateriasCarrera: number[] = this.ListaMateriasCarrera.map(
      (m) => m.codMateria
    );

    console.log("Cod.Materias:");
    console.log(codMateriasCarrera);

    this.ListaMateriasDisponibles = this.ListaMaterias.filter(
      (m) => !codMateriasCarrera.includes(m.codMateria)
    );

    console.log("Materias disponibles:");
    console.log(this.ListaMateriasDisponibles);
  }

  eliminarMateria(codMateria:number) {
    debugger;
    setTimeout((f) => this.actualizarInfo(), 1500);

    this.carrerasService
      .eliminarMateriaDeCarrera(
        this.carreraSeleccionada,
        codMateria
      )
      .subscribe(
        (materiaCarreraApi) => console.log("Materia eliminada"),
        (error) => console.log(error)
      );
  }

  //Tengo que obtener el codigo de la materia de la select list de materias disponibles
  cargarMateria() {
    let nuevaMateria: ICarreraMateria = {
      codCarrera: this.carreraSeleccionada,
      codMateria: this.materiaSeleccionada,
    };

    setTimeout((f) => this.actualizarInfo(), 1500);

    this.carrerasService.cargarMateriaEnCarrera(nuevaMateria).subscribe(
      () => console.log("Materia agregada"),
      (error) => console.log(error)
    );
  }
}
