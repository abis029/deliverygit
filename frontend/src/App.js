import React, { useState } from "react";
import './summa/styles/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Manager Components
import ManagerSignUp from './ManagerComponent/ManagerSignUp';
import ManagerSignin from './ManagerComponent/ManagerSignin';
import DeliveryDetails from './ManagerComponent/managerdetails';
import ManagerUpdateItem from './ManagerComponent/UpdateMnaneger';

// Item Components
import Product from './ItemComponent/product';
import Card from './ItemComponent/card sample';

// Screens
import HomeScreen from './summa/screens/HomeScreen';
import ProductScreen from './summa/screens/ProductScreen';
import CartScreen from './summa/screens/CartScreen';
import DeliveryForm from './summa/screens/DeliveryForm';
import CheckoutScreen from './summa/screens/CheckoutScreen';  // New import

// Components
import Navbar from './summa/components/Navbar';
import Backdrop from "./summa/components/Backdrop";
import SideDrawer from "./summa/components/SideDrawer";


function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
     
     <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <Routes>
        {/* Home and Product Routes */}
        <Route path='/' element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/cart' element={<CartScreen />} />
        <Route path='/checkout' element={<CheckoutScreen />} />
        <Route path='/delivery' element={<DeliveryForm />} />

        {/* Manager Routes */}
        <Route path='/manager' element={<ManagerSignUp />} />
        <Route path='/manager/login' element={<ManagerSignin />} />
        <Route path='/manager/details' element={<DeliveryDetails />} />
        <Route path='/manager/update/:id' element={<ManagerUpdateItem />} />

        {/* Other Routes */}
        <Route path='/home' element={<Product />} />
        <Route path='/itemdetails' element={<Card />} />

        {/* 404 Route */}
        <Route path='*' element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
