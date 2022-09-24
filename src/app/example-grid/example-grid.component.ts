import { Component, OnInit } from '@angular/core';
import { IgxColumnComponent } from 'igniteui-angular';
import { Employee, employeesData } from './localData';

@Component({
  selector: 'app-example-grid',
  templateUrl: './example-grid.component.html',
  styleUrls: ['./example-grid.component.scss']
})
export class ExampleGridComponent implements OnInit {
  public localData: Employee[] = [];
  title = 'example-grid';

  ngOnInit(): void {
    this.localData = employeesData;
  }

  public onColumnInit(column: IgxColumnComponent): void {
    if (column.field === 'RegistererDate') {
      column.formatter = (date => date.toLocaleDateString());
    }
  }
}
