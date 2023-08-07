import classes from "./AvailableMeals.module.css";
import MealsItem from "./MealsItem/MealsItem";
import Card from "../UI/Card";
import useRequeste from "../../hooks/use-requeste";
import { useEffect, useState } from "react";
// import axios from "axios";
// add data to server
// useEffect(() => {
//   axios
//     .post(requesteConfig.url, {
//       id: "m4",
//       name: "Green Bowl",
//       description: "Healthy...and green...",
//       price: 18.99,
//     })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err.message));
// }, []);

const requesteConfig = {
  url: "https://react-http-5605a-default-rtdb.firebaseio.com/Meals.json",
};
const AvailableMeals = () => {
  const { isLoading, error, fetchRequeste } = useRequeste();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const applyFun = (data) => {
      let loadingData = [];
      for (const key in data) {
        loadingData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadingData);
    };
    fetchRequeste(requesteConfig, applyFun);
  }, [fetchRequeste]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  let mealsItems = meals.map((elem) => {
    return (
      <MealsItem
        key={elem.id}
        id={elem.id}
        name={elem.name}
        description={elem.description}
        price={elem.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>{error ? <p>{error}</p> : <ul>{mealsItems}</ul>}</Card>
    </section>
  );
};
export default AvailableMeals;
