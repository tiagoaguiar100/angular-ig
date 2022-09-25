import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IgxColumnComponent, IgxGridComponent } from 'igniteui-angular';
import { Employee, employeesData } from './localData';
import { ContextMenuDirective } from '../context-menu/context-menu.directive';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.scss']
})
export class EmployeeGridComponent implements OnInit {
  public localData: Employee[] = [];
  public error = '';
  private errorMessage = 'Format Error: Please use the same format as the examples.';

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

  @ViewChildren(ContextMenuDirective) contextMenuDirective: ContextMenuDirective[];

  constructor() {}

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
    this.error = '';
    let employee: Partial<Employee>;
    navigator.clipboard
      .readText()
      .then(
        (clipText) => {
          try {
            employee = JSON.parse(clipText);
            this.localData = this.localData.map(element => element.EmployeeID === row ? { ...element, ...employee} : element);
          } catch (e){
            this.error = `${this.errorMessage} <<${e}>>`;
          } finally {
            this.close();
          }
        },
      );
  }

  /**
   * Callback for insert a new row in grid from clipboard
   * @param grid
   */
  private async insertCallback(grid: IgxGridComponent): Promise<void> {
    this.error = '';
    let employee: Employee;
    await navigator.clipboard
      .readText()
      .then(
        (clipText) => {
          try {
            employee = JSON.parse(clipText);
            this.localData.unshift(employee);
          } catch (e){
            this.error = `${this.errorMessage} <<${e}>>`;
          } finally {
            this.close();
          }
        }
      );
    grid.markForCheck();
  }

  /**
   * Close context menu
   */
  private close(){
   let contextMenu = this.contextMenuDirective.find(element => element._overlayRef);
   contextMenu?.close();
  }
}
