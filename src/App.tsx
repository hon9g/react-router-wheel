import './App.css'

import { Route, Router } from './router/react-router'

import Home from './pages/Home'
import About from './pages/About'

function App() {

  return (
    <Router>
      <Route path='/' component={<Home />} />
      <Route path='/about' component={<About />} />
    </Router>
  )
}

export default App
