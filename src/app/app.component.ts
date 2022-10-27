import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Platform } from '@ionic/angular';
import { TabsPage } from './tabs/tabs.page';
import { LoginPage } from './login/login.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(platform: Platform, usuarioService: UsuarioService, private router: Router) {
    platform.ready().then(() => {
      usuarioService.loadStorage().then( res => {
        if(res){
          this.router.navigate(['/tabs/tab1']);
        }else{
          this.router.navigate(['/login']);
        }
      })
    })
  }
}
