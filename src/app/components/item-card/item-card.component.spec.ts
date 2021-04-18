import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ItemCardComponent } from './item-card.component';
import { locationMock, MockActivatedRoute } from 'src/mock'
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { data } from 'src/app/app-data';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ItemCardComponent ],
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
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    component.item = data[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image, name, date and description', () => {
    expect(fixture.nativeElement.querySelector('.card-img img')).toBeTruthy()
    expect(
      fixture.nativeElement.querySelector('.card-content h4.title span').textContent
    ).toBe(data[0].name);
    expect(
      fixture.nativeElement.querySelector('.card-content h4.title span.date').textContent
    ).toBe(' May 19, 2018 ');
    expect(
      fixture.nativeElement.querySelector('.card-content p.description').textContent
    ).toBe(data[0].description);
  })

  it('should not render any content if item is null', () => {
    component.item = null;

    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.card-img')
    ).toBe(null);
    expect(
      fixture.nativeElement.querySelector('.card-content')
    ).toBe(null);
  })
});
