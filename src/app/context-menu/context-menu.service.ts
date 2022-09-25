import { OverlayRef } from "@angular/cdk/overlay";
import { Injectable } from '@angular/core';

@Injectable()
export class ContextMenuService {
  private _activeContextMenu: OverlayRef | null;

  public setContextMenu(_overlayRef: OverlayRef) {
    this._activeContextMenu = _overlayRef;
  }

  public getContextMenu(_overlayRef: OverlayRef) {
    return this._activeContextMenu;
  }

  public close() {
    this._activeContextMenu?.dispose();
    this._activeContextMenu = null;
  }
}
