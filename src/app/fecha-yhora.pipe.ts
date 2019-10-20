import { Pipe, PipeTransform } from '@angular/core';
import { isDate } from 'util';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fechaYhora'
})
export class FechaYhoraPipe implements PipeTransform {

  transform(value: String, ...args: any[]): String {
    if (typeof value === 'string'){
      var date = new Date(value);
      return(date.getDate()+'-' + (date.getMonth()+1) + '-'+date.getFullYear())+" "+date.getHours()+":"+date.getMinutes();
    }else{
      return("?")
    }
  }

}
