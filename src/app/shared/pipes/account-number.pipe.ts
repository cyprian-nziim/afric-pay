import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountNumber',
  standalone: true
})
export class AccountNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    // Format as XXXX XXXX XXXX XXXX or similar
    return value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }
}
