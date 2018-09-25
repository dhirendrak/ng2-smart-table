import { Component, OnInit } from '@angular/core';
import { DefaultFilter } from './default-filter';
import { HttpClient } from "@angular/common/http";

export interface Config {
    dropdownList: Array<any>,
    selectedItems: Array<any>,
    dropdownSettings: DropdownSettings
}
export interface DropdownSettings {
    singleSelection?: boolean,
    text?: string,
    selectAllText?: string,
    unSelectAllText?: string,
    enableSearchFilter?: boolean,
    classes?: string
}

export interface ResponseData {
    entity: Entity[];
    message: string;
}

export interface Entity {
    firstName: string;
    lastName: string;
    lognName: string;
}

@Component({
    selector: 'mselect-filter',
    template: `<angular2-multiselect [data]="itemList" [(ngModel)]="selectedItems" [settings]="settings" (onSelect)="onItemSelect($event)"
    (onDeSelect)="OnItemDeSelect($event)" (onSelectAll)="onSelectAll($event)" (onDeSelectAll)="onDeSelectAll($event)">
    <c-search>
         <ng-template>
             <input type="text" (keyup)="onSearch($event)" placeholder="Search countries" style="border: none;width: 100%; height: 100%;outline: none;"/>
         </ng-template>
    </c-search>
    <c-item>
        <ng-template let-item="item">
            <label style="color: #333;width: 150px;">{{item.name}}</label>
            <img [src]="item.flag" style="width: 30px; border: 1px solid #efefef;margin-right: 0px;" />
            <label>{{item.capital}}</label>
        </ng-template>
    </c-item>
</angular2-multiselect>`
})
export class MselectFilterComponent extends DefaultFilter implements OnInit {

    itemList: any = [];
    selectedItems: any = [];
    settings = {};

    constructor(private http: HttpClient) {
        super()
    }

    ngOnInit() {

        this.settings = {
            text: "Select Countries",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: "myclass custom-class",
            primaryKey: "alpha3Code",
            labelKey: "name",
            noDataLabel: "Search Countries...",
            enableSearchFilter: true,
            searchBy: ['name', 'capital']
        };
    }
    onSearch(evt: any) {
        console.log(evt.target.value);
        this.itemList = [];
        this.http.get('https://restcountries.eu/rest/v2/name/' + evt.target.value + '?fulltext=true')
            .subscribe(res => {
                console.log(res);
                this.itemList = res;
            }, error => {

            });
    }
    onItemSelect(item: any) {
        this.updateQuery();
    }
    OnItemDeSelect(item: any) {
        this.updateQuery();
    }
    onSelectAll(items: any) {
        this.updateQuery();
    }
    onDeSelectAll(items: any) {
        this.updateQuery();
    }
    updateQuery() {
        this.query = this.selectedItems.map(item => item.id).join(";").replace(/ /g, '')
        this.setFilter()
    }
}
