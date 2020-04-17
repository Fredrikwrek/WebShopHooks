import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { IGetOrder } from '../models/IOrderHandler';



export function Admin() {
    const defaultOrders: IGetOrder[] = [];
    const [orders, setOrders] = useState(defaultOrders)
    const [toggle, setToggle] = useState(true)
    useEffect(() => { setToggle(false) }, [])
    useEffect(() => {
        axios
            .get('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?=91829182')
            .then(r => {
                setOrders(r.data)
            })
    }, [toggle])
    function deleteOrder(urlId: number) {
        axios
            .delete(`https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${urlId}`)
            .then(r => {
                updateToggle(toggle);
            })
    }
    function updateToggle(toggle: boolean) {
        if (toggle) setToggle(false);
        else setToggle(true);
    }
    return (
        <div id='adminContainer'>
            <h2>Active orders</h2>
            <div id='ordersListHeaders'>
                <div>Order id</div>
                <div>Created</div>
                <div>Created by</div>
                <div>Amount of products</div>
                <div>Total price</div>
            </div>
            {orders.map(item => {
                console.log(item)
                return (
                    <div key={item.id} id='ordersListRow'>
                        <div>{item.id}</div>
                        <div>{item.created}</div>
                        <div>{item.createdBy}</div>
                        <div>{item.orderRows.map(row => {
                            return row.amount;
                        }).reduce((a, b) => { return a + b })}</div>
                        <div>{item.totalPrice} kr</div>
                        <button onClick={() => {
                            deleteOrder(item.id);
                        }}>X</button>
                    </div>
                )
            })}
        </div>
    );
}