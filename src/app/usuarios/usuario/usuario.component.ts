import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'

import { Usuario } from './usuario.model';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cad-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario

  usuarioForm: FormGroup

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  phonePattern = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
  datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/
  federalIDPattern = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/

  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuariosService.usuarioPorId(this.route.snapshot.params['id'])
      .subscribe(usuario => this.usuario = usuario)

    this.usuarioForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      federalId: this.formBuilder.control('', [Validators.required, Validators.pattern(this.federalIDPattern)]),
      registration: this.formBuilder.control(''),
      phone: this.formBuilder.control('', [Validators.required, Validators.pattern(this.phonePattern)]),
      phone2: this.formBuilder.control('', [Validators.pattern(this.phonePattern)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailCollection: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      residencialPhone: this.formBuilder.control('', [Validators.pattern(this.phonePattern)]),
      commercialPhone: this.formBuilder.control('', [Validators.pattern(this.phonePattern)]),
      emergencyContact: this.formBuilder.control(null),
      emergencyPhone: this.formBuilder.control(null),
      birthday: this.formBuilder.control(null, [Validators.pattern(this.datePattern)]),
      gender: this.formBuilder.control(null),
      federalIdType: this.formBuilder.control('Physical', [Validators.required]),
      commercialAddress: this.formBuilder.control(null),
      residentialAddress: this.formBuilder.control(null),
      active: this.formBuilder.control(true, [Validators.required])
    }, {
        validators: [UsuarioComponent.validaCpfCnpj,
        UsuarioComponent.validaTipoPessoa]
      })
  }

  static validaCpfCnpj(group: AbstractControl): { [key: string]: boolean } {
    return undefined
  }

  static validaTipoPessoa(group: AbstractControl): { [key: string]: boolean } {
    return undefined
  }

  submeterForm(usuario: Usuario){
    this.usuariosService.inserir(usuario)
      .subscribe( usuario => {
        this.router.navigate(['/usuarios'])
    })
    console.log(usuario)
  }
}
