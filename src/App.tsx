import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Admin } from './components/Admin';
import { Cart } from './components/Cart';
import { Home } from './components/Home';
import { Products } from './components/Products';
import { NoMatch } from './components/NoMatch';
import { Category } from './components/Category';
import { IProduct, IProductDisplay } from './models/IProduct'
import { IAppState } from './models/IAppState';
import { OrderCheckOut } from './components/OrderCheckOut';


function App() {
  const defaultOrderState: IAppState = {
    orders: [],
    totalPrice: 0,
    checkOutKey: false
  }
  const [orderState, setOrderState] = useState(defaultOrderState)
  const dufaultProductDisplay: IProductDisplay = {
    products: [],
    searchValue: "",
    genre: 0
  };
  const [productDisplay, setProductDisplay] = useState(dufaultProductDisplay)


  function addOrderItem(item: IProduct) {
    let orders: IProduct[] = orderState.orders;
    let controller = orders.includes(item);
    if (controller === true) { item.amount += 1; }
    else {
      item.amount = 1;
      orders.push(item);
    }
    setOrderState({
      ...orderState,
      orders: orders,
      totalPrice: orderState.totalPrice + item.price,
    })
  }
  function removeOrderItem(item: IProduct) {
    let orders: IProduct[] = orderState.orders;
    item.amount -= 1;
    if (item.amount === 0) {
      let itemIndex: number = orders.indexOf(item)
      orders.splice(itemIndex, 1);
    }
    setOrderState({
      ...orderState,
      orders: orders,
      totalPrice: orderState.totalPrice - item.price
    })
  }
  function clearOrderList() {
    console.log("clear")
    setOrderState({
      ...orderState,
      orders: [],
      totalPrice: 0,
    })
  }
  function masterKeyCheckOut() {
    setOrderState({
      ...orderState,
      checkOutKey: true
    })
  }

  function searchHandler(products: IProduct[], searchValue: string, genre: number) {
    setProductDisplay({
      products: products,
      searchValue: searchValue,
      genre: genre
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
          <Category searchHandler={searchHandler}></Category>
        </div>
        <div className='container'>
          <Switch>
            <Route path='/admin'>
              <Admin></Admin>
            </Route>
            <Route path='/products'>
              <Products
                products={productDisplay.products}
                searchValue={productDisplay.searchValue}
                genre={productDisplay.genre}
                addOrderItem={addOrderItem}
              ></Products>
            </Route>
            <Route path='/ordercheckout'>
              <OrderCheckOut
                orders={orderState.orders}
                totalPrice={orderState.totalPrice}
                checkOutKey={orderState.checkOutKey}
                removeOrderItem={removeOrderItem}
                addOrderItem={addOrderItem}
                clearOrderList={clearOrderList}
                masterKeyCheckOut={masterKeyCheckOut}
              ></OrderCheckOut>
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
          <Cart
            orders={orderState.orders}
            totalPrice={orderState.totalPrice}
            checkOutKey={orderState.checkOutKey}
            removeOrderItem={removeOrderItem}
            addOrderItem={addOrderItem}
            clearOrderList={clearOrderList}
            masterKeyCheckOut={masterKeyCheckOut}
          ></Cart>
        </div>
      </div>
    </Router>
  );
}

export default App;
