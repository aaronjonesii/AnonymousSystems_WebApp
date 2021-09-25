import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbDialogModule, NbMenuModule, NbToastrModule } from "@nebular/theme";
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './theme.module';
import { HttpClientModule } from '@angular/common/http';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule.forRoot(),
    NbDialogModule,
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatTooltipModule,

    //  Lazy Loaded Modules below
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent],
})
export class AppModule { }
