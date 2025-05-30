import React from 'react';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Admin from './screens/Admin.js';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import AdminLogin from './screens/AdminLogin.jsx';
import AdminRouteGuard from './components/AdminRouteGuard.jsx'; // Import the AdminRouteGuard component
import PopupCard from './components/PopupCard.jsx';
import AllOrder from './screens/AllOrders.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/p" element={<PopupCard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            {/* Use AdminRouteGuard to protect the /admin route */}
            <Route path="/admin" element={<AdminRouteGuard element={<Admin />} />} />
            <Route exact path="/adminlogin" element={<AdminLogin />} />
            <Route path="/all" element={<AdminRouteGuard element={<AllOrder />} />} />
            {/* <Route exact path="/all" element={<AllOrder />} /> */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
