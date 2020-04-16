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
                ProductId: item.id,
                OrderId: item.id,
                Amount: item.amount
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
                <div>
                    <h2>Summa att betala {order.totalPrice}</h2>
                    <form onSubmit={(e) => {
                        postOrder(e);
                        setDone(true);
                        props.clearOrderList();
                    }
                    }>
                        <div>
                            <label htmlFor="paymentMethod">Payment method </label>
                            <select name="paymentMethod" onChange={e => {
                                setOrder({ ...order, paymentMethod: e.target.value })
                            }}>
                                <option value="MasterCard">MasterCard</option>
                                <option value="Visa">Visa</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="createdBy">Email </label>
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
        else { return (<h2>Tack för ditt köp</h2>) }
    }

    return (<React.Fragment>
        {checkOutDisplay()}
    </React.Fragment>
    )
}