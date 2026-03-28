import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.css'],
})
export class CardLayoutComponent {
  @Input() statusPedido: string = '';
  @Input() cardTemplateIndicator: number = 0;
  @Input() hideHeader: boolean = false;
  @Input() hideDescription: boolean = false;

  get badgeStyles(): { [key: string]: string } {
    const status = this.statusPedido?.toLowerCase();

    switch (status) {
      case 'finalizado':
        return { backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success)' };
      case 'concluido':
        return { backgroundColor: 'var(--status-teal-bg)', color: 'var(--status-teal)' };
      case 'cancelado':
      case 'expirado':
        return { backgroundColor: 'var(--status-danger-bg)', color: 'var(--status-danger)' };
      case 'publicado':
        return { backgroundColor: 'var(--status-info-bg)', color: 'var(--status-info)' };
      case 'recusado':
        return { backgroundColor: 'var(--status-danger-bg)', color: 'var(--status-danger)' };
      case 'em negociacao':
      case 'negociacao':
        return { backgroundColor: 'var(--status-warning-bg)', color: 'var(--status-warning)' };
      case 'pendente':
        return { backgroundColor: 'var(--status-pending-bg)', color: 'var(--status-pending)' };
      default:
        return { backgroundColor: 'var(--status-neutral-bg)', color: 'var(--status-neutral)' };
    }
  }
}
