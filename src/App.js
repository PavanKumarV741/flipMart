import './App.css';
import Home from './component/Home';
import Cart from './component/Cart';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useState } from 'react';
import Footer from './component/footer/Footer';
import Head from './component/Head';

function App() {

  const [cart,setCart] = useState([])

  const addToCart = (product)=>{
   var existing = cart.find(item => item.id === product.id)
   if(existing){
      const updated = cart.map(item => 
        item.id === product.id ? ({...product,quantity : item.quantity+1}) : item
      )
      setCart(updated)
   }
   else{
      setCart([...cart,{...product, quantity : 1}]);
      console.log(cart)
   }
  }

  const removeFromCart = (product) => {
    if(product.quantity > 1){
      const updated = cart.map(item => 
        item.id === product.id ? ({...product,quantity : item.quantity-1}) : item
      )
      setCart(updated)
    }
    else{
      const updatedCart = cart.filter(item => item.id != product.id)
      setCart(updatedCart)
    }
  }

  const increaseQuantity = (product) =>{
    const updated = cart.map(item => 
     item.id === product.id ? ({...product,quantity : item.quantity+1}) : item
    )
    setCart(updated)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home cart={cart} addToCart={addToCart}/>}/>
          <Route path='/cart' element={<Cart pCart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
