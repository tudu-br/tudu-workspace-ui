import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDateTime',
})
export class FormatDateTimePipe implements PipeTransform {
  transform(value: string | null | undefined, showAgora: boolean = true): string {
    if (!value) return '';

    if (value === 'A definir' || value === 'A combinar com o prestador') {
      return 'A definir';
    }

    const mDate = (moment as any)(value);

    if (!mDate.isValid()) {
      return value;
    }

    const now = (moment as any)();

    if (mDate.isBefore(now)) {
      return 'A definir';
    }

    if (showAgora && mDate.isSame(now, 'day')) {
      return `Hoje às ${mDate.format('HH:mm')}`;
    }

    return mDate.format('DD/MM/YYYY - HH:mm');
  }
}
