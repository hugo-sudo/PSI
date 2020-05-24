import { identifierModuleUrl } from '@angular/compiler'
import { ObjectUnsubscribedError } from 'rxjs'

export class Hotel {
    _id: string
    name:  string
    description:  string
    location:  string
    gps:  string
    phone:  string
    email:  string
    services: [string, string, string]
    totalBedrooms: number
    lowestPrice: number
    quarto1: string
    nDispReservationsQuarto1: number
    quarto1precoBaixa: number
    quarto1precoAlta: number
    quarto1servicos: [string]
    reservationsQuarto1:  Array<string>
    quarto2: string
    nDispReservationsQuarto2: number
    quarto2precoBaixa: number
    quarto2precoAlta: number
    quarto2servicos:  [string]
    reservationsQuarto2:  Array<string>
    quarto3: string
    nDispReservationsQuarto3: number
    quarto3precoBaixa: number
    quarto3precoAlta: number
    quarto3servicos: [string]
    reservationsQuarto3:  Array<string>
    quarto4: string
    nDispReservationsQuarto4: number
    quarto4precoBaixa: number
    quarto4precoAlta: number
    quarto4servicos:  [string]
    reservationsQuarto4:  Array<string>
    imagens: [string]
    precoBaixo: [string]
    precoalto: [string]
}

