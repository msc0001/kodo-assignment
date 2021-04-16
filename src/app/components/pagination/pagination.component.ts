import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number = 1;
  @Input() total: number = 1;

  @Output() onChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleNext(isFastForward: boolean) {
    if (this.page >= this.total) return;
    this.page = isFastForward ? this.total : this.page + 1;
    this.onChangeEmit();
  }

  handlePrev(isFastBackward: boolean) {
    if (this.page <= 1) return;
    this.page = isFastBackward ? 1 : this.page - 1;
    this.onChangeEmit();
  }

  onChangePage($event) {
    const newPageValue = parseInt($event.target.value || "1", 10);

    if (newPageValue>=this.total) {
      this.page = this.total;
    } else if (newPageValue <= 1) {
      this.page = 1;
    } else {
      this.page = newPageValue;
    }
    this.onChangeEmit();
  }

  onChangeEmit() {
    this.onChange.emit(this.page);
  }
}
