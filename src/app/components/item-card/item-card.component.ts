import { Component, Input, OnInit } from '@angular/core';
import { ItemI } from 'src/models/item.interface';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: ItemI;
  constructor() { }

  ngOnInit(): void {
  }

}
