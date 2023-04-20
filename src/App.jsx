import { BrowserRouter, Routes, Route } from "react-router-dom";


import SharedLayout from "./components/SharedLayouts.jsx";
import { Register, Login, PublishOrder,OrdersList } from "./pages/exportsIndex.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route index element={<CounterReduxTest/>} /> */}
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="published-orders" element={<OrdersList />} />

          <Route path="new-order" element={<PublishOrder />} />
          {/* <Route path="orders-list" element={<OrderCardsList />} /> */}
          {/* <Route path="landing" element={<Landing />} />
            
             */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
