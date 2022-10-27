import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.loadStorage();
  }

  private async loadStorage(){
    await this.usuarioService.loadStorage().then( (res:any) => {
      if(res){
        this.usuario = JSON.parse(res);
      }
    });
  }

}
