import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-no-delete-modal",
  templateUrl: "./no-delete-modal.component.html",
  styleUrls: ["./no-delete-modal.component.css"],
})
export class NoDeleteModalComponent implements OnInit {
  //Datos que trae el modal
  mensajeError: string;
  title: string; 

  constructor(public modalError: BsModalRef) {
    this.title = "Baja denegada";
  }

  ngOnInit() {}
}
