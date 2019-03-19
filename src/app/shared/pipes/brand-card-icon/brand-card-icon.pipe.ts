import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'brandCardIcon'})
export class BrandCardIconPipe implements PipeTransform {
  transform(value: any): any {
    let iconName;

    if (value.toLowerCase() == 'mastercard') {
      iconName = 'cc-mastercard';
    }
    if (value.toLowerCase() == 'visa') {
      iconName = 'cc-visa';
    }

    return 'fa fa-' + iconName;
  }
}