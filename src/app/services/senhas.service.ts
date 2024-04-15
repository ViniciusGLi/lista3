import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public inputNovaSenha: string = '';
  public spjaFoi: boolean = false;
  public sgjaFoi: boolean = false;
  public sejaFoi: boolean = false;
  public nextSenha: string = '';
  public numeroSG: number = 0;
  public numeroSP: number = 0;
  public numeroSE: number = 0;

  segundosSG: number = 0;
  contadorSG: any;
  segundosSalvosSG: number[] = [];
  contadorSG1: number = 0;

  segundosSP: number = 0;
  contadorSP: any;
  segundosSalvosSP: number[] = [];
  contadorSP1: number = 0;

  segundosSE: number = 0;
  contadorSE: any;
  segundosSalvosSE: number[] = [];
  contadorSE1: number = 0;


  public senhasArray: { [key: string]: string[] } = {
    'SG': [], // Senhas Gerais
    'SP': [], // Senhas PrioritÃ¡rias
    'SE': []  // Senhas de Exame
  };
  public listaSenhasGeradas: string[] = [];


  constructor() { }

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }

  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }

  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }




  novaSenha(tipoSenhas: string = '') {

    if (tipoSenhas == 'SG') {

      this.somaGeral();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numeroSG + 1).toString().padStart(2, '0');
      this.senhasArray['SG'].unshift(this.inputNovaSenha);
      this.numeroSG++;
      this.iniciarContadorSG();


    } else if (tipoSenhas == 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numeroSP + 1).toString().padStart(2, '0');
      this.senhasArray['SP'].unshift(this.inputNovaSenha);
      this.numeroSP++;
      this.iniciarContadorSP();

    } else if (tipoSenhas == 'SE') {
      this.somaExame();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numeroSE + 1).toString().padStart(2, '0');
      this.senhasArray['SE'].unshift(this.inputNovaSenha);
      this.numeroSE++;
      this.iniciarContadorSE();
    }
    console.log(this.senhasArray);
  }

  iniciarContadorSG() {
    this.contadorSG = setInterval(() => {
      this.segundosSG++;
      this.segundosSalvosSG.push(this.segundosSG);
    }, 1000); // A cada 1000 milissegundos (1 segundo)
  }

  pausarContadorSG() {
    clearInterval(this.contadorSG);
  }

  calcularMediaSegundosSG(): number {
    const media = this.segundosSalvosSG.length / this.contadorSG1;
    return media;
  }

  incrementarContadorSG() {
    this.contadorSG1++; // Incrementa o contador em 1
  }

  //////////////////////////////////////////////////

  iniciarContadorSP() {
    this.contadorSP = setInterval(() => {
      this.segundosSP++;
      this.segundosSalvosSP.push(this.segundosSP);
    }, 1000); // A cada 1000 milissegundos (1 segundo)
  }

  pausarContadorSP() {
    clearInterval(this.contadorSP);
  }

  calcularMediaSegundosSP(): number {
    const media = this.segundosSalvosSP.length / this.contadorSP1;
    return media;
  }

  incrementarContadorSP() {
    this.contadorSP1++; // Incrementa o contador em 1
  }

  /////////////////////////////////////

  iniciarContadorSE() {
    this.contadorSE = setInterval(() => {
      this.segundosSE++;
      this.segundosSalvosSE.push(this.segundosSE);
    }, 1000); // A cada 1000 milissegundos (1 segundo)
  }

  pausarContadorSE() {
    clearInterval(this.contadorSE);
  }

  calcularMediaSegundosSE(): number {
    const media = this.segundosSalvosSE.length / this.contadorSE1;
    return media;
  }

  incrementarContadorSE() {
    this.contadorSE1++; // Incrementa o contador em 1
  }

  //////////////////


  chamarProximaSenha(): string | null {


    if (this.senhasArray['SP'].length > 0 && this.spjaFoi == false) {
      this.pausarContadorSP();
      this.nextSenha =
        this.senhasArray['SP'][this.senhasArray['SP'].length - 1];
      this.listaSenhasGeradas.unshift(this.nextSenha);
      this.senhasArray['SP'].pop();
      this.spjaFoi = true;
      this.sgjaFoi = false;
      this.sejaFoi = false;

    } else if (this.senhasArray['SE'].length > 0 && this.sejaFoi == false) {
      this.pausarContadorSE();
      this.nextSenha =
        this.senhasArray['SE'][this.senhasArray['SE'].length - 1];
      this.listaSenhasGeradas.unshift(this.nextSenha);
      this.senhasArray['SE'].pop();
      this.spjaFoi = false;
      this.sgjaFoi = false;
      this.sejaFoi = true;

    } else if (this.senhasArray['SG'].length > 0 && this.sgjaFoi == false) {
      this.pausarContadorSG();
      this.nextSenha =
        this.senhasArray['SG'][this.senhasArray['SG'].length - 1];
      this.listaSenhasGeradas.unshift(this.nextSenha);
      this.senhasArray['SG'].pop();
      this.spjaFoi = false;
      this.sgjaFoi = true;
      this.sejaFoi = false;



    } else {
      this.spjaFoi = false;
      this.sgjaFoi = false;
      this.sejaFoi = false;
      return null;
    }
    return this.nextSenha;
  }

}




