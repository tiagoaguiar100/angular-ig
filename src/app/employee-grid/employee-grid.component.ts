import { Component, OnInit } from '@angular/core';
import { IgxColumnComponent, IgxGridComponent } from 'igniteui-angular';
import { Employee, employeesData } from './localData';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.scss']
})
export class EmployeeGridComponent implements OnInit {
  public localData: Employee[] = [];
  title = 'employee-grid';

  public actions = [
    {
      label: 'Update row from clipboard',
      callback: (_: any, row: string) => {
          this.localData = this.localData.map(element =>
            element.EmployeeID === row ? { ...element, FirstName: 'aa' } : element
        );
      }
    },
    {
      label: 'Insert new row from clipboard',
      callback: (grid: IgxGridComponent) => {
        this.localData.unshift({
          EmployeeID: '1',
          FirstName: 'John',
          LastName: 'Doe',
          Country: 'USA'
        } as Employee)
        grid.markForCheck();
      }
    },
  ]

  ngOnInit(): void {
    this.localData = employeesData;
  }

  public onColumnInit(column: IgxColumnComponent): void {
    if (column.field === 'RegistererDate') {
      column.formatter = (date => date?.toLocaleDateString());
    }
  }
}
