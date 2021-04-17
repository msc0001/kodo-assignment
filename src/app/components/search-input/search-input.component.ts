import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getUrlSearchParams, createQueryString } from 'src/utils';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  value: string = ''
  location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit(): void {
    this.value = getUrlSearchParams(
      this.location.path()
      ).params.query || '';
  }

  handleOnChange($event: any): void {
    this.value = $event.target.value;
    const { path, params } = getUrlSearchParams(this.location.path());
    params.query = this.value;
    const queryString = createQueryString(params);
    this.location.go(
      `${path}${queryString ? `?${queryString}` : ''}`
    );
  }
}
