# Angular-ExcelSyncingService

## Overview

The Excel syncing service is a project to synchronize the data between Excel and HTML forms. The project is either used to generate a downloadable formatted Excel file or extract the data from the Excel to be used in HTML forms.

Specifically, after cell binding, it can: 

1. Sync the data from a defined cell to specific form input.
2. Sync the data from the form input to the Excel spreadsheet.
3. Use `json-server` to mock REST API.

## Dependencies
- [Angular Material](https://material.angular.io/) - UI components
- [LuckySheet](https://mengshukeji.github.io/LuckysheetDocs/) - online spreadsheet
- [LuckyExcel](https://www.npmjs.com/package/luckyexcel) - upload Excel
- [Exceljs](https://www.npmjs.com/package/exceljs?source=post_page-----b670f32d5c2a----------------------) - convert luckysheet to Excel file
- [file-saver](https://www.npmjs.com/package/file-saver) - allow the client side to download the edited Excel file
- [uuid](https://www.npmjs.com/package/uuid) - generate unique id even for different types of forms

## Plan
- debug
    - downloaded Excel styling problem (in progress)
- testing
    - Cypress end-to-end testing to ensure consistent behaviors (in progress)


## Angular CLI version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Json-server

The mock server uses the uuid `id` as unique ids, use `json-server db.json --id id` to set `id` as id field.

## Software Architecture
Please see software artifacts to understand how it is designed. The design used the SOA (service-oriented architecture) to reduce the potential duplicate code.