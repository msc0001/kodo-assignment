import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
  let route:any;

  beforeEach(async(() => {
    route = jasmine.createSpyObj('ActivatedRouteMock', ['get']);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        BrowserModule,
        AppRoutingModule,
        FormsModule
      ],
      providers: [
        Location,
        { provide: ActivatedRoute, useValue: route }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
