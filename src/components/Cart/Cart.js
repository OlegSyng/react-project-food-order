import React, { useContext, useState } from "react";
import useHttp from "../../hooks/use-http";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const { isLoading, error, sendRequest: sendUserOrder } = useHttp();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const spinner = (
    <div className={classes["lds-roller"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const isSubmittedHandler = (responseData) => {
    if (responseData) {
      setIsSubmitted(true);
    }
  }

  const submitOrderHandler = (userData) => {
    sendUserOrder({
      url: 'https://react-food-order-991cc-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      method: 'POST',
      body: {
        user: userData,
        orderedItems: cartCtx.items
      }
    }, isSubmittedHandler);

    cartCtx.clearCart();
    
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const didSubmittedModalContent = <div>
      <h3>Successfully sent the order!</h3>
      <p>You will be notified once your order will be sent to you.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
    </div>
    </div>;

  const cartModalContent = <React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions}
  </React.Fragment>;

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !isSubmitted && cartModalContent}
      {isLoading && spinner}
      {!isLoading && isSubmitted && didSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
