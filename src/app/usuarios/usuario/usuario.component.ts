import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'

import { Usuario, TipoPessoa, Genero } from './usuario.model';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cad-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario

  usuarioForm: FormGroup

  emailCollectionPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25}(;[ ]{0,1}([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})*$/
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  phonePattern = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
  datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/
  federalIDPattern = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/

  modoEdicao: boolean
  delay: boolean

  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      id: this.formBuilder.control(0),
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      federalId: this.formBuilder.control('', [Validators.required, Validators.pattern(this.federalIDPattern)]),
      registration: this.formBuilder.control(''),
      phone: this.formBuilder.control('', [Validators.required, Validators.pattern(this.phonePattern)]),
      phone2: this.formBuilder.control('', [Validators.pattern(this.phonePattern)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailCollection: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailCollectionPattern)]),
      residencialPhone: this.formBuilder.control('', [Validators.pattern(this.phonePattern)]),
      commercialPhone: this.formBuilder.control('', [Validators.pattern(this.phonePattern)]),
      emergencyContact: this.formBuilder.control(null),
      emergencyPhone: this.formBuilder.control(null),
      birthday: this.formBuilder.control(null, [Validators.pattern(this.datePattern)]),
      gender: this.formBuilder.control(Genero.masculino, [Validators.required]),
      federalIdType: this.formBuilder.control(TipoPessoa.fisica, [Validators.required]),
      commercialAddress: this.formBuilder.control(null),
      residentialAddress: this.formBuilder.control(null),
      active: this.formBuilder.control(true, [Validators.required])
    }, {
        validators: [UsuarioComponent.validaTipoPessoa]
      })
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    if (id) {
      this.modoEdicao = true

      this.usuariosService.usuarioPorId(this.route.snapshot.params['id'])
        .subscribe(usuario => {
          this.usuario = usuario
          this.usuarioForm.patchValue(usuario)
          this.usuarioForm.get('federalId').disable()
        }
        )
    }
  }

  mascaraCPFCNPJ(): string {
    let valorAtualCampoCPFCNPJ = this.usuarioForm.get('federalIdType').value;

    if (valorAtualCampoCPFCNPJ == TipoPessoa.fisica) {
      return "000.000.000-00"
    }

    return "00.000.000/0000-00"
  }

  limpaCpfCnpj(): void {
    this.usuarioForm.get('federalId').setValue('')
  }

  static validaCpfCnpj(group: AbstractControl): { [key: string]: boolean } {
    return undefined
  }

  static validaTipoPessoa(group: AbstractControl): { [key: string]: boolean } {
    const genero = group.get('gender').value

    if (!genero) {
      return undefined
    }

    if ((genero != Genero.masculino && genero != Genero.feminino)) {
      return { generoInexistente: true }
    }

    return undefined
  }

  static validaEmailsDeCobranca(group: AbstractControl): { [key: string]: boolean } {
    const emailsDeCobranca = group.get('emailCollection').value

    if (!emailsDeCobranca) {
      return undefined
    }

    if (emailsDeCobranca.contains(';')) {
      let arrayEmails = emailsDeCobranca.split(';')
      arrayEmails.forEach(email => {
        if (email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
          return { emailDeCobrancaInvalido: true }
      });
    }

    return undefined
  }

  submeterForm(usuario: Usuario) {
    this.delay = true;
    if (usuario.id) {
      this.usuariosService.atualizar(usuario)
        .subscribe(usuario => {
          this.router.navigate(['/usuarios'])
        })

    } else {
      delete usuario.id
      this.usuariosService.inserir(usuario)
        .subscribe(usuario => {
          this.router.navigate(['/usuarios'])
        })
    }
  }
}
