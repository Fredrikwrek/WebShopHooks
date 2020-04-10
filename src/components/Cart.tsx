import React from 'react';
import { IAppState } from '../models/IAppState';


export function Cart(props: IAppState) {
    return (
        <div>
            <h3>Cart</h3>
            {props.orders.map(item => {
                return (
                    <div key={item.id}>{item.name + item.amount}</div>
                );
            })}
        </div>
    );
}