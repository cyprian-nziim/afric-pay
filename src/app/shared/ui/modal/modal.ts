import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  model,
  output,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'qwiko-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  id = model.required<string>();
  isOpen = model<boolean>(false);
  isOpenEffect = effect(() => {
    if (!this.isOpen()) {
      this.closeEvent.emit(true);
    }
  });
  openOnInit = model<boolean>(false);
  isDismissible = model<boolean>(false);
  isCentered = model<boolean>(false);
  isFullScreen = model<boolean>(false);
  enforceHeight = model<boolean>(false);
  focusInputID = model<string>('');
  closeEvent = output<boolean>();

  constructor(private modalService: ModalService) {}

  /**
   * OnInit lifecycle hook. Adds the modal instance to the modal service so
   * that it can be accessed from other components.
   */
  ngOnInit(): void {
    // console.log('Initializing Modal');
    this.modalService.add(this);
    if (this.openOnInit()) {
      // console.log('Auto Opening Modal');
      this.open();
    }
  }

  /**
   * When the component is destroyed, remove self from the modal service
   * and detach the element from the DOM.
   */
  ngOnDestroy(): void {
    this.modalService.remove(this.id());
    // this.element.remove();
  }

  /**
   * Opens the modal. Sets the isOpen model to true and logs a message to
   * the console. If focusInputID is set, it will focus the element with that
   * id after opening.
   */
  open(): void {
    this.isOpen.set(true);
    if (this.focusInputID) {
      const focusEl = document.getElementById(this.focusInputID());
      focusEl?.focus();
    }
  }

  /**
   * Closes the modal. Sets the isOpen model to false.
   */
  close(): void {
    this.isOpen.set(false);
    this.openOnInit.set(false);
    // console.log('Closing');
    // event.preventDefault();
    // this.closeEvent.emit(true);
  }
}
