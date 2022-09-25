import { OverlayRef } from "@angular/cdk/overlay";
import { Injectable } from '@angular/core';

@Injectable()
export class ContextMenuService {
  private _activeContextMenu: OverlayRef | null;

  /**
   * Set active context menu
   * @param _overlayRef
   */
  public setContextMenu(_overlayRef: OverlayRef) {
    this._activeContextMenu = _overlayRef;
  }

  /**
   * get active context menu
   * @param _overlayRef
   * @returns activeContextMenu
   */
  public getContextMenu(_overlayRef: OverlayRef): OverlayRef | null {
    return this._activeContextMenu;
  }

  /**
   * close context menu
   */
  public close() {
    this._activeContextMenu?.dispose();
    this._activeContextMenu = null;
  }
}
