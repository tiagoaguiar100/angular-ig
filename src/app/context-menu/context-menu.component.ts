import { Component, OnInit, Input } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
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
  @Input() row: string;

  constructor() { }

  ngOnInit(): void {}

}

export interface Action {
  label: string;
  callback: callback;
}

type callback = (grid: any, row: any) => void;
