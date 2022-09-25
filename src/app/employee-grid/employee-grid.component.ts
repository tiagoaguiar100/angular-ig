import { Component, OnInit } from '@angular/core';
import { IgxGridComponent, IgxGridRow } from 'igniteui-angular';
import { Employee, employeesData } from './localData';
import {ObjectID} from 'bson';
import { Action } from '../context-menu/context-menu.component';
import { ContextMenuService } from '../context-menu/context-menu.service';

export interface Column {
  field: string;
  header: string;
  value?: (value: any) => void;
}

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.scss']
})
export class EmployeeGridComponent implements OnInit {
  public localData: Employee[] = [];
  public error = '';
  private errorMessage = 'Format Error: Please use the same format as the examples.';

  public actions: Action[] = [
    {
      label: 'Update row from clipboard',
      callback: (grid: IgxGridComponent, row: IgxGridRow) => this.updateCallback(grid, row)
    },
    {
      label: 'Insert new row from clipboard',
      callback: (grid: IgxGridComponent, _: IgxGridRow) => this.insertCallback(grid)
    },
  ];

  public columns = [
    {
      field: 'FirstName',
      header: 'First Name'
    },
    {
      field: 'LastName',
      header: 'Last Name'
    },    {
      field: 'Country',
      header: 'Country'
    },    {
      field: 'Age',
      header: 'Age'
    },    {
      field: 'RegistererDate',
      header: 'Registerer Date',
      value: (value: any) => value?.toLocaleDateString()
    },
  ]

  constructor(private readonly contextMenuService: ContextMenuService) {}

  public ngOnInit(): void {
    this.localData = employeesData;
  }

  /**
   * Callback for update a row in grid from clipboard
   * @param row
   */
  private updateCallback(grid: IgxGridComponent, row: IgxGridRow): void {
    let employee: Partial<Employee>;
    this.error = '';
    navigator.clipboard
      .readText()
      .then(
        (clipText) => {
          try {
            employee = JSON.parse(clipText);
            this.localData[row.index] = { ...this.localData[row.index], ...employee};
            grid.markForCheck();
          } catch (e){
            this.error = `${this.errorMessage} <<${e}>>`;
          } finally {
            this.contextMenuService.close();
          }
        },
      );
  }

  /**
   * Callback for insert a new row in grid from clipboard
   * @param grid
   */
  private insertCallback(grid: IgxGridComponent): void {
    let employee: Employee;
    this.error = '';
    navigator.clipboard
      .readText()
      .then(
        (clipText) => {
          try {
            employee = JSON.parse(clipText);
            if(!employee.EmployeeID) {
              employee.EmployeeID = new ObjectID().toString();
            }
            employee.RegistererDate = new Date();
            this.localData.unshift(employee);
            grid.markForCheck();
          } catch (e){
            this.error = `${this.errorMessage} <<${e}>>`;
          } finally {
            this.contextMenuService.close();
          }
        }
      );
  }
}
