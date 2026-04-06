import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardLayoutComponent } from '../lib/components/card-layout/card-layout.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { FallbackMessageComponent } from './components/fallback-message/fallback-message.component';
import { FormatDateTimePipe } from './components/format-date-time/format-date-time.pipe';
import { NavComponent } from './components/nav/nav.component';
import { TuduComponentsComponent } from './tudu-components.component';
import { PopupComponent } from '../public-api';

@NgModule({
  declarations: [
    TuduComponentsComponent,
    CardLayoutComponent,
    NavComponent,
    FallbackMessageComponent,
    CustomModalComponent,
    PopupComponent,
    FormatDateTimePipe,
  ],
  imports: [CommonModule],
  exports: [
    TuduComponentsComponent,
    CardLayoutComponent,
    NavComponent,
    FallbackMessageComponent,
    CustomModalComponent,
    PopupComponent,
    FormatDateTimePipe,
  ],
})
export class TuduComponentsModule {}
