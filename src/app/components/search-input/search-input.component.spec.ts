import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { locationMock, MockActivatedRoute } from 'src/mock';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInputComponent ],
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
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial value in the input box from route', () => {
    component.route.snapshot.queryParams.query = 'abc';

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.value).toBe('abc');
  })

  it('should call handleOnChange method', () => {
    const handleOnChangeSpy = spyOn(component, 'handleOnChange').and.callThrough();
    const value = 'search text';
    const input = fixture.debugElement.query(By.css('.search-wrapper input'))
    input.triggerEventHandler('change', { target: { value } });
    fixture.detectChanges();

    expect(handleOnChangeSpy).toHaveBeenCalled();
    expect(component.value).toBe(value);
    expect(component.location.go).toHaveBeenCalledWith('/?query='+value);
  })

  describe('Will test clear button', () => {
    it('should not mount clear button', () => {
      expect(fixture.nativeElement.querySelector('.fa-times')).toBeFalsy()
    })
    it('should clear value form search input', () => {
      component.value = 'searchText';
      const handleOnChangeSpy = spyOn(component, 'handleOnChange');
      const clearSearchValueSpy = spyOn(component, 'clearSearchValue').and.callThrough();

      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('i.fa-times'));
      closeButton.nativeElement.click();

      expect(clearSearchValueSpy).toHaveBeenCalled();
      expect(handleOnChangeSpy).toHaveBeenCalledWith({target: { value: '' }})
    })
  })

  it('Will open alert box', () => {
    const handleOnChangeSpy = spyOn(component, 'handleOnChange').and.callThrough();
    const alertSpy = spyOn(window, 'alert');
    const value = "i am searching with \\ simpletext with b-slash";
    const input = fixture.debugElement.query(By.css('.search-wrapper input'))
    const $event = { target: { value } };
    input.triggerEventHandler('change', $event);

    expect(handleOnChangeSpy).toHaveBeenCalledWith($event);
    expect(alertSpy).toHaveBeenCalledWith('Can not use "\\" in search query!!');
    expect(component.value).toBe('');
  })

  it('Will clear value from location search query', () => {
    const handleOnChangeSpy = spyOn(component, 'handleOnChange').and.callThrough();
    const value = '';
    const input = fixture.debugElement.query(By.css('.search-wrapper input'))
    const $event = { target: { value } };
    input.triggerEventHandler('change', $event);

    expect(handleOnChangeSpy).toHaveBeenCalledWith($event);
    expect(component.location.go).toHaveBeenCalledWith('/');
  })

});
