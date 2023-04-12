import { Pipe, PipeTransform } from '@angular/core';
import { student } from 'src/app/form/students/students.component';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: student, ...args: unknown[]): unknown {
    const fullName = `${value.name} ${value.lastName}`.toLowerCase();
    const arr = fullName.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    };
    const uperrFullName = arr.join(" ");
    return uperrFullName;
  }

}