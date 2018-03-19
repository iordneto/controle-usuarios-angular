import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Observable } from 'rxjs/Observable';
import { Usuario } from './usuario/usuario.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'cad-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Observable<Usuario[]>
  dtTrigger: Subject<any> = new Subject();

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosService.usuarios()
  }

  removeUsuario(id: number) {
    console.log("remove: " + id)
  }

  editaUsuario(id: number) {
    console.log("edita: " + id)
  }
}
