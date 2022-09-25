import { Component, Input } from '@angular/core';
import { IgxGridComponent, IgxGridRow } from 'igniteui-angular';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  /**
   * Input context representing igxGrid
   */
  @Input() grid: IgxGridComponent;
  /**
   * Input array of action
   */
  @Input() actions: Action[] = [];
  /**
   * Input row representing igxRow
   */
  @Input() row: IgxGridRow;

  constructor() { }
}

export interface Action {
  label: string;
  callback: callback;
}

type callback = (grid: IgxGridComponent, row: IgxGridRow) => void;
