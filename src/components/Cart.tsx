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
        <div>
            <h3>Cart</h3>
            {props.orders.map(item => {
                return (
                    <div key={item.id}>
                        <div>{item.price} kr {item.name} {item.amount} st</div>
                        <button onClick={() => props.removeOrderItem(item)}>X</button>
                        <button onClick={() => props.addOrderItem(item)}>O</button>
                    </div>
                );
            })}
            <div>total {props.totalPrice} kr</div>
            <button onClick={props.clearOrderList}>Clear cart</button>
            <Link
                to={'/ordercheckout'}
                onClick={(e) => {
                    if (!props.orders.length) { e.preventDefault(); setValidation(true) } else { props.masterKeyCheckOut(true) }
                }}
            >
                <button>Checka ut</button>
            </Link>
            {addproduct()}
        </div >
    );
}