import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { stripBasename } from './router'
import {
    NavigationContext,
    LocationContext,
} from './context'
import { Action, createBrowserHistory } from './history'

export interface RouterProps {
    children?: ReactNode;
}

const basename = '/'

const BrowserRouter = ({ children }: RouterProps): ReactElement | null => {
    const navigator = createBrowserHistory()

    const [path, setPath] = useState<string>(navigator.location.pathname)
    const goToPath = (path: string) => {
        setPath(path)
        navigator.push(path)
    }


    let location = useMemo(() => {
    let trailingPathname = stripBasename(path, basename)
        if (trailingPathname == null) {
            return { pathname: '/', state: null, key: 'default' }
        }
        return {
            pathname: trailingPathname,
            state: null,
            key: 'default',
            }
    }, [path])

    return (
        <NavigationContext.Provider
            value={{
                basename,
                navigator,
                goTo: goToPath,
            }}
        >
            <LocationContext.Provider
                value={{ location, navigationType: Action.Pop }}
            >
                {children}
            </LocationContext.Provider>
        </NavigationContext.Provider>
    )
}

export { BrowserRouter as Router }

interface RouteProps {
    path: string
    component: ReactElement
}
export const Route = ({ path, component }: RouteProps): ReactElement => {
    return (
        <LocationContext.Consumer>
            {({location}) => {
                if (location.pathname !== path) {
                    return <></>
                }
                return component
            }}
        </LocationContext.Consumer>
    )
}
