import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component.ts/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: 'navbar', component: NavbarComponent }];

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule],
  exports: [NavbarComponent]
})
export class NavbarModule {
}
