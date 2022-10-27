import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public usuarios: Usuario[] = [];
  public loading: boolean;

  constructor(private usuarioService: UsuarioService, private loadingCtrl: LoadingController) {}

  ngOnInit(): void {
    this.getUsuarios();
    
  }

  async getUsuarios(){
    this.loading = true;
    await this.usuarioService.getUser().then( (res: any) => {
      this.usuarios = res;
      this.loading = false;
    });
  }


}
