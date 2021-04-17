import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { FeedComponent } from './components/feed/feed.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    SortByComponent,
    ItemCardComponent,
    FeedComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
