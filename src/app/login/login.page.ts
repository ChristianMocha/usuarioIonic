import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  private usuarios: Usuario
  private usuariosAll: Usuario[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.usuarioService.getUser().then( (res: any) => {
      this.usuariosAll = res;
    });
    this.createForm();
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      username: [this.usuarios?.username || null, [Validators.required, Validators.pattern('^[a-zA-Z._%+-]+$')]],
      email: [this.usuarios?.email || null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    });
  }

  async ingresar(){

    if (this.loginForm.valid) {
      const user = await this.usuariosAll.find( res => res.username === this.loginForm.value.username && res.email === this.loginForm.value.email);
      
      if (!user) {
        this.alert('Credenciales incorrectas');
        return;
      }else{
        this.saveStorage(user)
      } 
    }else{
      this.alert('Verifique que los campos esten correctos');
    }
  }

  private saveStorage(user: Usuario){
    this.usuarioService.saveStorage(user).then( 
      () => this.router.navigate(['/tabs/tab1']),
      err => this.alert('Error al almacenar el elemento')
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
