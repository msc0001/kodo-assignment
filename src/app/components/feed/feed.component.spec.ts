import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { data } from 'src/app/app-data';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { locationMock, MockActivatedRoute } from 'src/mock';
import { ItemCardComponent } from '../item-card/item-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { SortByComponent } from '../sort-by/sort-by.component';
import { TableViewComponent } from '../table-view/table-view.component';

import { FeedComponent } from './feed.component';

const testBedConfig = (activatedRouteMock) => ({
  declarations: [
    FeedComponent,
    SearchInputComponent,
    SortByComponent,
    ItemCardComponent,
    PaginationComponent,
    TableViewComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: Location, useValue: locationMock },
    { provide: ActivatedRoute, useValue: activatedRouteMock }
  ]
});

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let route:any;

  beforeEach(async(() => {
    route = MockActivatedRoute();
    TestBed.configureTestingModule(
      testBedConfig(route)
    )
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check initial values of properties of the component', () => {
    expect(component.allItems.length).toEqual(100);
    expect([
      component.pageSize,
      component.page,
      component.searchedQuery,
      component.sortBy
    ]).toEqual([12, 1, '', ''])
    expect(component.items).toEqual(data.filter((d, i ) => i<12));
  });

  describe('Will check for all child component to be mouted', () => {
    it('should render app title as Feed', () => {
      expect(
        fixture.nativeElement.querySelector('.app-title h3').textContent
      ).toContain('Feed');
    });

    it('should render search bar component', () => {
      expect(
        fixture.nativeElement.querySelector('app-search-input')
      ).toBeTruthy();
    })

    it('should render sorting component', () => {
      expect(
        fixture.nativeElement.querySelector('app-sort-by')
      ).toBeTruthy();
    })

    it('should render item-card component', () => {
      expect(
        fixture.nativeElement.querySelectorAll('app-item-card').length
      ).toEqual(12);
    })

    it('should render pagination component', () => {
      expect(
        fixture.nativeElement.querySelector('app-pagination')
      ).toBeTruthy();
    })

    it('should render tabular view component', () => {
      expect(
        fixture.nativeElement.querySelector('app-table-view')
      ).toBeTruthy();
    })
  })

  describe('Will test methods', () => {
    it('should call syncConfig on ngOnInit', () => {
      const syncConfigWithUrl = spyOn(component, 'syncConfigWithUrl').and.callThrough();
      const getItems = spyOn(component, 'getItems');

      component.ngOnInit();
      fixture.detectChanges();

      expect(syncConfigWithUrl).toHaveBeenCalledWith();
      expect(component.total).toEqual(9);
      expect(getItems).toHaveBeenCalled();
    })

    it('should call syncConfigWithUrl on location change', () => {
      const getItems = spyOn(component, 'getItems');

      component.ngOnInit();
      fixture.detectChanges();

      const args = ['/?query=abc&sortby=title', null];
      component.syncConfigWithUrl(...args);

      expect(component.searchedQuery).toEqual('abc');
      expect(component.sortBy).toEqual('title');
      expect(getItems).toHaveBeenCalledWith();
    })
  })

  describe('Will test getItems method', () => {
    it('should implement search filter', () => {
      const addFilterSpy = spyOn(component, 'addFilter').and.callThrough();
      const addSortingSpy = spyOn(component, 'addSorting').and.callThrough();
      const addPaginationSpy = spyOn(component, 'addPagination').and.callThrough();
      component.searchedQuery = 'customer';

      component.getItems();

      expect(addFilterSpy).toHaveBeenCalledWith(data);
      expect(addSortingSpy).toHaveBeenCalledTimes(1);
      expect(component.allItems.length).toEqual(5);
      expect(component.total).toEqual(1);
      expect(addPaginationSpy).toHaveBeenCalled();
      expect(component.items.length).toEqual(5);
    })

    it('should implement search and sort filter', () => {
      const addFilterSpy = spyOn(component, 'addFilter').and.callThrough();
      const addSortingSpy = spyOn(component, 'addSorting').and.callThrough();
      const addPaginationSpy = spyOn(component, 'addPagination').and.callThrough();
      component.searchedQuery = 'customer';
      component.sortBy = 'name';

      component.getItems();

      expect(addFilterSpy).toHaveBeenCalledWith(data);
      expect(addSortingSpy).toHaveBeenCalledTimes(1);
      expect(component.allItems.length).toEqual(5);
      expect(component.total).toEqual(1);
      expect(addPaginationSpy).toHaveBeenCalled();
      expect(component.items.length).toEqual(5);
    })
  })

  describe('Will test onChange pagination event', () => {
    it('should call onChangePage and render next set of items', () => {
      const onChangePageSpy = spyOn(component, 'onChangePage').and.callThrough();

      const paginationComponent = fixture.debugElement.query(By.css('app-pagination'));
      paginationComponent.triggerEventHandler('onChange', 2);
      fixture.detectChanges();

      expect(onChangePageSpy).toHaveBeenCalledTimes(1);
      expect(component.page).toEqual(2);
      expect(component.items).toEqual(data.slice(12, 24));

      expect(
        fixture.nativeElement.querySelector('app-item-card.card .description').textContent
      ).toEqual(data[12].description);
    })
  })

  describe('Will test sorting functionality', () => {
    it('should call getItems with new sorting param', () => {
      const spyOnGetItems = spyOn(component, 'getItems').and.callThrough();
      component.syncConfigWithUrl('/?sortby=dateLastEdited');

      fixture.detectChanges();

      expect(spyOnGetItems).toHaveBeenCalled();
    })

    it('should call getItems with not available sorting param', () => {
      const spyOnGetItems = spyOn(component, 'getItems').and.callThrough();
      component.syncConfigWithUrl('/?sortby=noKey');

      fixture.detectChanges();

      expect(spyOnGetItems).toHaveBeenCalled();
      expect(component.allItems).toEqual(data);
    })
  })

});
