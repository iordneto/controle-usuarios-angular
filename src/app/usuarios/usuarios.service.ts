import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

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

    usuarioPorId(id: number): Observable<Usuario> {
        return this.http.get(`${BASE_URL_API}/customer/${id}`)
            .map(response => response.json().data.customer)
            .catch(ErrorHandler.handleError)
    }

    inserir(usuario: Usuario): Observable<Usuario> {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${BASE_URL_API}/customer`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers }))
            .map(response => response.json())
            .map(order => order.id)
    }

    deletar(id: number) {
        return this.http.delete(`${BASE_URL_API}/customer/${id}`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError);
    }

    atualizar(usuario: Usuario): Observable<Usuario> {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.put(`${BASE_URL_API}/customer`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers }))
            .map(response => response.json())
            .catch(ErrorHandler.handleError);;
    }
}
