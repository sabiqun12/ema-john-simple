import React, { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';



const Shop = () => {
    //console.log(fakeData);
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
            //console.log(existingKey, savedCart[existingKey]);

        })
        setCart(previousCart);
        //console.log(savedCart);

    }, [])

    const handleAddProduct = (product) => {
        // console.log('product added', product);
        const toBeAddedKey = product.key;
        let count = 1;
        let newCart;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];

        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }


    return (
        <div className="twin-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(pro => <Product
                            key={pro.key}
                            showAddToCart={true}
                            handleAddProduct={handleAddProduct}
                            product={pro}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                <Link to="/review">
                    <button className="main-button">Review</button>
                </Link>
            </div>
        </div>

    );
};

export default Shop;