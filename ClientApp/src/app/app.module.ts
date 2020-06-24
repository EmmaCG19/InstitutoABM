import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

//Components
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnosFormComponent } from './alumnos/alumnos-form/alumnos-form.component';
import { MateriasComponent } from './materias/materias.component';
import { CarrerasComponent } from './carreras/carreras.component';

//Services
import { AlumnosService } from "./alumnos/alumnos.service";
import { CarrerasService } from "./carreras/carreras.service";
import { DatePipe } from '@angular/common';
import { MateriasService } from "./materias/materias.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AlumnosComponent,
    AlumnosFormComponent,
    MateriasComponent,
    CarrerasComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
      
      //Paths personalizados
      { path: "alumnos", component: AlumnosComponent },
      { path: "alumnos-agregar", component: AlumnosFormComponent },
      { path: "alumnos-editar/:nroLegajo", component: AlumnosFormComponent },
      { path: "materias", component: MateriasComponent },
      { path: "carreras", component: CarrerasComponent },
      
    ]),
  ],
  providers: [AlumnosService, CarrerasService, MateriasService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
