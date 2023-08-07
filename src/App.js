import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
function App() {
  const [isCartShow, setIsCartShow] = useState(false);

  const showHandler = () => {
    setIsCartShow(true);
  };
  const hideCartHandler = () => {
    setIsCartShow(false);
  };
  return (
    <CartProvider>
      {isCartShow && <Cart onClose={hideCartHandler} />}
      <Header onClickShowHandler={showHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
