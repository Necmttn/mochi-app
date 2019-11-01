import { IDisposable } from '@phosphor/disposable';
import { Signal } from '@phosphor/signaling';

import { Databases, DatabaseManager } from './database';
import { Contents, ContentsManager } from './contents';
import { Settings, SettingManager } from './setting';

export class ServiceManager implements ServiceManager.IManager {
  constructor(options: ServiceManager.IOptions = {}) {
    let resolveReadyPromise: () => void;
    this._readyPromise = new Promise<void>(res => resolveReadyPromise = res);

    this.settings = new SettingManager();
    this.contents = new ContentsManager();
    this.databases = new DatabaseManager();

    resolveReadyPromise();
  }

  get isReady(): boolean {
    return this._isReady;
  }

  get ready(): Promise<void> {
    return this._readyPromise;
  }

  get isDisposed(): boolean {
    return this._isDisposed;
  }

  /**
   * Dispose of the resources held by the manager.
   */
  dispose(): void {
    if (this._isDisposed) {
      return;
    }

    this._isDisposed = true;
    Signal.clearData(this);

    this.contents.dispose();
    this.settings.dispose();
  }

  /**
   * Get the contents manager instance.
   */
  readonly contents: ContentsManager;

  /**
   * Get the settings manager instance.
   */
  readonly settings: SettingManager;

  /**
   * Get the databases manager instance.
   */
  readonly databases: DatabaseManager;

  private _isDisposed = false;
  private _isReady = false;
  private readonly _readyPromise: Promise<void>;
}

export namespace ServiceManager {
  export interface IManager extends IDisposable {
    /**
     * Test whether the manager is ready.
     */
    readonly isReady: boolean;

    /**
     * A promise which fulfills when the manager is ready.
     */
    readonly ready: Promise<void>;

    // List of managers managed by the service manager.
    readonly contents: Contents.IManager;
    readonly settings: Settings.IManager;
    readonly databases: Databases.IManager;
  }

  export interface IOptions {
    //
  }
}
