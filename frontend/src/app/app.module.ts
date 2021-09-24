import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbMenuModule, NbToastrModule } from "@nebular/theme";
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './theme.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    HttpClientModule,
    //  Lazy Loaded Modules below
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
