import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cartcontext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [issubmit, setIsSubmit] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [didSubmit, setDisSubmit] = useState(false);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const removeHandler = (id) => {
    ctx.removeItem(id);
  };
  const addHandler = (item) => {
    ctx.addItem(item);
  };
  const onOrderFun = () => {
    setIsCheckOut(true);
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={removeHandler.bind(null, item.id)}
            onAdd={addHandler.bind(null, item)}
          />
        );
      })}{" "}
    </ul>
  );

  const btnBarItems = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} onClick={onOrderFun}>
        Order
      </button>
    </div>
  );

  const submitingOrderHandler = async (data) => {
    setIsSubmit(true);
    try {
      const responce = await fetch(
        "https://react-http-5605a-default-rtdb.firebaseio.com/Meals.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            order: items,
            userInfo: data,
          }),
        }
      );
      if (!responce.ok) {
        throw new Error("somthing was rong!");
      }
    } catch (err) {
      setIsSubmitError(err.message || "somthing was rong !");
      setIsSubmit(false);
    }
    setIsSubmit(false);
    setDisSubmit(true);
    ctx.clearItem();
  };
  let content = (
    <Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onSubmit={submitingOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && btnBarItems}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!issubmit && !didSubmit && content}
      {issubmit && isSubmittingModalContent}
      {didSubmit && !isSubmitError && didSubmitModalContent}
      {isSubmitError && <p>{isSubmitError}</p> }
    </Modal>
  );
};

export default Cart;
