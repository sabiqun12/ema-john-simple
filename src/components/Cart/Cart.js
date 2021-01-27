import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    //console.log(cart);
    const total = cart.reduce((total, prodct) => total + prodct.price* prodct.quantity, 0);


    let shippingCost = 0;
    if (total > 0) {
        shippingCost = 12.35;
    }
    else if (total > 15) {
        shippingCost = 4.50;
    }

    const tax = total / 10;
    const grandTotal = total + shippingCost + tax;

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order summery</h4>
            <p>Item number:{cart.length}</p>
            <p>Price:{formatNumber(total)}</p>
            <p>Shipping Cost:{shippingCost}</p>
            <p><small>Tax + Vat:{formatNumber(tax)}</small></p>
            <p>Total price:{formatNumber(grandTotal)}</p>
            <br/>

            
        </div>
    );
};

export default Cart;