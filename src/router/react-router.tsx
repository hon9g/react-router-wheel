import { ReactElement, ReactNode } from "react"
import { Action as NavigationType, Location } from './router'
import { Navigator } from "./context";

export interface RouterProps {
    basename?: string;
    children?: ReactNode;
    location: Partial<Location> | string;
    navigationType?: NavigationType;
    navigator: Navigator;
    static?: boolean;
}
export const Router = ({
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = NavigationType.Pop,
    navigator,
    static: staticProp = false,
  }: RouterProps): ReactElement | null => {
    return null
  }

interface RouteProps {
    path: string
    component: ReactElement
}
export const Route = ({ path, component }: RouteProps): ReactElement => {
    return <></>
}
