import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
import CartContext from "../../../store/cartcontext";
import { useContext } from "react";
const MealsItem = (props) => {
  const priceitem = `$${props.price.toFixed(2)}`;
  const ctx = useContext(CartContext);
  const addAmountItem = (amount) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{priceitem}</p>
      </div>
      <div>
        <MealsItemForm onAddAmount={addAmountItem} />
      </div>
    </li>
  );
};

export default MealsItem;
