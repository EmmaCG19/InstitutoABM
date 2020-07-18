import { Component, OnInit, Type } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { IMateria } from "../imateria";
import { MateriasService } from "../materias.service";


@Component({
  selector: "app-materias-form",
  templateUrl: "./materias-form.component.html",
  styleUrls: ["./materias-form.component.css"],
})
export class MateriasFormComponent implements OnInit {
  modoEdicion: boolean = false;
  nombreExiste:boolean;
  esPromocionable:boolean;
  codMateria: number;
  formGroup: FormGroup;
  listaMaterias: IMateria[];

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.obtenerMaterias();
    this.cargarFormMateria();
  }

  ngOnInit() {
    this.nombreExiste = false;
    this.formGroup = this.formBuilder.group({
      codMateria: "",
      nombre: "",
      precio: "",
      esPromocionable: ""
    });
  }

  cargarFormMateria() {
    //Me trae el nro de codMateria de la otra view
    this.route.paramMap.subscribe((params) => {
      this.codMateria = +params.get("codMateria");
    });

    if (isNaN(this.codMateria)) {
      //Si el formato no es valido
      this.router.navigate(["/Materias"]);
    } else {
      if (this.codMateria) {
        this.modoEdicion = true;

        //Obtiene un Materia y lo settea a otra
        this.materiasService.getMateria(this.codMateria).subscribe(
          (materiaApi) => this.cargarMateria(materiaApi),
          (error) => this.router.navigate(["/Materias"])
        );
      }
    }
  }

  guardarMateria() {
    //Necesito crear un Materia en base a los valores del form
    let nuevaMateria: IMateria = Object.assign({}, this.formGroup.value);

    if (this.modoEdicion) {
      //Edicion
      this.materiasService
        .actualizarMateria(this.codMateria, nuevaMateria)
        .subscribe(
          (materiaApi) => this.router.navigate(["/materias"]),
          (error) => console.log(error)
        );
    } else {
      //Carga
      this.materiasService.crearMateria(nuevaMateria).subscribe(
        (materiaApi) => {
          this.router.navigate(["/materias"]);
        },
        (error) => console.log(error)
      );
    }
  }

  //Cargar datos del Materia en el form
  cargarMateria(materia: IMateria) {
    this.formGroup.patchValue({
      codMateria: materia.codMateria,
      nombre: materia.nombre,
      precio: materia.precio,
      esPromocionable: materia.esPromocionable
    });
  }

  obtenerMaterias() {
    this.materiasService.getMaterias().subscribe(
      (materiasApi) => (this.listaMaterias = materiasApi),
      (error) => console.log(error)
    );
  }

  validarNombre(){
    this.obtenerMaterias();
    let nombre:string = this.formGroup.get('nombre').value;
    let nombreMaterias = this.listaMaterias.map(m => m.nombre.trim().toLowerCase());
    
    if(nombreMaterias.includes(nombre.trim().toLowerCase()))
      this.nombreExiste = true;
    else     
      this.nombreExiste = false;
  }
}
