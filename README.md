# KodoApp

`          Author: Mangal Singh
                                                `

## Prerequisites
Node - v14.16.0
npm - v6.14.11

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

## Steps to run application [Development server]

1. `npm install`
2. `npm start`
3. Navigate to `http://localhost:4200/`


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests. This will open new chrome window if asks please allow.

### Tech stack/Library

`karma`, `istanbul`, `jasmine` [angular-default]

## Assumptions

1. tabular view is independent and filters won't apply.
2. same mock_json data is used to render in table as well
3. Pagination not added on tabular view.


## Additional files included

1. Roboto fonts are used for font-family.
2. Font-awesome icons [free version] are used.


## Functionalities

### 1. Search
 ####  `i.   matching query`
 ####  `ii.  exact match query with double quotes`

### 2. Sort
  #### `i.   sort by title - asc`
  #### `ii.  sort by dateLastEdited - desc`
  #### `iii. sort by empty string - no sorting `

### 3. Pagination
  #### `i.   fast-backword, prev, next and fast-forward buttons `
  #### `ii.  input box to jump to any page no. - will accept any no. but after submit will convert proper page no.`
