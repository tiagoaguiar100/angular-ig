import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxLayoutModule, IgxNavbarModule, IgxNavigationDrawerModule, IgxRippleModule, IgxGridModule } from 'igniteui-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeGridComponent } from './employee-grid/employee-grid.component';
import { ContextMenuDirective } from './context-menu/context-menu.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuService } from './context-menu/context-menu.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeGridComponent,
    ContextMenuDirective,
    ContextMenuComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    AppRoutingModule,
    IgxLayoutModule,
    IgxNavbarModule,
    IgxNavigationDrawerModule,
    IgxRippleModule,
    IgxGridModule,
    OverlayModule
  ],
  providers: [ContextMenuService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
