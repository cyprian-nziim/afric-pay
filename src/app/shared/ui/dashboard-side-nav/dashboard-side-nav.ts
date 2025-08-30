import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'afric-dashboard-side-nav',
  imports: [CommonModule, RouterModule, TranslocoModule],
  templateUrl: './dashboard-side-nav.html',
  styleUrl: './dashboard-side-nav.css',
})
export class DashboardSideNav {
  sideNavIsOpen = model<boolean>(true);
}
