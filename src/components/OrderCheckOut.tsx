import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { IPostOrder, IOrderRows, IOrderHandler } from '../models/IOrderHandler';
import { NoMatch } from './NoMatch';


//4046

export function OrderCheckOut(props: IOrderHandler) {
    const defaultOrder: IPostOrder = {
        companyId: 91829182,
        created: "",
        createdBy: "",
        paymentMethod: "MasterCard",
        totalPrice: 0,
        status: 0,
        orderRows: []
    }
    const [order, setOrder] = useState(defaultOrder);
    const [done, setDone] = useState(false)



    useEffect(() => {
        let orderRows: IOrderRows[] = props.orders.map(item => {
            return {
                productId: item.id,
                orderId: item.id,
                amount: item.amount
            }
        })
        setOrder({ ...order, orderRows: orderRows, totalPrice: props.totalPrice })
    }, [props])

    function postOrder(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(order)
        axios
            .post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', JSON.stringify(order), { headers: { 'Content-Type': 'application/json' } })
            .then(result => {
                console.log(result)
            });
    }
    function checkOutDisplay() {
        if (!done && props.checkOutKey) {
            return (
                <div id='checkOutForm'>
                    <h2>Summa att betala {order.totalPrice} kr</h2>
                    <form onSubmit={(e) => {
                        postOrder(e);
                        setDone(true);
                        setOrder({
                            ...order,
                            created: "",
                            createdBy: "",
                            paymentMethod: "MasterCard",
                            status: 0
                        })
                        props.clearOrderList();
                    }
                    }>
                        <div>
                            <div >Payment method </div>
                            <select name="paymentMethod" onChange={e => {
                                setOrder({ ...order, paymentMethod: e.target.value })
                            }}>
                                <option value="MasterCard">MasterCard</option>
                                <option value="Visa">Visa</option>
                            </select>
                        </div>
                        <div>
                            <div>Email </div>
                            <input type="email" required name="createdBy" value={order.createdBy} onChange={e => setOrder({ ...order, createdBy: e.target.value })} />
                        </div>
                        <button type="submit" onClick={() => {
                            setOrder({ ...order, created: new Date().toDateString() })
                        }}>Betala</button>

                    </form>
                </div>
            );
        }
        else if (!done && !props.checkOutKey) {
            return (<NoMatch />)
        }
        else {
            return (<div id='checkOutForm'>
                <h2>Tack för ditt köp!</h2>
            </div>)
        }
    }

    return (
        <React.Fragment>
            {checkOutDisplay()}
        </React.Fragment>
    )
}