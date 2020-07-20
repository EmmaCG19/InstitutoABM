import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CollapseModule} from 'ngx-bootstrap/collapse';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnosFormComponent } from './alumnos/alumnos-form/alumnos-form.component';
import { MateriasComponent } from './materias/materias.component';
import { MateriasFormComponent } from './materias/materias-form/materias-form.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { CarrerasMateriasComponent } from './carreras/carreras-materias/carreras-materias.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { ProfesoresFormComponent } from './profesores/profesores-form/profesores-form.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursosFormComponent } from './cursos/cursos-form/cursos-form.component';

//Services
import { AlumnosService } from "./alumnos/alumnos.service";
import { CarrerasService } from "./carreras/carreras.service";
import { MateriasService } from "./materias/materias.service";
import { ProfesoresService } from "./profesores/profesores.service";
import { CursosService } from "./cursos/cursos.service";
import { JsonPipe } from "@angular/common"
import { DatePipe } from '@angular/common';
import { FilterPipe } from './cursos/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AlumnosComponent,
    AlumnosFormComponent,
    MateriasComponent,
    CarrerasComponent,
    MateriasFormComponent,
    CarrerasMateriasComponent,
    FooterComponent,
    ProfesoresComponent,
    ProfesoresFormComponent,
    CursosComponent,
    CursosFormComponent,
    FilterPipe
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      
      //Paths personalizados
      { path: "alumnos", component: AlumnosComponent },
      { path: "alumnos-agregar", component: AlumnosFormComponent },
      { path: "alumnos-editar/:nroLegajo", component: AlumnosFormComponent },
      { path: "carreras", component: CarrerasComponent },
      { path: "materias", component: MateriasComponent },
      { path: "materias-agregar", component: MateriasFormComponent},
      { path: "materias-editar/:codMateria", component: MateriasFormComponent},
      { path: "profesores", component: ProfesoresComponent },
      { path: "profesores-agregar", component: ProfesoresFormComponent },
      { path: "profesores-editar/:profesorId", component: ProfesoresFormComponent },
      { path: "cursos", component: CursosComponent },
      { path: "cursos-agregar", component: CursosFormComponent },
      { path: "cursos-editar/:codCurso", component: CursosFormComponent },
      
    ]),
  ],
  providers: [AlumnosService, CarrerasService, MateriasService, ProfesoresService, CursosService, DatePipe, JsonPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
