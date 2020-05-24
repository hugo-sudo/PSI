export class Reserva {
    nomeHotel: string
    datas: string 
    tipoQuarto: string
    nome: String
    morada:  String
    telefone: String 
    email: String 
    NIF: String 
    nCartao: String 
    prazo:  String 
    cvv:  String 
    totalPago: Number

    constructor(nomeHotel: string,
        datas: string ,
        tipoQuarto: string,
        nome: String,
        morada:  String,
        telefone: String ,
        email: String ,
        NIF: String ,
        nCartao: String, 
        prazo:  String ,
        cvv:  String ,
        totalPago: Number){
            this.nomeHotel = nomeHotel;
            this.datas = datas;
            this.tipoQuarto = tipoQuarto;
            this.nome = nome;
            this.morada = morada;
            this.telefone = telefone;
            this.email = email;
            this.NIF = NIF;
            this.nCartao = nCartao;
            this.prazo = prazo;
            this.cvv = cvv;
            this.totalPago = totalPago;
        }
}
