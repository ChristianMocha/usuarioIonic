import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  @Input() usuario: Usuario

  constructor() { }

  ngOnInit() {}

}
