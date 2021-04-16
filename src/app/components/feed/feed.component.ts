import { Component, OnInit } from '@angular/core';
import { data } from '../../app-data';
import { ItemI } from '../../../models/item.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  items: Array<ItemI> = [];
  constructor() { }

  ngOnInit(): void {
    this.items = data;
  }

}
