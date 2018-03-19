import { Routes } from '@angular/router'

import { UsuariosComponent } from './usuarios/usuarios.component'
import { SobreComponent } from './sobre/sobre.component'

export const ROUTES: Routes = [
  {path: '', component: UsuariosComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'sobre', component: SobreComponent},
]
