import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  CORPORATE_THEME, COSMIC_THEME, DARK_THEME, DEFAULT_THEME, NbCardModule,
  NbDialogModule, NbIconModule, NbLayoutModule, NbSidebarModule, NbTagModule, NbThemeModule, NbWindowModule
} from '@nebular/theme';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local-storage.service';
import { LocalStorageRefService } from './services/local-storage-ref.service';
import { MatTooltipModule } from '@angular/material/tooltip';

const BASE_MODULES = [ CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ];
const NB_MODULES = [
  NbLayoutModule, NbIconModule, NbCardModule, NbTagModule,
]!;
const MAT_MODULES = [
  MatDialogModule, MatButtonModule, MatRippleModule, MatSnackBarModule, MatTooltipModule,
]!;
const COMPONENTS = []!;
const ENTRY_COMPONENTS = []!;
const PIPES = []!;
const SERVICES = [LocalStorageService, LocalStorageRefService]!;
const GUARDS = []!;

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
  ).providers!,
  ...NbSidebarModule.forRoot().providers!,
  ...NbWindowModule.forRoot().providers!,
];

const PROVIDERS = [
  ...NB_THEME_PROVIDERS, ...SERVICES, ...PIPES, ...GUARDS,
];

@NgModule({
  imports: [ ...BASE_MODULES, ...NB_MODULES, ...MAT_MODULES ],
  exports: [...BASE_MODULES, ...NB_MODULES, ...MAT_MODULES, ...PIPES, ...COMPONENTS],
  declarations: [ ...PIPES, ...COMPONENTS ],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return { ngModule: ThemeModule, providers: [...PROVIDERS] };
  }
}
