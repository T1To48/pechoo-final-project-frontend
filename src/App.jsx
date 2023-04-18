import { BrowserRouter, Routes, Route } from "react-router-dom";


import SharedLayout from "./components/SharedLayouts.jsx";
import { Register, Login, PublishOrder } from "./pages/exportsIndex.js";
import OrderCardsList from "./components/orders/OrderCardsList.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route index element={<CounterReduxTest/>} /> */}
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="new-order" element={<PublishOrder />} />
          <Route path="orders-list" element={<OrderCardsList />} />
          {/* <Route path="landing" element={<Landing />} />
            
             */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
