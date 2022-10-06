import { createContext } from 'react'
import { History, To } from './history'
import { Action as NavigationType, Location } from './router'

/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level <Router> API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */
 export interface Navigator {
    createHref: History["createHref"];
    go: History["go"];
    push(to: To, state?: any): void;
}
interface NavigationContextObject {
    basename: string;
    navigator: Navigator;
    goTo: (path: string) => void
}
  
export const NavigationContext = createContext<NavigationContextObject>(
    null!
)

interface LocationContextObject {
    location: Location;
    navigationType: NavigationType;
}

  export const LocationContext = createContext<LocationContextObject>(
    null!
);
