import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IOrderHandler } from '../models/IOrderHandler';


export function Cart(props: IOrderHandler) {
    const defaultValidation: boolean = false;
    const [validation, setValidation] = useState(defaultValidation)

    useEffect(() => {
        if (validation && props.orders) {
            setValidation(false)
        }
    }, [props]);

    function addproduct() {
        if (validation) {
            return (<div>Add Product</div>)
        }
        else {
            return <div></div>
        }
    }
    return (
        <div id='cartContainer'>
            <h2>Cart</h2>
            <div id='cartList'>
                {props.orders.map(item => {
                    return (
                        <div key={item.id} className='cartListRow'>
                            <div className='cartAmountOfMoviesContainer'>
                                <button onClick={() => props.addOrderItem(item)}>+</button>
                                <div className='amountOfMovies'>{item.amount} st</div>
                                <button onClick={() => props.removeOrderItem(item)}>-</button>
                            </div>
                            <div className='cartMovieName'>{item.name}</div>
                            <div className='cartMoviePrice'>{item.price} kr</div>
                        </div>
                    );
                })}
            </div>
            <div id='cartTotal'>
                <div id='cartTotalPrice' >Total {props.totalPrice} kr</div>
                <div id='clearCartButton'>
                    <button onClick={props.clearOrderList}>Clear cart</button>
                </div>
            </div>
            <div id='checkOutBUtton'>
                <Link
                    to={'/ordercheckout'}
                    onClick={(e) => {
                        if (!props.orders.length) {
                            e.preventDefault();
                            setValidation(true)
                        }
                        else { props.masterKeyCheckOut(true) }
                    }}>
                    <button>Checka ut</button>
                </Link>
                {addproduct()}
            </div>
        </div >
    );
}