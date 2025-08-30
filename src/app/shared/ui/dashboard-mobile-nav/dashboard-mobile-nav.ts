import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'afric-dashboard-mobile-nav',
  imports: [CommonModule, RouterModule, TranslocoModule],
  templateUrl: './dashboard-mobile-nav.html',
  styleUrl: './dashboard-mobile-nav.css',
})
export class DashboardMobileNav {}
