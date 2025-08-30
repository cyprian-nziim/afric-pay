import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor() {}

  /**
   * Runs a given request function, retrying up to a maximum number of attempts with a 1 second delay between attempts.
   *
   * @param requestFn The function which makes the request to be retried.
   * @returns The result of the successful request, or an error after the maximum number of attempts has been exceeded.
   */

  async handleRequest(requestFn: () => Promise<any>): Promise<any> {
    const maxAttempts = environment.production ? 3 : 1;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        // Add delay before making the request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await requestFn();
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts} failed:`, error);
        if (attempts >= maxAttempts) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    // This point should be unreachable, but is here to satisfy TypeScript.
    throw new Error('Unexpected error: Retry loop exited unexpectedly.');
  }
}
