import { Component, OnInit } from "@angular/core";
import { MateriasService } from "./materias.service";
import { IMateria } from "./imateria";
import { ICarrera } from "../carreras/icarrera";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NoDeleteModalComponent } from "../no-delete-modal/no-delete-modal.component";

@Component({
  selector: "app-materias",
  templateUrl: "./materias.component.html",
  styleUrls: ["./materias.component.css"],
})
export class MateriasComponent implements OnInit {
  listadoMaterias: IMateria[];
  listaCarrerasMateria: ICarrera[];
  modalError: BsModalRef;

  constructor(
    private materiasService: MateriasService,
    public modalService: BsModalService
  ) {}

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

  //Elimina la materia y actualiza
  eliminarMateria(codMateria: number) {
    setTimeout((f) => this.ngOnInit(), 1000);

    this.materiasService.deleteMateria(codMateria).subscribe(
      (materiaApi) => console.log(materiaApi),
      (error) => console.log(error)
    );
  }

  //Averiguar si la materia se encuentra en alguna carrera
  eliminarMateriaValida(codMateria: number) {
    this.materiasService.getCarrerasPorMateria(codMateria).subscribe(
      (carrerasApi) => {
        console.log(carrerasApi);

        if (carrerasApi.length) 
          this.openModalError();
        else 
          this.eliminarMateria(codMateria);
      },
      (error) => console.log(error)
    );
  }

  openModalError() {
    const initialState = {
      mensajeError: "La materia pertenece a una carrera"
    };

    this.modalError = this.modalService.show(NoDeleteModalComponent, {
      initialState,
    });
  }
}
