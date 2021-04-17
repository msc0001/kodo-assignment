import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { getUrlSearchParams, createQueryString, sortConfig } from 'src/utils';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {
  options: Array<any> = sortConfig.map(sortOption => sortOption.key);
  value: string = '';
  location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit(): void {
    this.value = getUrlSearchParams(this.location.path())
      .params.sortby || '';
  }

  onChange($event: any) {
    this.value = $event.target.value;

    const { path, params } = getUrlSearchParams(this.location.path());
    params.sortby = this.value;
    const queryString = createQueryString(params);
    this.location.go(
      `${path}${queryString ? `?${queryString}` : ''}`
    );
  }

}
