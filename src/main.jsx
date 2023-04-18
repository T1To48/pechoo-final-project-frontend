import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from "./App/store.js"
import { Provider } from 'react-redux'
import { ThemeProvider,createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
const theme = createTheme({
  palette: {
    buttons: {
      main: "#CD6D0C",
      dark: "#000000"
    },
    background: {
      main: '#11cb5f',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
    <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
