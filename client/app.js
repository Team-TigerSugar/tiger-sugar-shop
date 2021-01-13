import React from 'react'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Components/theme'
import {BrowserRouter, Switch} from 'react-router-dom'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
