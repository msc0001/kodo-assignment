import { Component, Input, OnInit } from '@angular/core';
import { ItemI } from 'src/models/item.interface';
import { data } from 'src/app/app-data';

enum HeaderDataTypes {
  IMAGE='img',
  STRING='str',
  DATE='date'
}

interface HeaderI {
  text: string;
  value: string;
  type: HeaderDataTypes
}

const headers = [
  {text: 'Title', value: 'name', type: HeaderDataTypes.STRING},
  {text: 'Description', value: 'description', type: HeaderDataTypes.STRING},
  {text: 'Image', value: 'image', type: HeaderDataTypes.STRING},
  {text: 'Date', value: 'dateLastEdited', type: HeaderDataTypes.DATE},
]

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  @Input() headers: Array<HeaderI> = headers;
  @Input() rows: Array<ItemI> = data;

  headerTypes: HeaderDataTypes;
  constructor() { }

  ngOnInit(): void {
  }

}
