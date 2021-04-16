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

  page: number = 1;
  total: number = 1;
  pageSize: number = 9;

  constructor() { }

  ngOnInit(): void {
    this.total = Math.ceil(data.length / this.pageSize);
    this.getItems();
  }

  onChangePage($event) {
    this.page = $event;
    this.getItems();
  }

  getItems() {
    const start = (this.page - 1) * this.pageSize;
    const end = (this.page) * this.pageSize;
    this.items = data.slice(start, end);
  }

}
