import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from "./App/store.js"
import { Provider } from 'react-redux'
import { ThemeProvider,createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
const theme = createTheme({
  palette: {
    primary: {
      main: "#CD6D0C",
      dark: "#000000",
      black:"#000000",
    },
    secondary:{
      main:"#000000",
      dark: "#ffffff",
      buttonText:"#B2DB5B"
    },
    background: {
      main: '#CD6D0C',
    },
  },
  typography:{
    fontFamily:"sans-serif",
  },
});
theme.palette.background.main
document.querySelector('body').style.backgroundColor=theme.palette.background.main

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
