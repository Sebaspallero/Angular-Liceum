import { Pipe, PipeTransform } from '@angular/core';
import { Students } from 'src/app/core/models/students';


@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Students, ...args: unknown[]): unknown {
    const fullName = `${value.name} ${value.lastName}`.toLowerCase();
    const arr = fullName.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    };
    const uperrFullName = arr.join(" ");
    return uperrFullName;
  }

}
