import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { locationMock, MockActivatedRoute } from 'src/mock';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
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
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.total).toBe(1);
    expect(component.page).toBe(1);
  });

  describe('Will test the component', () => {
    it('should disable prev-next buttons for total 1 no of pages', () => {
      const prevButtons = fixture.nativeElement.querySelectorAll('.prev-page.disabled');
      expect(prevButtons.length).toBe(2);

      const nextButtons = fixture.nativeElement.querySelectorAll('.next-page.disabled');
      expect(nextButtons.length).toBe(2);
    })

    it('should disable prev buttons and enable next buttons', () => {
      component.total = 10;

      fixture.detectChanges();
      const prevButtons = fixture.nativeElement.querySelectorAll('.prev-page.disabled');
      expect(prevButtons.length).toBe(2);

      const nextButtons = fixture.nativeElement.querySelectorAll('.next-page.disabled');
      expect(nextButtons.length).toBe(0);
    })

    it('should disable next buttons on last page', () => {
      component.total = 10;
      component.page = 10;

      fixture.detectChanges();
      const prevButtons = fixture.nativeElement.querySelectorAll('.prev-page.disabled');
      expect(prevButtons.length).toBe(0);

      const nextButtons = fixture.nativeElement.querySelectorAll('.next-page.disabled');
      expect(nextButtons.length).toBe(2);
    })

    it('should enable both buttons for middle pages', () => {
      component.total = 10;
      component.page = 3;

      fixture.detectChanges();
      const prevButtons = fixture.nativeElement.querySelectorAll('.prev-page.disabled');
      expect(prevButtons.length).toBe(0);

      const nextButtons = fixture.nativeElement.querySelectorAll('.next-page.disabled');
      expect(nextButtons.length).toBe(0);
    })
  })

  describe('Will test click and change events', () => {
    beforeEach(() => {
      component.total = 10;
      component.page = 5;
      fixture.detectChanges();
    })

    it('should change page to prev', () => {
      const prevSpy = spyOn(component, 'handlePrev').and.callThrough();
      let prevButtons = fixture.debugElement.queryAll(By.css('.pagination-wrapper .prev-page'));

      prevButtons[1].nativeElement.click();
      expect(prevSpy).toHaveBeenCalledWith(false);
      expect(component.page).toBe(4);

      prevButtons[0].nativeElement.click();
      expect(prevSpy).toHaveBeenCalledWith(true);
      expect(component.page).toBe(1);

      const onChangeEmitSpy = spyOn(component, 'onChangeEmit').and.callThrough();
      component.handlePrev(false); // will return undefined if called while disabled
      expect(prevSpy.calls.count()).toBe(3);
      expect(onChangeEmitSpy.calls.count()).toBe(0);
    });

    it('should change page to next', () => {
      const nextSpy = spyOn(component, 'handleNext').and.callThrough();
      let nextButtons = fixture.debugElement.queryAll(By.css('.pagination-wrapper .next-page'));

      nextButtons[0].nativeElement.click();
      expect(nextSpy).toHaveBeenCalledWith(false);
      expect(component.page).toBe(6);

      nextButtons[1].nativeElement.click();
      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(component.page).toBe(10);

      const onChangeEmitSpy = spyOn(component, 'onChangeEmit').and.callThrough();
      component.page = 10;
      component.handleNext(false); // will return undefined if called while disabled
      expect(nextSpy.calls.count()).toBe(3);
      expect(onChangeEmitSpy.calls.count()).toBe(0);
    });

    it('should test the onchange from input', () => {
      const onChangePageSpy = spyOn(component, 'onChangePage').and.callThrough();

      const input = fixture.debugElement.query(By.css('.pagination-wrapper .page input'));

      const $event = {target: {value: '2'}};
      input.triggerEventHandler('change', $event);
      expect(onChangePageSpy).toHaveBeenCalledWith($event);
      expect(component.page).toBe(2);
    })

    it('should test the onchange from input on entering value >= total pages', () => {
      const onChangePageSpy = spyOn(component, 'onChangePage').and.callThrough();

      const input = fixture.debugElement.query(By.css('.pagination-wrapper .page input'));

      const $event = {target: {value: '20'}};
      input.triggerEventHandler('change', $event);
      expect(onChangePageSpy).toHaveBeenCalledWith($event);
      expect(component.page).toBe(10);
    })

    it('should test the onchange from input on entering value <= 1', () => {
      const onChangePageSpy = spyOn(component, 'onChangePage').and.callThrough();

      const input = fixture.debugElement.query(By.css('.pagination-wrapper .page input'));

      const $event = {target: {value: '-1'}};
      input.triggerEventHandler('change', $event);
      expect(onChangePageSpy).toHaveBeenCalledWith($event);
      expect(component.page).toBe(1);
    })

    it('should test the onchange from input on entering empty value', () => {
      const onChangePageSpy = spyOn(component, 'onChangePage').and.callThrough();

      const input = fixture.debugElement.query(By.css('.pagination-wrapper .page input'));

      const $event = {target: {value: ''}};
      input.triggerEventHandler('change', $event);
      expect(onChangePageSpy).toHaveBeenCalledWith($event);
      expect(component.page).toBe(1);
    })
  })
});
