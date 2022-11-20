import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { STATUSES } from '../store/productSlice';
import {fetchProducts} from '../store/productSlice'
import ReactLoading from "react-loading";

const Products = () => {

    const dispatch = useDispatch();

    const { data: products, status } = useSelector((state) => state.product)

    useEffect(() => {


        dispatch(fetchProducts());


    }, [])



    const handleAdd = (product) => {

        dispatch(add(product))

    }

    if(status === STATUSES.LOADING){
        return <div>
        <ReactLoading
        type="spinningBubbles"
        color="#696906"
        height={100}
        width={100}
      />
        </div>
    }

    if(status === STATUSES.ERROR){
        return <h1 style={{color:"red"}}>ERROR!! occur While fething</h1>
    }
    return (
        <div className='productsWrapper'>
            {
                products.map((product) => (
                    <div className='card' key={product.id}>
                        <img src={product.image} alt='' />
                        <h4>{product.title}</h4>
                        <h4>{product.price}</h4>
                        <button onClick={() => handleAdd(product)} className='btn'>Add to cart</button>
                    </div>
                ))
            }

        </div>
    )
}

export default Products