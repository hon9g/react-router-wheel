import {
    ReactElement,
    ReactNode,
    useMemo,
} from "react"

import {
    Action as NavigationType,
    Location,
    stripBasename,
} from './router'
import {
    Navigator,
    NavigationContext,
    LocationContext,
} from "./context";

export interface RouterProps {
    basename?: string;
    children?: ReactNode;
    location: Partial<Location> | string;
    navigationType?: NavigationType;
    navigator: Navigator;
    static?: boolean;
}

function Router ({
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = NavigationType.Pop,
    navigator,
    static: staticProp = false,
  }: RouterProps): ReactElement | null {
    // Preserve trailing slashes on basename, so we can let the user control
    // the enforcement of trailing slashes throughout the app
    let basename = basenameProp.replace(/^\/*/, "/");
    let navigationContext = useMemo(
        () => ({ basename, navigator, static: staticProp }),
        [basename, navigator, staticProp]
    );

    if (typeof locationProp === "string") {
        locationProp = { pathname: locationProp }
    }

    let {
        pathname = "/",
        search = "",
        hash = "",
        state = null,
        key = "default",
    } = locationProp;

    let location = useMemo(() => {
        let trailingPathname = stripBasename(pathname, basename);

        if (trailingPathname == null) {
        return null;
        }

        return {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
        };
    }, [basename, pathname, search, hash, state, key]);

    if (location == null) {
        console.warn(
            `<Router basename="${basename}"> is not able to match the URL ` +
            `"${pathname}${search}${hash}" because it does not start with the ` +
            `basename, so the <Router> won't render anything.`
        )
        return null;
    }

    return (
        <NavigationContext.Provider value={navigationContext}>
        <LocationContext.Provider
            children={children}
            value={{ location, navigationType }}
        />
        </NavigationContext.Provider>
    )
}

interface BrowserRouterProps {
    children: ReactNode
}

export function createBrowserRouter({ children }: BrowserRouterProps): ReactElement {
    return <>{ children }</>
}

interface RouteProps {
    path: string
    component: ReactElement
}
export const Route = ({ path, component }: RouteProps): ReactElement => {
    if (path !== location.pathname) {
        return <></>
    }
    return component
}
