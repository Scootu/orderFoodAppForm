import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cartcontext";
const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [isBtnHightlighted, setIsBtnHightlighted] = useState(false);
  const { items } = ctx;

  const CartVal = items.reduce((accVal, curVal) => {
    return accVal + curVal.amount;
  }, 0);

  const btnCssStyle = `${classes.button} ${
    isBtnHightlighted ? classes.bump : " "
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBtnHightlighted(true);
    const timer = setTimeout(() => {
      setIsBtnHightlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnCssStyle} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{CartVal}</span>
    </button>
  );
};

export default HeaderCartButton;
