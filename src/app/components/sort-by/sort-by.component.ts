import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { getUrlSearchParams, createQueryString, sortConfig } from 'src/utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {
  options: Array<any> = sortConfig;
  value: string = '';
  location: Location;
  route: ActivatedRoute;

  constructor(location: Location, route: ActivatedRoute) {
    this.location = location;
    this.route = route;
  }

  ngOnInit(): void {
    this.value = getUrlSearchParams(this.location.path())
      .params.sortby || '';
  }

  onChange($event: any) {
    this.value = $event.target.value;

    const path = this.route.snapshot.routeConfig.path;
    let params = this.route.snapshot.queryParams;
    if (!this.value) {
      const { sortby, ...rest } = params;
      params = rest;
      this.value = '';
    } else {
      params = {
        ...params,
        sortby: this.value
      };
    }
    const queryString = createQueryString(params);
    this.location.go(
      `${path}${queryString ? `?${queryString}` : ''}`
    );
  }

}
