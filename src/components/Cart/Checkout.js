import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isThenFiveChars = (value) => {
  return value.trim().length === 5;
};
const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postlCodeRef = useRef();
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const confirmHandler = (event) => {
    event.preventDefault();

    const entredName = nameInputRef.current.value;
    const entredStreet = streetInputRef.current.value;
    const entredCity = cityInputRef.current.value;
    const postalCode = postlCodeRef.current.value;

    const entredNameIsValid = !isEmpty(entredName);
    const entredStreetIsValid = !isEmpty(entredStreet);
    const entredCityIsValid = !isEmpty(entredCity);
    const postalCodeIsValid = isThenFiveChars(postalCode);

    setFormInputIsValid({
      name: entredNameIsValid,
      street: entredStreetIsValid,
      city: entredCityIsValid,
      postalCode: postalCodeIsValid,
    });

    let formIsValid =
      entredNameIsValid &&
      entredStreetIsValid &&
      entredCityIsValid &&
      postalCodeIsValid;

    if (!formIsValid) {
      // show error
      return;
    }
    //submite
    props.onSubmit({
      name: entredName,
      street: entredStreet,
      city: entredCity,
      postalCode: postalCode,
    });
  };
  const nameClassInputValid = formInputIsValid.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const streetClassInputValid = formInputIsValid.street
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const cityClassInputValid = formInputIsValid.city
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const postalCodeClassInputValid = formInputIsValid.postalCode
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClassInputValid}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputIsValid.name && <p>Please entre a valide name</p>}
      </div>
      <div className={streetClassInputValid}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputIsValid.street && <p>Please entre a valide street</p>}
      </div>
      <div className={postalCodeClassInputValid}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postlCodeRef} type="text" id="postal" />
        {!formInputIsValid.postalCode && (
          <p>Please entre a valide postal code</p>
        )}
      </div>
      <div className={cityClassInputValid}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputIsValid.city && <p>Please entre a valide city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
