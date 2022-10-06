import { NavigationContext, Navigator } from '../router/context'

const Home = () => {
    return (
        <div>
            <h1>root</h1>
            <NavigationContext.Consumer>
                {({goTo}) => {
                    return <button onClick={() => goTo('/about')}>about</button>
                }}
            </NavigationContext.Consumer>
        </div>
    )
}

export default Home
