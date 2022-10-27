import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-log-o',
  templateUrl: './button-log-o.component.html',
  styleUrls: ['./button-log-o.component.scss'],
})
export class ButtonLogOComponent implements OnInit {

  constructor(private alertCtrl: AlertController, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  async logOut(){
    const alert = await this.alertCtrl.create({
      header: 'Esta seguro de salir de la app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },{
        text: 'OK',
        handler: () => this.deleteUser()
      }]
    });

    await alert.present();
  }

  

  private deleteUser(){
    this.usuarioService.deleteStorage().then( 
      () => this.router.navigate(['/login']),
      err => this.alert('Error al eliminar el elemento')
    );
  }

  private async alert(mesaje: string){
    const alert = await this.alertCtrl.create({
      header: mesaje,
      buttons: [{
        text: 'OK',
        role: 'OK'
      }]
    });

    await alert.present();
  }

}
