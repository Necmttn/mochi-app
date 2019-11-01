import { DatabaseBrowser } from './browser';
import { Token } from '@phosphor/coreutils';

export const IDatabaseBrowserFactory = new Token<IDatabaseBrowserFactory>(
  '@mochi/databasebrowser:IDatabaseBrowserFactory',
);

export interface IDatabaseBrowserFactory {
  /**
   * Create a new file browser instance.
   *
   * @param id - The widget/DOM id of the file browser.
   *
   * @param options - The optional file browser configuration object.
   *
   * #### Notes
   * The ID parameter is used to set the widget ID. It is also used as part of
   * the unique key necessary to store the file browser's restoration data in
   * the state database if that functionality is enabled.
   *
   * If, after the file browser has been generated by the factory, the ID of the
   * resulting widget is changed by client code, the restoration functionality
   * will not be disrupted as long as there are no ID collisions, i.e., as long
   * as the initial ID passed into the factory is used for only one file browser
   * instance.
   */
  createDatabaseBrowser(id: string, options?: IDatabaseBrowserFactory.IOptions): DatabaseBrowser;

  /**
   * The default database browser for the application.
   */
  defaultDatabaseBrowser: DatabaseBrowser;
}

export namespace IDatabaseBrowserFactory {
  /**
   * The options for creating a file browser using a browser factory.
   */
  export interface IOptions {
    /**
     * The time intervar for browser refreshing. in ms.
     */
    refreshInterval?: number;
  }
}
