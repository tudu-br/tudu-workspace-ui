import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.css'],
})
export class CardLayoutComponent implements OnInit {
  @Input() statusPedido: string = '';
  @Input() cardTemplateIndicator: number = 0; // 1 para serviço, 2 para candidatura
  @Input() hideHeader: boolean = false; // 1 para serviço, 2 para candidatura
  @Input() hideDescription: boolean = false; // 1 para serviço, 2 para candidatura

  tags: string[] = ['Residencial', 'Urgente', 'Elétrica'];

  statusOptions = [
    { class: 'status-active', text: 'Ativo', icon: 'fa-circle' },
    { class: 'status-pending', text: 'Em andamento', icon: 'fa-spinner' },
    { class: 'status-completed', text: 'Concluído', icon: 'fa-check' },
    { class: 'status-cancelled', text: 'Cancelado', icon: 'fa-times' },
  ];

  currentStatus = this.statusOptions[0];
  private statusInterval: any;
  flowIndicator: string = '1';

  constructor(private route: Router) {
    this.route.events.subscribe(() => {
      if (this.route.url.includes('budgets')) {
        this.flowIndicator = 'budgets';
        console.log('asdasdadsasda', this.flowIndicator);
      }
    });
  }

  ngOnInit() {
    let index = 0;
    this.statusInterval = setInterval(() => {
      index = (index + 1) % this.statusOptions.length;
      this.currentStatus = this.statusOptions[index];
    }, 3000);

    console.log('cardTemplateIndicator', this.cardTemplateIndicator);
  }

  get badgeStyles(): { [key: string]: string } {
    const status = this.statusPedido?.toLowerCase();

    switch (status) {
      case 'finalizado':
        return { backgroundColor: '#4caf5020', color: '#4caf50' }; // verde suave
      case 'concluido':
        return { backgroundColor: '#0096881c', color: '#009688' }; // teal
      case 'cancelado':
      case 'expirado':
        return { backgroundColor: '#ff52521c', color: '#ff5252' }; // vermelho claro
      case 'publicado':
        return { backgroundColor: '#0096ff1c', color: '#25a5ff' }; // azul suave
      case 'recusado':
        return { backgroundColor: '#ff52521c', color: '#ff5252' }; // vermelho claro
      case 'em negociacao':
        return { backgroundColor: '#ffab251f', color: '#ff9800' }; // laranja suave
      case 'pendente':
        return { backgroundColor: '#9a1fad1c', color: '#7e57c2' }; // roxo claro
      default:
        return { backgroundColor: '#e0e0e044', color: '#757575' }; // cinza padrão
    }
  }

  ngOnDestroy() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }
  }

  verDetalhes() {
    alert('Abrir detalhes do serviço...');
  }
}
