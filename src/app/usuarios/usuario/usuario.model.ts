export enum Genero {
  masculino ='M',
  feminino = 'F'
}

export enum TipoPessoa {
  fisica = 'Physical',
  juridica = 'Juridical'
}

export interface Usuario {

    id: number
    name: string
    federalId: string
    registration: string
    phone: string
    phone2: string
    email: string
    emailCollection: string
    residencialPhone: string
    commercialPhone: string
    emergencyContact: string
    emergencyPhone: string
    birthday: Date
    gender: Genero
    federalIdType: TipoPessoa
    commercialAddress: any,
    residentialAddress: any,
    active: boolean

  }
  