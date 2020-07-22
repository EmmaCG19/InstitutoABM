import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { IProfesor } from "../IProfesor";
import { IMateria } from "src/app/materias/imateria";
import { Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfesoresService } from "../profesores.service";
import { MateriasService } from "src/app/materias/materias.service";

@Component({
  selector: "app-profesores-form",
  templateUrl: "./profesores-form.component.html",
  styleUrls: ["./profesores-form.component.css"],
})
export class ProfesoresFormComponent implements OnInit {
  formGroup: FormGroup;
  modoEdicion: boolean = false;
  profesorId: number;
  
  listaMaterias: IMateria[];
  listaProfesores: IProfesor[];
  
  dniExistente: boolean;
  dniProfesor: number;

  constructor(
    private route: ActivatedRoute,
    private profesoresService: ProfesoresService,
    private materiasService: MateriasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    
    this.obtenerMaterias();
    this.obtenerProfesores();
    this.cargarFormProfesor();
  }

  ngOnInit() {
    //Inicializa los valores del form
    this.formGroup = this.formBuilder.group({
      profesorId: [],
      nombre: [, [Validators.required]],
      apellido: [, [Validators.required]],
      nroDocumento: [
        ,
        [
          Validators.required
          // dniExistenteValidator(
          //   this.listaProfesores.map((p) => p.nroDocumento)
          // ),
        ],
      ],
      fechaDeNacimiento: [, Validators.required],
      email: [, [Validators.email, Validators.required]],
      contacto: [, [Validators.maxLength(8), Validators.minLength(8)]],
      materias: [null, [Validators.required]],
    });
  }

  cargarFormProfesor() {
    //Me trae el id del profesor de la otra view
    this.route.paramMap.subscribe((params) => {
      this.profesorId = +params.get("profesorId");
    });

    if (isNaN(this.profesorId)) {
      //Si el formato no es valido
      console.log("El formato del id del profesor no es válida");
      this.router.navigate(["/profesores"]);
    } else {
      if (this.profesorId) {
        this.modoEdicion = true;

        //Obtiene un profesor y lo settea a otra
        this.profesoresService.getProfesorById(this.profesorId).subscribe(
          (profesorApi) => this.cargarProfesor(profesorApi),
          (error) => this.router.navigate(["/profesores"])
        );
      }
    }
  }

  guardarProfesor() {
    //Necesito crear un profesor en base a los valores del form
    let nuevoProfesor: IProfesor = Object.assign({}, this.formGroup.value);
    
    nuevoProfesor.contacto = nuevoProfesor.contacto
      ? "11" + nuevoProfesor.contacto
      : null;
     

    nuevoProfesor.codMateria = this.formGroup.get('materias').value;  
    console.dir(nuevoProfesor);

    if (this.modoEdicion) {
      
      //Edicion
      this.profesoresService.actualizarProfesor(this.profesorId, nuevoProfesor).subscribe(
        (profesorApi) => {
          console.log("Profesor guardado");
          this.router.navigate(["/profesores"]);
        },
        (error) => console.log(error)
      );
    } else {
      //Carga
      this.profesoresService.agregarProfesor(nuevoProfesor).subscribe(
        (profesorApi) => {
          console.log("Profesor cargado");
          this.router.navigate(["/profesores"]);
        },
        (error) => console.log(error)
      );
    }
  }

  
  //Cargar datos del profesor en el form
  cargarProfesor(profesor: IProfesor) {
    this.formGroup.patchValue({
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      profesorId: profesor.profesorId,
      
      //Utilizo este formato para que me lo tome el date picker
      fechaDeNacimiento: this.datePipe.transform(
        profesor.fechaDeNacimiento,
        "yyyy-MM-dd"
      ),
      nroDocumento: profesor.nroDocumento,
      contacto: profesor.contacto? profesor.contacto.slice(2, profesor.contacto.length): null,
      email: profesor.email,
      materias: profesor.codMateria
    });

    //Guardo el valor actual del dni del profesor a editar 
    this.dniProfesor = profesor.nroDocumento;
  }

  obtenerMaterias() {
    this.materiasService.getMaterias().subscribe(
      (materiasApi) => (this.listaMaterias = materiasApi),
      (error) => console.log(error)
    );
  }

  obtenerProfesores() {
    this.profesoresService.getProfesores().subscribe(
      (profesoresApi) => (this.listaProfesores = profesoresApi),
      (error) => console.log(error)
    );
  }
  
  //Validar la existencia del DNI
  validarDNI() {

    let dni: number = this.formGroup.get("nroDocumento").value;
    let dniCargados = this.listaProfesores.map((a) => a.nroDocumento);

    if (dniCargados.includes(dni) && dni != this.dniProfesor) 
      this.dniExistente = true;
    else
      this.dniExistente = false;
  }
}


//   //Validar el formato del mail
//   validarMail() {
//     let email: string = this.formGroup.get("email").value;

//     if (email.search("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$") != -1)
//       this.mailValido = true;
//     else this.mailValido = false;
//   }