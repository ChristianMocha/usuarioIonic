import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonLogOComponent } from './button-log-o/button-log-o.component';
import { CardsComponent } from './cards/cards.component';



@NgModule({
  declarations: [
    ButtonLogOComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

  ],
  exports: [
    ButtonLogOComponent,
    CardsComponent
  ]
})
export class ComponentsModule { }
