import { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onClickShowHandler}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="food table " />
      </div>
    </Fragment>
  );
};
export default Header;
