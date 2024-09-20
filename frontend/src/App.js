
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import ItemDetails from './ItemComponent/Itemdetails';
import UpdateItem from './ItemComponent/UpdateItem';
import ManagerSignUp from './ManagerComponent/ManagerSignUp';
import ManagerSignin from './ManagerComponent/ManagerSignin';
import Product from './ItemComponent/product';
import DiliveryDetails from './ManagerComponent/managerdetails';
import ManagerUpdateItem from './ManagerComponent/UpdateMnaneger';
import Card from './ItemComponent/card sample'
import Home from './summa/Home';


function App() {
  return (
    <div className="App">
 <Router>

 <Routes>


 <Route path='/manager' element={<ManagerSignUp/>}></Route>
 <Route path='/card' element={<Card/>}></Route>


<Route path='/' element={<Product/>}></Route>
<Route path='/itemdetails' element={<ItemDetails/>}></Route>
<Route path='/itemupdate/:id' element={<UpdateItem/>}></Route>
<Route path='/managerDet' element={<DiliveryDetails/>}></Route>

<Route path="/ManUpdate:id" element={<ManagerUpdateItem/>}></Route>



   </Routes>
   </Router>
    </div>
  );
}

export default App;
