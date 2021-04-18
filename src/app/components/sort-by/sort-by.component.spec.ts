import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { locationMock, MockActivatedRoute } from 'src/mock';

import { SortByComponent } from './sort-by.component';

enum SortTypes {
  string,
  date
}

const sortConfigMock = [
  {
    key: 'Title',
    value: 'name',
    type: SortTypes.string
  },
  {
    key: 'Date Last Edited',
    value: 'dateLastEdited',
    type: SortTypes.date
  }
];

describe('SortByComponent', () => {
  let component: SortByComponent;
  let fixture: ComponentFixture<SortByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortByComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
      ],
      providers: [
        { provide: Location, useValue: locationMock },
        { provide: ActivatedRoute, useValue: MockActivatedRoute() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Will test sort component with options', () => {
    beforeEach(() => {
      component.options = sortConfigMock;
      fixture.detectChanges();
    })

    it('should set initial value in the input box from route', () => {
      locationMock.path.and.returnValue('/?sortby=title');
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.value).toBe('title');
    })

    it('should call handleOnChange method', () => {
      locationMock.path.and.returnValue('/');
      const onChangeSpy = spyOn(component, 'onChange').and.callThrough();
      const value = 'title';
      const input = fixture.debugElement.query(By.css('.sort-by-wrapper select'))
      input.triggerEventHandler('change', { target: { value } });
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalled();
      expect(component.value).toBe(value);
      expect(component.location.go).toHaveBeenCalledWith('/?sortby='+value);
    })

    it('should call append query params in url', () => {
      locationMock.path.and.returnValue('/?query=searchtext&sortby=name');
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.value).toBe('name');

      const value = sortConfigMock[1].value;
      const select = fixture.debugElement.query(By.css('.sort-by-wrapper select'))
      select.nativeElement.value = value;
      select.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.value).toBe(value);
      expect(component.location.go).toHaveBeenCalledWith('/?query=searchtext&sortby='+value);
    })

    it('should test for empty value', () => {
      locationMock.path.and.returnValue('/?query=searchtext&sortby=name');
      component.ngOnInit();
      fixture.detectChanges();

      const select = fixture.debugElement.query(By.css('.sort-by-wrapper select'))
      select.nativeElement.value = '';
      select.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.value).toBe('');
      expect(component.location.go).toHaveBeenCalledWith('/?query=searchtext');
    })
  })



});
