import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, PreloadAllModules } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { UsuariosComponent } from './usuarios/usuarios.component'
import { SobreComponent } from './sobre/sobre.component'
import { UsuarioComponent } from './usuarios/usuario/usuario.component'
import { UsuariosService } from './usuarios/usuarios.service'
import { HttpModule } from '@angular/http'
import { InputComponent } from './compartilhado/input/input.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'
import { MatRadioModule } from '@angular/material/radio'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsuariosComponent,
    SobreComponent,
    UsuarioComponent,
    InputComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    DataTablesModule,
    NgxMaskModule.forRoot({
      clearIfNotMatch: true
    }),
    MatRadioModule,
    MatSlideToggleModule
  ],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
