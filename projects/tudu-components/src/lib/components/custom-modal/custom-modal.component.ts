import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Location } from '@angular/common'; // Importação correta

type ModalType = 'success' | 'error' | 'warning';

@Component({
  selector: 'lib-custom-modal',
  standalone: false,
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
})
export class CustomModalComponent implements OnInit {
  @Input() modalId = 'customModal';
  @Input() title = 'Aviso';
  @Input() message = '';
  @Input() closeButtonText = 'Fechar';
  @Input() actionButtonText = '';
  @Input() paymentMethod: 'pix' | 'credit' | null = null;
  @Input() errorDetails: any = null;

  @Output() modalClosed = new EventEmitter<void>();
  @Output() modalAction = new EventEmitter<void>();

  @Input() showModal = false;
  @Input() messageTitle: string = 'Pagamento Aprovado!';
  @Input() showBtn = true;
  @Input() priceNegotiated = 0;
  @Input() messageBody: string = 'Seu pagamento foi processado com sucesso.';
  @Input() isLoadingBtn: boolean | undefined;

  // Configuração dinâmica
  modalIcon: string = 'fa-check';
  modalIconColor: string = 'text-green-600';
  modalBgColor: string = 'bg-green-100';
  isClosing = false;

  constructor(private location: Location) {}

  ngOnInit(): void {}

  // Centraliza a abertura do modal com suporte ao botão voltar
  openModal(): void {
    this.showModal = true;
    // Adiciona um estado no histórico para o botão voltar funcionar
    this.location.go(this.location.path() + '#modalOpen');
  }

  // Atalho para abrir com tipos específicos
  open(
    type: ModalType,
    message: string = '',
    paymentMethod?: 'pix' | 'credit'
  ): void {
    this.configureModal(type, message);
    if (paymentMethod) {
      this.paymentMethod = paymentMethod;
    }
    this.openModal();
  }

  configureModal(type: ModalType, message: string = ''): void {
    switch (type) {
      case 'success':
        this.setSuccessStyles(message);
        break;
      case 'error':
        this.setErrorStyles(message);
        break;
      case 'warning':
        this.setWarningStyles(message);
        break;
    }
  }

  private setSuccessStyles(message: string): void {
    this.modalIcon = 'fa-check-circle';
    this.modalIconColor = 'modal-icon-success';
    this.modalBgColor = 'modal-bg-success';
    this.messageTitle = 'Sucesso!';
    this.messageBody = message || 'Operação realizada com sucesso.';
  }

  private setErrorStyles(message: string): void {
    this.modalIcon = 'fa-times-circle';
    this.modalIconColor = 'modal-icon-error';
    this.modalBgColor = 'modal-bg-error';
    this.messageTitle = 'Ops! Algo deu errado';
    this.messageBody = message || 'Não conseguimos processar sua solicitação.';
  }

  private setWarningStyles(message: string): void {
    this.modalIcon = 'fa-exclamation-circle';
    this.modalIconColor = 'modal-icon-warning';
    this.modalBgColor = 'modal-bg-warning';
    this.messageTitle = 'Atenção';
    this.messageBody = message || 'Verifique os dados antes de continuar.';
  }

  actionModal(): void {
    if (this.isLoadingBtn !== undefined) {
      this.isLoadingBtn = true;
      this.modalAction.emit();
    } else {
      this.modalAction.emit();
      this.isLoadingBtn = false;
      this.closeModal(); // Usa o método de fechar para limpar o histórico
    }
  }

  closeModal(): void {
    this.isClosing = true; // Ativa a animação de descida

    // Aguarda o tempo da animação (300ms) antes de remover do DOM
    setTimeout(() => {
      this.showModal = false;
      this.isClosing = false; // Reseta para a próxima abertura
      this.modalClosed.emit();

      // Lógica do histórico que já fizemos
      if (window.location.hash === '#modalOpen') {
        const currentPath = this.location.path().split('#')[0];
        this.location.replaceState(currentPath);
      }
    }, 300);
  }
  // Escuta o botão voltar do navegador ou celular
  @HostListener('window:popstate')
  onPopState(): void {
    if (this.showModal) {
      this.showModal = false;
      this.modalClosed.emit();
    }
  }
}
