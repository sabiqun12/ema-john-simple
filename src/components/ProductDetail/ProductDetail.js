import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const{productkey} = useParams();
     const product = fakeData.find(pd => pd.key === productkey);
     //console.log(product);
    return (
        <div>
            <h3>{productkey}</h3>
            <h2> Here your Product details </h2>
            <Product showAddToCart={false} product={product} ></Product>
        </div>
    );
};

export default ProductDetail;