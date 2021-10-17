import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local-storage.service';
import { LocalStorageRefService } from './services/local-storage-ref.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UrlService } from './services/url.service';


const BASE_MODULES = [ CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ];

const MAT_MODULES = [MatMenuModule, MatIconModule, MatSnackBarModule]!;
const COMPONENTS = []!;
const ENTRY_COMPONENTS = []!;
const PIPES = []!;
const SERVICES = [LocalStorageService, LocalStorageRefService, UrlService]!;
const GUARDS = []!;


const PROVIDERS = [
  ...SERVICES, ...PIPES, ...GUARDS,
];

@NgModule({
  imports: [ ...BASE_MODULES, ...MAT_MODULES ],
  exports: [...BASE_MODULES, ...MAT_MODULES, ...PIPES, ...COMPONENTS],
  declarations: [ ...PIPES, ...COMPONENTS ],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return { ngModule: ThemeModule, providers: [...PROVIDERS] };
  }
}
