import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PasskeysAuth } from '../../features/passkeys-auth/passkeys-auth';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'afric-passkey',
  imports: [CommonModule, PasskeysAuth, TranslocoModule, RouterModule],
  templateUrl: './passkey.page.html',
  styleUrl: './passkey.page.css',
})
export class PasskeyPage {
  loading = signal<boolean>(false);
}
