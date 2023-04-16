import {BrowserRouter,Routes,Route} from "react-router-dom";
import SharedLayout from "./components/SharedLayouts.jsx";
import './App.css'


// import CounterReduxTest from './components/CounterReduxTest.jsx'
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
 
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={< SharedLayout/>}>
      {/* <Route index element={<CounterReduxTest/>} /> */}
      <Route index element={<Register/>} />
      <Route path="login" element={<Login />} />
      {/* <Route path="landing" element={<Landing />} />
            <Route path="signup" element={<Signup />} />
             */}
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
