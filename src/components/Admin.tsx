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
        <React.Fragment>
            <div>Admin</div>
            {orders.map(item => {
                return (
                    <div key={item.id}>
                        <div>{item.createdBy} {item.totalPrice}</div>
                        <button onClick={() => {
                            deleteOrder(item.id);
                        }}>X</button>
                    </div>
                )
            })}
        </React.Fragment>
    );
}