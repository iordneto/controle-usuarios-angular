import { Routes } from '@angular/router'

import { UsuariosComponent } from './usuarios/usuarios.component'
import { SobreComponent } from './sobre/sobre.component'
import { UsuarioComponent } from './usuarios/usuario/usuario.component';

export const ROUTES: Routes = [
  {path: '', component: UsuariosComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/:id', component: UsuarioComponent},
  {path: 'sobre', component: SobreComponent},
]
