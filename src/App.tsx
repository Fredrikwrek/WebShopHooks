import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Admin } from './components/Admin';
import { Cart } from './components/Cart';
import { Home } from './components/Home';
import { Products } from './components/Products';
import { NoMatch } from './components/NoMatch';
import { Category } from './components/Category';
import { IProduct } from './models/IProduct'
import { IAppState } from './models/IAppState';



function App() {
  let defaultOrderState: IAppState = { orders: [] }
  const [orderState, setOrderState] = useState(defaultOrderState)

  function orderHandler(event: IProduct) {
    let orders: IProduct[] = orderState.orders;
    let controller = orders.includes(event);
    if (controller === true) { event.amount += 1; }
    else {
      event.amount = 1;
      orders.push(event);
    }
    setOrderState({
      orders: orders
    })
  }

  return (
    <Router>
      <div className='grid-container'>
        <div className='head'>
          <h1>Hemsida</h1>
          <Link to='/admin'>adminkonto</Link>
          <nav>
            <Link to='/'><div>Home</div></Link>
            <Link to='/products'><div>Products</div></Link>
          </nav>
        </div>
        <div className='category'>
          <Category></Category>
        </div>
        <div className='container'>
          <Switch>
            <Route path='/admin'>
              <Admin></Admin>
            </Route>
            <Route path='/products'>
              <Products orderHandler={orderHandler}></Products>
            </Route>
            <Route path='/' exact>
              <Home></Home>
            </Route>
            <Route path='*'>
              <NoMatch />
            </Route>
          </Switch>
        </div>
        <div className='cart'>
          <Cart orders={orderState.orders}></Cart>
        </div>
      </div>
    </Router>
  );
}

export default App;
