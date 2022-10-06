import { Action as HistoryAction, Location } from "./history";
/**
 * A Router instance manages all navigation and data loading/mutations
 */
 export interface Router {
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Return the basename for the router
     */
    get basename(): RouterInit["basename"];
  
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Return the current state of the router
     */
    get state(): RouterState;
  
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Return the routes for this router instance
     */
    get routes(): AgnosticDataRouteObject[];
  
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Initialize the router, including adding history listeners and kicking off
     * initial data fetches.  Returns a function to cleanup listeners and abort
     * any in-progress loads
     */
    initialize(): Router;
  
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Subscribe to router.state updates
     *
     * @param fn function to call with the new state
     */
    subscribe(fn: RouterSubscriber): () => void;
  
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Enable scroll restoration behavior in the router
     *
     * @param savedScrollPositions Object that will manage positions, in case
     *                             it's being restored from sessionStorage
     * @param getScrollPosition    Function to get the active Y scroll position
     * @param getKey               Function to get the key to use for restoration
     */
  
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Navigate forward/backward in the history stack
     * @param to Delta to move in the history stack
     */
    navigate(to: number): void;
  
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Utility function to create an href for the given location
     * @param location
     */
    createHref(location: Location | URL): string;
  
    /**
     * @internal
     * PRIVATE - DO NOT USE
     *
     * Cleanup listeners and abort any in-progress loads
     */
    dispose(): void;
}

/**
 * Initialization options for createRouter
 */
 export interface RouterInit {
    basename?: string;
    routes: AgnosticRouteObject[];
    history: History;
}

/**
 * State maintained internally by the router.  During a navigation, all states
 * reflect the the "old" location unless otherwise noted.
 */
 export interface RouterState {
    /**
     * The action of the most recent navigation
     */
    historyAction: HistoryAction;
  
    /**
     * The current location reflected by the router
     */
    location: Location;
  
    /**
     * The current set of route matches
     */
    matches: AgnosticDataRouteMatch[];
  
    /**
     * Tracks whether we've completed our initial data load
     */
    initialized: boolean;
}

/**
 * Subscriber function signature for changes to router state
 */
 export interface RouterSubscriber {
    (state: RouterState): void;
}

/**
 * A route object represents a logical route, with (optionally) its child
 * routes organized in a tree-like structure.
 */
 export interface AgnosticRouteObject {
    children?: AgnosticRouteObject[];
    index?: boolean;
    path?: string;
    id?: string;
  }

  /**
 * A data route object, which is just a RouteObject with a required unique ID
 */
export interface AgnosticDataRouteObject extends AgnosticRouteObject {
    children?: AgnosticDataRouteObject[];
    id: string;
} 

  export interface AgnosticDataRouteMatch
  extends AgnosticRouteMatch<string, AgnosticDataRouteObject> {}

  /**
 * A RouteMatch contains info about how a route matched a URL.
 */
export interface AgnosticRouteMatch<
ParamKey extends string = string,
RouteObjectType extends AgnosticRouteObject = AgnosticRouteObject
> {
/**
 * The names and values of dynamic parameters in the URL.
 */
params: Params<ParamKey>;
/**
 * The portion of the URL pathname that was matched.
 */
pathname: string;
/**
 * The portion of the URL pathname that was matched before child routes.
 */
pathnameBase: string;
/**
 * The route object that was used to match.
 */
route: RouteObjectType;
}

/**
 * The parameters that were parsed from the URL path.
 */
 export type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
}

export type Action = HistoryAction

export type Location = Location
