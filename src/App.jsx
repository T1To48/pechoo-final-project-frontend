import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayouts.jsx";
import "./App.css";

// import CounterReduxTest from './components/CounterReduxTest.jsx'
import { Register, Login, PublishOrder } from "./pages/exportsIndex.js";
import OrdersList from "./components/orders/OrdersList.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route index element={<CounterReduxTest/>} /> */}
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="new-order" element={<PublishOrder />} />
          <Route path="orders-list" element={<OrdersList />} />
          {/* <Route path="landing" element={<Landing />} />
            
             */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
