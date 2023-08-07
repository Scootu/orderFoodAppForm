import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealsItemForm.module.css";

const MealsItemForm = (props) => {
  const itemRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const amountInput = itemRef.current.value;
    const entredAmountData = +amountInput;

    if (
      amountInput.trim().length === 0 ||
      entredAmountData < 1 ||
      entredAmountData > 5
    ) {
      setIsAmountValid(false);
      return ; 
    }
      props.onAddAmount(entredAmountData);
  };
  return (
    <form className={classes.form} onClick={submitHandler}>
      <Input
        ref={itemRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please entre a valid value </p>}
    </form>
  );
};
export default MealsItemForm;
