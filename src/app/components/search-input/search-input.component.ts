import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createQueryString } from 'src/utils';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  value: string = ''
  location: Location;
  route: ActivatedRoute;

  constructor(location: Location, route: ActivatedRoute) {
    this.location = location;
    this.route = route;
  }

  ngOnInit(): void {
    this.value = this.route.snapshot.queryParams.query || '';
  }

  handleOnChange($event: any): void {
    this.value = $event.target.value;
    if(this.value.includes("\\")) {
      alert('Can not use "\\" in search query!!');
      this.value = '';
      return;
    }
    // let { path, params } = getUrlSearchParams(this.location.path());
    const path = this.route.snapshot.routeConfig.path;
    let params = this.route.snapshot.queryParams;
    if (this.value) {
      params = {
        ...params,
        query: this.value
      }
    } else {
      const { query, ...rest } = params;
      params = rest;
    }
    const queryString = createQueryString(params);
    this.location.go(
      `${path}${queryString ? `?${queryString}` : ''}`
    );
  }

  clearSearchValue(): void {
    this.handleOnChange({target: {value: ''}});
  }
}
