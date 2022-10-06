/**
 * Actions represent the type of change to a location value.
 */
 export enum Action {
    /**
     * A POP indicates a change to an arbitrary index in the history stack, such
     * as a back or forward navigation. It does not describe the direction of the
     * navigation, only that the current index changed.
     *
     * Note: This is the default action for newly created history objects.
     */
    Pop = "POP",

    /**
     * A PUSH indicates a new entry being added to the history stack, such as when
     * a link is clicked and a new page loads. When this happens, all subsequent
     * entries in the stack are lost.
     */
    Push = "PUSH",

    /**
     * A REPLACE indicates the entry at the current index in the history stack
     * being replaced by a new one.
     */
    Replace = "REPLACE",
}

/**
 * The pathname, search, and hash values of a URL.
 */
 export interface Path {
    /**
     * A URL pathname, beginning with a /.
     */
    pathname: string;
  
    /**
     * A URL search string, beginning with a ?.
     */
    search?: string;
  
    /**
     * A URL fragment identifier, beginning with a #.
     */
    hash?: string;
}

/**
 * A change to the current location.
 */
 export interface Update {
    /**
     * The action that triggered the change.
     */
    action: Action;
  
    /**
     * The new location.
     */
    location: Pick<Location, 'pathname' | 'state' | 'key'>;
}

/**
 * A function that receives notifications about location changes.
 */
 export interface Listener {
    (update: Update): void;
}

/**
 * An entry in a history stack. A location contains information about the
 * URL path, as well as possibly some arbitrary state and a key.
 */
 export interface Location extends Path {
    /**
     * A value of arbitrary data associated with this location.
     */
    state: any;
  
    /**
     * A unique string associated with this location. May be used to safely store
     * and retrieve data in some other storage API, like `localStorage`.
     *
     * Note: This value is always "default" on the initial location.
     */
    key: string;
}

export type To = string | Partial<Path>

/**
 * A history is an interface to the navigation stack. The history serves as the
 * source of truth for the current location, as well as provides a set of
 * methods that may be used to change it.
 *
 * It is similar to the DOM's `window.history` object, but with a smaller, more
 * focused API.
 */
 export interface History {
    /**
     * The current location. This value is mutable.
     */
    readonly location: Location;
  
    /**
     * Returns a valid href for the given `to` value that may be used as
     * the value of an <a href> attribute.
     *
     * @param to - The destination URL
     */
    createHref(to: To): string;
  
    /**
     * Navigates `n` entries backward/forward in the history stack relative to the
     * current index. For example, a "back" navigation would use go(-1).
     *
     * @param delta - The delta in the stack index
     */
    go(delta: number): void;

    /**
     * Pushes a new location onto the history stack, increasing its length by one.
     * If there were any entries in the stack after the current one, they are
     * lost.
     *
     * @param to - The new URL
     * @param state - Data to associate with the new location
     */
    push(to: To, state?: any): void;

    /**
     * Sets up a listener that will be called whenever the current location
     * changes.
     *
     * @param listener - A function that will be called when the location changes
     * @returns unlisten - A function that may be used to stop listening
     */
    listen(listener: Listener): () => void;
}

const PopStateEventType = 'popstate'


export const createBrowserHistory = (): History => ({
    location: {
        pathname: window.location.pathname,
        state: {},
        key: '',
    },
    createHref(to: To) {
        return typeof to === "string" ? to : createPath(to)
    },
    go(n) {
        return window.history.go(n)
    },
    push(to: To) {
        const url = this.createHref(to)
        // try...catch because iOS limits us to 100 pushState calls :/
        try {
            window.history.pushState(null, "", url)
        } catch (error) {
            // They are going to lose state here, but there is no real
            // way to warn them about it since the page will refresh...
            window.location.assign(url)
        }
    },
    listen(fn: Listener) {
        const handlePop = () => {
            fn({ action: Action.Pop, location: this.location })
        }
        window.addEventListener(PopStateEventType, handlePop)

        return () => {
        window.removeEventListener(PopStateEventType, handlePop)
        };
    },
})

/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */
 export function createPath({
    pathname = "/",
    search = "",
    hash = "",
}: Partial<Path>) {
    if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
    if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
    return pathname;
}
