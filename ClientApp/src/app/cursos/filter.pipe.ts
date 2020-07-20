import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    
    // console.log("Search string: ", field);
    // console.log("Filtro: ", value);

    //Filtro hardcodeado - Refactorizado pendiente
    if (field == "profesor") {
      return items.filter((singleItem) =>
      singleItem[field].nombre
      .concat(' ', singleItem[field].apellido)
      .toLowerCase()
      .includes(value.trim().toLowerCase())
      );
    }
    
    if(field == "materia"){
      return items.filter((singleItem) =>
      singleItem["profesor"].materia.nombre
      .toLowerCase()
      .includes(value.trim().toLowerCase())
      );
    }
    
    return items;
  }
}
