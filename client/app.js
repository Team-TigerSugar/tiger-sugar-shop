import React from 'react'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Components/theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {Navbar} from './components'
import Routes from './routes'

import Landing from './components/Landing'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes />
        <Switch>
          {/* <Route exact path="/" component={() => <div>landing</div>} /> */}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
