import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

function Item(item) {
  //console.log(item.item.price);
    const dispatch = useDispatch();
  const addToCartHandler = () => {
    
    dispatch({type:'addToCart', payload: {...item, quantity:1}})
  }

  return (
    <div className="item">
      <h4 className="name">{item.item.name}</h4>
      <img src={item.item.image} alt="" height="100" width="100" />
      <h4 className="price"><b>Price: $ </b>{item.item.price}</h4>
      <div className="d-flex justify-content-end">
        <Button onClick={addToCartHandler}>Add To Cart</Button>
      </div>
    </div>
  );
}

export default Item;
