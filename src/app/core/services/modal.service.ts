import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modals = signal<any[]>([]);

  constructor() {}

  /**
   * Adds a modal instance to the list of active modals.
   * @param modal - The modal instance to be added.
   */
  add(modal: any) {
    // TODO: Since all modals are in a specific context, we need to make sure modal IDs are unique
    this.modals().push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals.set(this.modals().filter((x) => x.id() !== id));
  }

  /**
   * Opens a modal with the specified ID.
   * @param id - The unique identifier of the modal to open.
   */
  open(id: string) {
    const modal = this.modals().find((x) => x.id() === id);
    modal.open();
  }

  /**
   * Closes a modal with the specified ID.
   * @param id - The unique identifier of the modal to close.
   */
  close(id: string) {
    const modal = this.modals().find((x) => x.id() === id);
    modal.close();
  }

  /**
   * Closes all active modals.
   * Iterates through the array of currently active modals and invokes the close method on each.
   */
  closeAll() {
    this.modals().forEach((modal) => {
      modal.close();
    });
  }

  openWithMessage(id: any, message: any) {
    const modal = this.modals().find((x) => x.id === id);
    modal.openWithMessage(message);
  }
}
