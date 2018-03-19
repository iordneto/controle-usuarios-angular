import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from './usuario.model';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cad-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario

  constructor(private usuariosService: UsuariosService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.usuariosService.usuarioPorId(this.route.snapshot.params['id'])
    .subscribe(usuario => this.usuario = usuario)
  }
}
