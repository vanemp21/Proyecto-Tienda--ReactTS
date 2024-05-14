import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar,CartItem } from "../types";
const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
    {
      /* NOTA ==> Si en el localstorage hay cosas guardadas en el cart va a inicializar con lo que hay en el storage, si no con []*/
    }
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  {
    /* NOTA ==> una vez que el cart se actualice ejecuta el localstorage setitem */
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  function addToCart(item:Guitar) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      {
        /* NOTA ==> Para no modificar el estado y solo actualizarlo (mutar/inmutar) se hace una copia y se agrega la copia con el set */
      }
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      const newItem:CartItem = {...item, quantity:1}
 
      setCart([...cart, newItem]);
    }
  }
  function removeFromCart(id:Guitar['id']) {
    {
      /* NOTA ==> Muestrame y setea todas las guitarras donde el filtro sea guitar id distinto a la id que me das
      para así eliminar las guitarras que no quiero */
    }
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id != id));
  }
  function increaseQuantity(id:Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id:Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }
  function clearCart() {
    setCart([]);
  }

  {
    /* NOTA ==> No hagas render completo de mi aplicacion hasta que no cambie el cart (eso para el usememo) */
  }
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  //el isempty se va a ejecutar solo cuando el carrito ha sido modificado, añadido elementos y tal
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );
  {
    /* NOTA ==> El .reduce pilla todos los numeros del array, devuelve lo que la función le diga 
reduce los valores a un solo elemento y empieza en 0*/
  }
  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
export default useCart;
