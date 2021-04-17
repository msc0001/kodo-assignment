import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { data } from 'src/app/app-data';
import { ItemI } from 'src/models/item.interface';
import { filterByMatchedQuery, getUrlSearchParams, sortConfig, sortItems } from 'src/utils'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  // items which are matching the query after deep, copying data
  allItems: Array<ItemI> = [];
  // items to be render after pagination
  items: Array<ItemI> = [];

  // search filter
  searchedQuery: string = '';
  // sort filter
  sortBy: string = '';
  // pagination
  page: number = 1;
  total: number = 1;
  pageSize: number = 9;

  location: Location;
  route: ActivatedRoute

  constructor(location: Location, route: ActivatedRoute) {
    this.location = location;
    this.route = route;
  }

  ngOnInit(): void {
    this.syncConfigWithUrl();
    this.location.onUrlChange((url, state) => this.syncConfigWithUrl(url, state));
    this.total = Math.ceil(this.allItems.length / this.pageSize);
    this.getItems();
  }

  onChangePage($event) {
    this.page = $event;
    this.items = this.addPagination(this.allItems);
  }

  getItems() {
    this.allItems = this.addSorting(this.addFilter(data));
    this.total = Math.ceil(this.allItems.length / this.pageSize);
    this.page = 1;
    this.items = this.addPagination(this.allItems);
  }

  addFilter(itemsToAddFilterOn: Array<ItemI>): Array<ItemI> {
    return filterByMatchedQuery(itemsToAddFilterOn, this.searchedQuery);
  }

  addSorting(itemsToAddSortingOn: Array<ItemI>): Array<ItemI> {
    const { sortBy } = this;
    const selectedSortByOption = sortConfig
      .find(sortOption => sortOption.value === sortBy);

    if (!sortBy || !selectedSortByOption) return itemsToAddSortingOn;

    return sortItems(itemsToAddSortingOn, selectedSortByOption);
  }

  addPagination(itemsToAddPaginationOn: Array<ItemI>): Array<ItemI> {
    const start = (this.page - 1) * this.pageSize;
    const end = (this.page) * this.pageSize;
    return itemsToAddPaginationOn.slice(start, end);
  }

  syncConfigWithUrl(url?: string, state?: any) {
    const  locationPath = getUrlSearchParams(url || this.location.path());
    this.searchedQuery = locationPath.params.query || '';
    this.sortBy = locationPath.params.sortby || '';
    this.getItems();
  }
}
