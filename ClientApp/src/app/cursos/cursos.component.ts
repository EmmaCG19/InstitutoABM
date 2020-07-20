import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FilterPipe } from "./filter.pipe";
import { ICurso } from "./icurso";
import { CursosService } from "./cursos.service";
import { IMateria } from "../materias/imateria";

@Component({
  selector: "app-cursos",
  templateUrl: "./cursos.component.html",
  styleUrls: ["./cursos.component.css"],
})
export class CursosComponent implements OnInit {
  formSearch: FormGroup;
  ListaCursos: ICurso[];
  ListaFiltros = [
    { nombre: "materia", selected: false, id: 1 },
    { nombre: "profesor", selected: false, id: 2 },
  ];

  filtrosOn: boolean = false; 
  filtroActivo: number;
  nombreFiltroActivo: string;
  cursosFiltrados: ICurso [] = [];

  constructor(
    private profesoresService: CursosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getCursos();
    this.formSearch = this.formBuilder.group({
      searchCurso: [{value:"", disabled: true}],
      filtros: this.generarFiltros(),
    });
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

  //Crear un array con los filtros
  generarFiltros() {
    let arr: FormControl[] = this.ListaFiltros.map((f) => {
      return this.formBuilder.control(f.selected || false);
    });

    return this.formBuilder.array(arr);
  }

  //Get filtros accessor property
  get filtros() {
    return this.formSearch.get("filtros") as FormArray;
  }

  setFiltroActivo(index) {
    
    //Reset FORM state
    this.formSearch.controls["searchCurso"].disable();
    this.filtroActivo = null;
    this.nombreFiltroActivo = null;
    this.filtrosOn = !this.filtrosOn;

    if (this.existeFiltroChecked()) {
      //Habilito la busqueda
      this.formSearch.controls["searchCurso"].enable();
      
      //Me guardo el index del filtro
      this.filtroActivo = index;

      //Me guardo el nombre
      this.nombreFiltroActivo = this.ListaFiltros[index].nombre || null;
    }
    else
      this.formSearch.controls["searchCurso"].setValue(''); 

    console.log(this.formSearch.controls["searchCurso"].value);

    //Deshabilito o habilito los checkboxes dependiendo si existe o no algun checkbox checked
    this.setCheckboxes(this.filtrosOn);
  }

  //Deshabilita los checkboxes que no están chequeados
  setCheckboxes(checkStatus: boolean) {
    let filtros: any = this.filtros.controls;
    filtros.forEach((f) => {
      if (checkStatus && filtros.indexOf(f) != this.filtroActivo)
        f.disable();
      else 
        f.enable();
    });
  }

  //Verifica si algun checkbox fue checked
  existeFiltroChecked(): boolean {
    return this.filtros.controls.some((f) => f.value);
  }
}
