import { Pipe, PipeTransform } from '@angular/core';
import {UtilsService} from '../services/utils.service';

@Pipe({
  name: 'separator'
})
export class SeparatorPipe implements PipeTransform {

  constructor(private utilservice: UtilsService) {
  }
  transform(value: number, sep: string): string {
    return this.utilservice.formatMillier(value, sep);
  }

}
