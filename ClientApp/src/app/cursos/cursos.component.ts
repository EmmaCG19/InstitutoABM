import { Component, OnInit } from "@angular/core";
import { ICurso } from "./icurso";
import { CursosService } from "./cursos.service";
import { IMateria } from "../materias/imateria";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-cursos",
  templateUrl: "./cursos.component.html",
  styleUrls: ["./cursos.component.css"],
})
export class CursosComponent implements OnInit {
  ListaCursos: ICurso[];
  formSearch: FormGroup;

  constructor(
    private profesoresService: CursosService,
    private formBuilder: FormBuilder
  ) {
    this.formSearch = this.formBuilder.group({
      searchCurso: [""],
      filtroProfesor: [],
      filtroMateria: [],
      filtroCursoActivo: [],
    });
  }

  ngOnInit() {
    this.getCursos();
  }

  getCursos() {
    this.profesoresService.getCursos().subscribe(
      (profesor) => (this.ListaCursos = profesor),
      (error) => console.log(error)
    );
  }

  eliminarCurso(codProfesor: number) {
    setTimeout(() => this.getCursos(), 2000);
    this.profesoresService.eliminarCurso(codProfesor).subscribe(
      (cursoEliminado) => {
        console.dir(cursoEliminado);
      },
      (error) => console.log(error)
    );
  }
}
