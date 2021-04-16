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

  handleNext() {
    if (this.page >= this.total) return;
    this.page = this.page + 1;
    this.getItems();
  }

  handlePrev() {
    if (this.page <= 1) return;
    this.page = this.page - 1;
    this.getItems();
  }

  onChangePage($event) {
    const newPageValue = parseInt($event.target.value || "1", 10);

    if (newPageValue>=this.total) {
      this.page = this.total;
      return;
    }
    if (newPageValue <= 1) {
      this.page = 1;
      return;
    }
    this.page = newPageValue;

    this.getItems();
  }

  getItems() {
    const start = (this.page - 1) * this.pageSize;
    const end = (this.page) * this.pageSize;
    this.items = data.slice(start, end);
  }

}
