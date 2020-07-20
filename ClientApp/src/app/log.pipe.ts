import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'log'
})
export class LogPipe implements PipeTransform {

  transform(value:object) {
    console.log(value);
  }

}
