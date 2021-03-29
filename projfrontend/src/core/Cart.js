import React, { useState, useEffect } from "react";
import "../styles.css";
//import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import {loadCart} from './helper/cartHelper'
import Paymentb from './Paymentb'


const Cart = () => {

 const [products, setProducts] = useState([])
 const [reload, setReload] = useState(false)


 useEffect(() => {
  setProducts(loadCart())
    }, [reload])




 const loadAllProducts = products =>{
     return(
         <div>
         <h2> Section to load all Products</h2>   
         {products.map((product, index)=>(
             <Card 
             key={index}
             product={product}
             addtoCart= {false}
             removeFromCart = {true}
             setReload={setReload}
             reload ={reload}
             />
             )
         )} 

         </div>
     )
 }


const loadCheckout = () =>{
    return(
        <div>
        
            <h2>Checkout Section</h2>
           
        </div>  
    )
}



  return (
    <Base title="Cart Page" description="Checkout? are you ready? ">
      <div className="row text-center">
    
      <div className='col-4'>{products.length> 0 ? loadAllProducts(products): (<h3>No Products</h3>)}</div>
      <div className='col-8'><Paymentb  products={products} setReload={setReload} /></div>
  
      </div>
    </Base>
  );
}


export default Cart;