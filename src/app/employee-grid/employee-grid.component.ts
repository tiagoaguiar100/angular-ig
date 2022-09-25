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
  public error = '';

  public actions = [
    {
      label: 'Update row from clipboard',
      callback: (_: IgxGridComponent, row: string) => this.updateCallback(row)
    },
    {
      label: 'Insert new row from clipboard',
      callback: (grid: IgxGridComponent, _: string) => this.insertCallback(grid)
    },
  ]

  public ngOnInit(): void {
    this.localData = employeesData;
  }

  public onColumnInit(column: IgxColumnComponent): void {
    if (column.field === 'RegistererDate') {
      column.formatter = (date => date?.toLocaleDateString());
    }
  }

  /**
   * Callback for update a row in grid from clipboard
   * @param row
   */
  private updateCallback(row: string): void {
    let employee: Partial<Employee>;
    navigator.clipboard
      .readText()
      .then(
        (clipText) => {
          try {
            employee = JSON.parse(clipText);
          } catch (e){
            this.error = `Format Error: Please use the same format as the examples. \n <<${e}>>`;
          }
          this.localData = this.localData.map(element => element.EmployeeID === row ? { ...element, ...employee} : element);
        },
      );
  }

  /**
   * Callback for insert a new row in grid from clipboard
   * @param grid
   */
  private async insertCallback(grid: IgxGridComponent): Promise<void> {
    let employee: Employee;
    await navigator.clipboard
      .readText()
      .then(
        (clipText) => {
          try {
            employee = JSON.parse(clipText);
          } catch (e){
            this.error = `Format Error: Please use the same format as the examples. \n <<${e}>>`;
          }
          this.localData.unshift(employee);
        }
      );
      grid.markForCheck();
  }
}
