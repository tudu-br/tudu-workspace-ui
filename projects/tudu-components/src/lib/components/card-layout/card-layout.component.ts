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
      case 'concluido':
        return { backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success)' };
      case 'prestador_a_caminho':
      case 'em_deslocamento':
      case 'no_local':
        return { backgroundColor: 'var(--status-teal-bg)', color: 'var(--status-teal)' };
      case 'cancelado':
      case 'expirado':
      case 'atrasado':
        return { backgroundColor: 'var(--status-danger-bg)', color: 'var(--status-danger)' };
      case 'publicado':
      case 'agendado':
        return { backgroundColor: 'var(--status-info-bg)', color: 'var(--status-info)' };
      case 'recusado':
        return { backgroundColor: 'var(--status-danger-bg)', color: 'var(--status-danger)' };
      case 'em negociacao':
      case 'negociacao':
      case 'em_andamento':
      case 'em_execucao':
        return { backgroundColor: 'var(--status-warning-bg)', color: 'var(--status-warning)' };
      case 'pendente':
      case 'aguardando_prestador':
        return { backgroundColor: 'var(--status-pending-bg)', color: 'var(--status-pending)' };
      default:
        return { backgroundColor: 'var(--status-neutral-bg)', color: 'var(--status-neutral)' };
    }
  }
}

