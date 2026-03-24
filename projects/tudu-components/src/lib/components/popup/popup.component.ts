import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

export type PopupType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'lib-popup',
  standalone: false,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() type: PopupType = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() duration = 4000;

  @Output() closed = new EventEmitter<void>();

  isClosing = false;
  private timer: any;

  // Getters para as classes - Evita erro de parser no HTML
  get barColor(): string {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-amber-500',
      info: 'bg-blue-500',
    };
    return colors[this.type] || 'bg-blue-500';
  }

  get iconClass(): string {
    const icons = {
      success: 'fa-check-circle text-green-500',
      error: 'fa-times-circle text-red-500',
      warning: 'fa-exclamation-triangle text-amber-500',
      info: 'fa-info-circle text-blue-500',
    };
    return `fas ${icons[this.type]}`;
  }

  get animationClass(): string {
    return this.isClosing
      ? 'animate-slide-out-right'
      : 'animate-slide-in-right';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.isClosing = false;
      this.startTimer();
    }
  }

  private startTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.closePopup(), this.duration);
  }

  closePopup() {
    if (this.isClosing) return;
    this.isClosing = true;
    setTimeout(() => {
      this.isOpen = false;
      this.isClosing = false;
      this.closed.emit();
    }, 400);
  }
}
