import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {
  options: Array<any> = ['title', 'dateLastEdited'];
  value: string = 'title';
  constructor() { }

  ngOnInit(): void {
  }

  onChange($event) {
    this.value = $event.target.value;
    console.log(this.value)
  }

}
