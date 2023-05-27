/**
 * Custom cookie manager that implements the behavior of the Persistent Cookie
 * @dev Used session storage to store if a session is already opened or not
 * @dev Used local storage to manage cookie data
 * @dev Used broadcasting feature to check/communicate between browser tabs/windows
 */
class CookieManager {
  private readonly CHANNEL_NAME: string = "custom-session-cookie-channel";
  private readonly EVENT_TYPE_CHECK_SAME_HOST: string = "checkSameHost";
  private readonly EVENT_TYPE_SAME_HOST_ALREADY_OPENED: string =
    "sameHostAlreadyOpened";
  private readonly SESSION_STORAGE_INITIALIZED: string =
    "session_storage_initialized";

  private channel: BroadcastChannel;

  constructor() {
    this.channel = new BroadcastChannel(this.CHANNEL_NAME);
  }

  /**
   * Initialize
   */
  public init(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.initLaterEventListeners();

      // If first session, clear local storage
      this.checkIfNotFirstSession().then((isNotFirst) => {
        if (!isNotFirst) {
          // If this is first session
          sessionStorage.setItem(this.SESSION_STORAGE_INITIALIZED, "YES");
          localStorage.clear();
        }
        resolve();
      });
    });
  }

  /**
   * Init broadcasting events for future sessions
   * @return { void }
   */
  private initLaterEventListeners(): void {
    // Listen for messages from newly opened sessions
    this.channel.addEventListener("message", (event: MessageEvent) => {
      if (
        event.data.type === this.EVENT_TYPE_CHECK_SAME_HOST &&
        event.source !== window
      ) {
        console.log("what?");
        this.channel.postMessage({
          type: this.EVENT_TYPE_SAME_HOST_ALREADY_OPENED,
        });
      }
    });
  }

  /**
   * Check if a session/tab/same-host has been opened in current browser session
   * @return { Promise<boolean> } true if not opened, false otherwise
   */
  private checkIfNotFirstSession(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if session is already started
      const selfSessionInitialized = sessionStorage.getItem(
        this.SESSION_STORAGE_INITIALIZED
      );

      if (selfSessionInitialized) {
        resolve(true);
        return;
      }

      // Send a message to other tabs to check if same host is already opened
      console.log("what???????");
      this.channel.postMessage({ type: this.EVENT_TYPE_CHECK_SAME_HOST });

      // Listen for messages from other tabs
      this.channel.addEventListener("message", (event: MessageEvent) => {
        if (
          event.data.type === this.EVENT_TYPE_SAME_HOST_ALREADY_OPENED &&
          event.source !== window
        )
          resolve(true);
      });

      // If no response received, assume no other tabs are opened
      setTimeout(() => resolve(false), 100);
    });
  }

  /**
   * Set a cookie item
   * @param { string } key
   * @param { string } value
   * @return { void }
   */
  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * Get a cookie item
   * @param { string } key
   * @return { string | null } Returns value string if exists, null otherwise
   */
  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Remove a cookie item
   * @param { string } key
   * @return { void }
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

export default CookieManager;
