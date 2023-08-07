import { useReducer } from "react";
import CartContext from "./cartcontext";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    const updateTotalAmount = state.totalAmount + action.item.price;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    const updateTotalAmount = state.totalAmount - existingCartItem.price; // because there no cas when the existingCartItem === undefinde
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCart;
  }
};

const CartProvider = (props) => {
  const [CartState, dispatchCart] = useReducer(cartReducer, defaultCart);

  const addItemHandler = (item) => {
    //  cartDataContext.item.push(item);
    //  console.log(cartDataContext.item);
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };
  const clearItemHandler = () =>{
    dispatchCart({type:'CLEAR'});
  }

  const cartDataContext = {
    items: CartState.items,
    totalAmount: CartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItem :clearItemHandler
  };

  return (
    <CartContext.Provider value={cartDataContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
