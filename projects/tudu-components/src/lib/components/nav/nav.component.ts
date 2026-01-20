import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'lib-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  changeNavColor: boolean = false;

  openClose: boolean = false;
  message: string = '';

  lastScrollPosition = 0;
  isHeaderVisible = true;
  headerHeight = 0;
  isMobile = false;

  hasOffer: boolean = false;
  allowTransparency = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private el: ElementRef
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.allowTransparency = !!data['transparentNav'];

        this.lastScrollPosition = 0;

        this.isHeaderVisible = true; // força aparecer no load
        this.changeNavColor = !this.allowTransparency;
      });
  }

  ngAfterViewInit() {
    this.checkMobile();

    // Obtém a altura do header-menu após a view ser inicializada
    const headerMenu = this.el.nativeElement.querySelector('[header-menu]');
    if (headerMenu) {
      this.headerHeight = headerMenu.offsetHeight;
    }
  }

  ngOnInit(): void {
    this.hasOffer = this.router.url.includes('offer');
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  private checkMobile() {
    this.isMobile = window.innerWidth < 768; // 768px é o breakpoint padrão do Tailwind para md
    if (!this.isMobile) {
      this.isHeaderVisible = true; // Garante que fique visível em desktop
    }
  }
  public menu() {
    this.openClose = !this.openClose;
  }

  receiveMessage(event: string) {
    this.message = event;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = scroll > this.lastScrollPosition;

    // --- REGRA DE VISIBILIDADE ---
    if (this.allowTransparency) {
      // Comportamento especial para Showcase (sua regra atual)
      if (scroll <= 10) {
        // No topo: fica invisível (se você quer que suma ao chegar no topo,
        // isHeaderVisible deve ser false ou a cor deve ser transparente)
        this.isHeaderVisible = !isScrollingDown;
      } else if (isScrollingDown && scroll > 50) {
        // Scroll Down: esconde
        this.isHeaderVisible = false;
      } else {
        // Scroll Up: mostra
        this.isHeaderVisible = true;
      }
    } else {
      // REGRA PARA DEMAIS COMPONENTES: Sempre visível
      this.isHeaderVisible = true;
    }

    // --- REGRA DE COR (Mantida) ---
    if (!this.allowTransparency) {
      this.changeNavColor = true;
    } else {
      this.changeNavColor = scroll > 20;
    }

    this.lastScrollPosition = scroll;
  }
}
