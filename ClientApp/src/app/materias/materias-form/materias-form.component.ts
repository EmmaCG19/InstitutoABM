import { Component, OnInit, Type } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
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
  nombreExiste: boolean;
  esPromocionable: boolean;
  codMateria: number;
  formGroup: FormGroup;
  listaMaterias: IMateria[];
  nombreMateria: string;

  // opcionesPromocion: any[] = [
  //   { valor: false, texto: "NO", nombre: "rbtnUno" },
  //   { valor: true, texto: "SI", nombre: "rbtnDos" },
  // ];

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
      opcionesPromocion: [true, Validators.required],
    });

    console.log(this.formGroup);
  }

  // generarOpciones() {
  //   let arrPromocion: FormControl[] = this.opcionesPromocion.map((o) => {
  //     return this.formBuilder.control(o.valor || false, [Validators.required]);
  //   });

  //   return this.formBuilder.array(arrPromocion);
  // }

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
    nuevaMateria.esPromocionable = this.formGroup.get(
      "opcionesPromocion"
    ).value;

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
      opcionesPromocion: materia.esPromocionable,
    });

    this.nombreMateria = materia.nombre;
  }

  obtenerMaterias() {
    this.materiasService.getMaterias().subscribe(
      (materiasApi) => (this.listaMaterias = materiasApi),
      (error) => console.log(error)
    );
  }

  validarNombre() {
    this.nombreExiste = false;

    this.obtenerMaterias();
    let nombre: string = this.formGroup.get("nombre").value;
    let nombreMaterias = this.listaMaterias.map((m) =>
      m.nombre.trim().toLowerCase()
    );

    //Las materias incluyen al nombre
    if (nombreMaterias.includes(nombre.trim().toLowerCase())) {
      
      //Verificar si esta en modo edicion
      if (this.modoEdicion) {
        if (nombre.toLowerCase() != this.nombreMateria.toLowerCase()) {
          this.nombreExiste = true;
        }
      } else this.nombreExiste = true;
    }
  }


}
