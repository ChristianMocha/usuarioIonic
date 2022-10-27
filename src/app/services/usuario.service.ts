import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlUser = 'https://jsonplaceholder.typicode.com/users';
  private urlImg = 'https://i.pravatar.cc/150?'
  private usuarios: Usuario[] = [];

  constructor(private http: HttpClient, private storage: NativeStorage, private platform: Platform) { }

  getUser(){
    return new Promise(async (resolve, reject) => {
      await this.http.get<Usuario>(this.urlUser).subscribe( (res:any) => {
        let i = 1;
        if (res.length > 0) {
          res.forEach(resOne => {
            resOne.img = this.urlImg + i;
            this.usuarios.push(resOne);
            i++;
          });
        }
        console.log(this.usuarios);
        resolve(this.usuarios);
        this.usuarios = [];
      });
    })


    // return usuario;
  }

  saveStorage(user: any){

    return new Promise((resolve, reject) => {
      if(this.platform.is('cordova')){

        this.storage.setItem('user', JSON.stringify((user))).then(
          () => resolve(true),
          error => resolve(false)
        );

      }else{
        localStorage.setItem('user', JSON.stringify((user)));
        resolve(true);
      }
    });
  }

  deleteStorage(){

    return new Promise((resolve, reject) => {
      if(this.platform.is('cordova')){

        this.storage.remove('user').then(
          () => resolve(true),
          error => resolve(false)
        );

      }else{
        localStorage.removeItem('user');
        resolve(true);
      }
    });
  }


  loadStorage(){
    return new Promise((resolve, reject) => {
      if(this.platform.is('cordova')){

        this.storage.getItem('user').then(data => {
          if(data){
            resolve(data);
          }else{
            resolve(false);
          }
        });

      }else{
        if(localStorage.getItem('user')){
          const user = localStorage.getItem('user');
          resolve(user);
        }else{
          resolve(false);
        }
      }
    });
  }
}
