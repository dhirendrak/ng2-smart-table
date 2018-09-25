import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServerDataSource } from '../../../../../src/ng2-smart-table';

@Component({
  selector: 'advanced-example-server',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  `,
})
export class AdvancedExampleServerComponent {
  emailData = [
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      passed: 'Yes',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      passed: 'No',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      email: 'Karley_Dach@jasper.info',
      passed: 'Yes',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      email: 'Telly.Hoeger@billy.biz',
      passed: 'No',
    },
  ];

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      albumId: {
        title: 'Album',
        filter: {
          type: 'datepicker'
        },
      },
      title: {
        title: 'Title',
        filter: {
          type: 'multiple',
          config: {
            dropdownList: [],
            selectedItems: [],
            dropdownListAPI: 'https://restcountries.eu/rest/v2/name/',
            dropdownSettings: {
              singleSelection: false,
              text: "Select",
              selectAllText: 'Select None',
              unSelectAllText: 'UnSelect All',
              enableSearchFilter: true,
              classes: "myclass custom-class",
              primaryKey: "alpha3Code",
              labelKey: "name",
              noDataLabel: "Search",
              searchBy: ['name', 'capital']
            }
          }
        }
      },
      url: {
        title: 'Email',
        filter: {
          type: 'completer',
          config: {
            completer: {
              data: this.emailData,
              searchFields: 'email',
              titleField: 'email',
            },
          },
        },
      },
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });
  }
}
