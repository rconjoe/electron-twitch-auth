import { ipcMain } from 'electron';

interface FrontendIpcModule {
  // sends a one way-from main to renderer, no response expected
  send(eventName: string, data: unknown): void;

  // registers a synchronous event listener for messages coming from the renderer
  on<ExpectedArgs extends Array<unknown> = [], ReturnPayload = void>(
    eventName: string,
    callback: (...args: ExpectedArgs) => ReturnPayload
  ): void;

  // registers an async listener for messages from the renderer
  onAsync<ExpectedArgs extends Array<unknown> = [], ReturnPayload = void>(
    eventName: string,
    callback: (...args: ExpectedArgs) => Promise<ReturnPayload>
  ): void;

  // sends a message to the renderer and waits for a response
  fireEventAsync<ReturnPayload = void>(
    eventName: string,
    data: unknown
  ): Promise<ReturnPayload>;
}

// class FrontendIpc implements FrontendIpcModule {
//   private _listeners = {};
//
//   private registerEventWithElectron(eventName: string): void {
//     ipcMain.on(eventName, (event, data) => {
//       const eventListeners = this._listeners[eventName];
//       for (const listener of eventListeners) {
//         if (listener.async) {
//           listener.callback(data).then((returnValue: unknown) => {
//             this.send(`${eventName}:reply`, returnValue);
//           });
//         } else {
//           const returnValue = listener.callback(data);
//           event.returnValue = returnValue
//         }
//       }
//     });
//   }
// }
