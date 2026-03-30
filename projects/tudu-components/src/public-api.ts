/*
 * Public API Surface of tudu-components
 */

// 1. Primeiro as bases e services
export * from './lib/tudu-components.service';
export * from './lib/tudu-components.component';

// 2. Depois os componentes individuais
export * from './lib/components/card-layout/card-layout.component';
export * from './lib/components/nav/nav.component';
export * from './lib/components/fallback-message/fallback-message.component';
export * from './lib/components/custom-modal/custom-modal.component';
export * from './lib/components/popup/popup.component'; // ✅ Classe do popup pronta aqui

// 3. Pipes
export * from './lib/components/format-date-time/format-date-time.pipe';

// 4. POR ÚLTIMO o módulo que declara todo mundo
export * from './lib/tudu-components.module';
