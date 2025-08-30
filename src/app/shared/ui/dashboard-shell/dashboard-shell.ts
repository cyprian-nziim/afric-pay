import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardSideNav } from '../dashboard-side-nav/dashboard-side-nav';
import { DashboardTopNav } from '../dashboard-top-nav/dashboard-top-nav';
import { DashboardMobileNav } from '../dashboard-mobile-nav/dashboard-mobile-nav';

@Component({
  selector: 'afric-dashboard-shell',
  imports: [
    RouterModule,
    DashboardSideNav,
    DashboardMobileNav,
    DashboardTopNav,
  ],
  templateUrl: './dashboard-shell.html',
  styleUrl: './dashboard-shell.css',
})
export class DashboardShell {
  sideNavIsOpen = signal<boolean>(true);
}
