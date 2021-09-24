import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  CORPORATE_THEME, COSMIC_THEME, DARK_THEME, DEFAULT_THEME,
  NbDialogModule, NbIconModule, NbLayoutModule, NbSidebarModule, NbThemeModule, NbWindowModule
} from '@nebular/theme';

const BASE_MODULES = [ CommonModule, RouterModule ];
const NB_MODULES = [
  NbLayoutModule, NbIconModule,
]!;
const MAT_MODULES = []!;
const ENTRY_COMPONENTS = []!;
const PIPES = []!;
const SERVICES = []!;
const GUARDS = []!;

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
  ).providers!,
  ...NbSidebarModule.forRoot().providers!,
  ...NbDialogModule.forRoot().providers!,
  ...NbWindowModule.forRoot().providers!,
];

const PROVIDERS = [
  ...NB_THEME_PROVIDERS, ...SERVICES, ...PIPES, ...GUARDS,
];

@NgModule({
  imports: [ ...BASE_MODULES, ...NB_MODULES, ...MAT_MODULES ],
  exports: [...BASE_MODULES, ...NB_MODULES, ...MAT_MODULES, ...PIPES],
  declarations: [ ...PIPES ],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return { ngModule: ThemeModule, providers: [...PROVIDERS] };
  }
}
