import { Component, OnInit } from "@angular/core";
import { InscripcionesService } from "./inscripciones.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { InscripcionesFormComponent } from "./inscripciones-form/inscripciones-form.component";
import { IInscripcion } from "./iinscripcion";

@Component({
  selector: "app-inscripciones",
  templateUrl: "./inscripciones.component.html",
  styleUrls: ["./inscripciones.component.css"],
})
export class InscripcionesComponent implements OnInit {
  alumnosCollapsed: boolean = true;
  cursosCollapsed: boolean = true;
  modalForm: BsModalRef;
  
  constructor(
    private inscripcionesService: InscripcionesService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {}

  openModalForm() {
    //Mediante el initial state podemos pasarle el alumno y curso seleccionado al modal-form
    const initialState = {
      modoEdicion: false,
      nroLegajo: null,
      codCurso: null,
      title: 'Alta Inscripcion'
    };
    
    //Hay que pasarle el form-component como argumento
    this.modalForm = this.modalService.show(InscripcionesFormComponent, {initialState});
    // this.modalForm.content.closeBtnName = 'Close';
    // debugger;
  }

}
