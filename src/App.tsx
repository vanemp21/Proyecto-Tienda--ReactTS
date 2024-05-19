import Header from "./components/Header";
import Guitar from "./components/Guitar";
import useCart from "./hooks/useCart";
function App() {
  const  {data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal} = useCart()
 

  return (
    <>
      {/* NOTA ==> Envía el cart al header y allí lo obtiene mediante argumento/prop, debe tener el mismo nombre de prop en ambos lados
    si se llama cart= aqui en el otro lado debe llamarse cart tambien */}
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center pintalabios-h2">Pintalabios Mayballine New York</h2>

        <div className="row mt-5">
          {/* NOTA ==> El data es el json llamado guitar, itera cada uno y lo asigna en un prop llamado guitar que después ese prop lo recibe en su componente */}
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
          Maybelline New York - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
