import './App.css'

import { Route } from './router/react-router'

import Home from './pages/Home'
import About from './pages/About'

function App() {

  return (
    <>
      <Route path='/' component={<Home />} />
      <Route path='/about' component={<About />} />
    </>
  )
}

export default App
