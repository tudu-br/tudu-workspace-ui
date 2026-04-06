import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateTime',
})
export class FormatDateTimePipe implements PipeTransform {
  transform(value: string | null | undefined, showAgora: boolean = true): string {
    if (!value) return '';

    const [datePart, timePart] = value.split(' ');
    const [year, month, day] = datePart.split('-');

    if (!year || !month || !day || !timePart) return value;

    const inputDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

    const isToday = inputDateOnly.getTime() === todayDate.getTime();

    if (showAgora && isToday) {
      return `Hoje às ${timePart}`;
    }

    return `${day}/${month}/${year} - ${timePart}`;
  }
}
