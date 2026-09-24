import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateTime',
})
export class FormatDateTimePipe implements PipeTransform {
  transform(value: string | null | undefined, showAgora: boolean = true): string {
    if (!value) return '';

    if (value === 'A definir' || value === 'A combinar com o prestador') {
      return 'A definir';
    }

    let inputDate: Date;

    if (value.includes('T')) {
      inputDate = new Date(value);
    } else {
      const parts = value.split(' ');
      if (parts.length < 2) {
        inputDate = new Date(value);
      } else {
        const [datePart, timePart] = parts;
        const [year, month, day] = datePart.split('-').map(Number);
        const [hour, minute] = timePart.split(':').map(Number);
        inputDate = new Date(year, month - 1, day, hour || 0, minute || 0);
      }
    }

    if (isNaN(inputDate.getTime())) {
      return value;
    }

    const today = new Date();

    if (inputDate.getTime() < today.getTime()) {
      return 'A definir';
    }

    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const inputDateOnly = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );

    const isToday = inputDateOnly.getTime() === todayDate.getTime();

    const dayStr = String(inputDate.getDate()).padStart(2, '0');
    const monthStr = String(inputDate.getMonth() + 1).padStart(2, '0');
    const yearStr = inputDate.getFullYear();
    const hourStr = String(inputDate.getHours()).padStart(2, '0');
    const minuteStr = String(inputDate.getMinutes()).padStart(2, '0');
    const timeStr = `${hourStr}:${minuteStr}`;

    if (showAgora && isToday) {
      return `Hoje às ${timeStr}`;
    }

    return `${dayStr}/${monthStr}/${yearStr} - ${timeStr}`;
  }
}
