import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { BASE_URL_API } from '../app.api'

import { Usuario } from './usuario/usuario.model'

import { ErrorHandler } from '../app.error-handler'

@Injectable()
export class UsuariosService {

    constructor(private http: Http) { }

    usuarios(): Observable<Usuario[]> {
        return this.http.get(`${BASE_URL_API}/customers/`)
            .map(response => response.json().data.customerList)
            .catch(ErrorHandler.handleError)
    }
}
