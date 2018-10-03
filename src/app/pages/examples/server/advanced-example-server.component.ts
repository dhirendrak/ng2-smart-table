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

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      albumId: {
        title: 'Album',
      },
      title: {
        title: 'Title',
        filter: {
          type: 'multiple',
          config: {
            dropdownList: [
              { "id": 1, "itemName": "India" },
              { "id": 2, "itemName": "Singapore" },
              { "id": 3, "itemName": "Australia" },
              { "id": 4, "itemName": "Canada" },
              { "id": 5, "itemName": "South Korea" },
              { "id": 6, "itemName": "Brazil" }
            ],
          },
        },
      },
      url: {
        title: 'Url',
      },
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });
  }
}
