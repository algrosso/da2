import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kpa'
})
export class KpaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): String {
    if (isNaN(value)){
      return("?");
    }
    return (value.toString()+" Kpa");
  }

}
