import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Observable } from 'rxjs/Observable';
import { Usuario } from './usuario/usuario.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'cad-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private usuariosService: UsuariosService,
    private router: Router) { }

  ngOnInit() {
    this.usuariosService.usuarios().subscribe(usuarios => this.usuarios = usuarios)
  }

  removeUsuario(usuario){
    if (confirm("Você tem certeza que gostaria de deletar o usuario " 
            + usuario.name + "?")) {
      var index = this.usuarios.indexOf(usuario);
      this.usuarios.splice(index, 1);

      this.usuariosService.deletar(usuario.id)
        .subscribe(null,
          err => {
            this.usuarios.splice(index, 0, usuario);
          });
    }
  }
}
