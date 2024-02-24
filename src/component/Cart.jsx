import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';

function Cart({ pCart,removeFromCart,increaseQuantity}) {
    // console.log(pCart)

    const navigate = useNavigate();

    const handleContinue = () =>{
        navigate('/')
    }

    var totalPrice = pCart.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.quantity * currentItem.price);
    }, 0);  
    
    totalPrice = totalPrice.toFixed(2)
    
    const buynow = () =>{
        alert(`Congratulations! your order as placed successfully 
        Amount has to be paid at delivery time: ${totalPrice} Rs`);
    }

    const products = pCart.map(product => (
        <div className='cartproduct' key={product.id}>
            <div className='cartimage'>
                <div className='price-rating'>
                    <span> <img className='star' src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/star-48.png" alt="star" /> {product.rating.rate}</span>
                    
                    <span>
                        <Badge> 
                            <img className='removeFromCart' src="https://cdn0.iconfinder.com/data/icons/friendly-e-commerce-and-shopping/100/Remove_from_Cart-512.png" alt="removeFromCart" onClick={()=>removeFromCart(product)} />
                            {product.quantity}
                            <img className='removeFromCart' src="https://cdn0.iconfinder.com/data/icons/friendly-e-commerce-and-shopping/100/Add_to_Cart-64.png" alt="increaseQuantity" onClick={()=>increaseQuantity(product)} /> 
                        </Badge> 
                    </span>
                    <span><img className='inr' src="https://cdn3.iconfinder.com/data/icons/indian-rupee-symbol/128/Indian_Rupee_symbol.png" alt="ruppees" />{product.price}</span>
                </div>
                <img src={product.image} alt="product"/>
            </div>
            <div>
                <h6>{product.title}</h6>    
            </div>
        </div>
    ));

    return (
        <div>
            <h5>Cart</h5>
            <hr />
            {pCart && pCart.length !== 0 ? (
                <>
                    <div className='products'>
                        {products}
                    </div>
                    <div className='buyprice'>
                        <div>
                        Total Price : <img className='inr' src="https://cdn3.iconfinder.com/data/icons/indian-rupee-symbol/128/Indian_Rupee_symbol.png" alt="ruppees" />{totalPrice}
                        </div>
                        <div>
                            <Button variant="success" onClick={buynow}>Buy Now</Button>
                        </div>
                    </div>
                </>
            ) : (
                
                <div>
                    <img width={200} height={200} src="https://cdn3.iconfinder.com/data/icons/buno-black-friday-discount/32/cart_shopping_discount_offer-512.png" alt="emptycart" />
                    <h6>Your Cart is Empty</h6>
                    <p>Add something to make me Happy (:</p>
                    <input className="btn btn-primary" onClick={handleContinue} type="button" value="Continue Shopping" />
                </div>
            )}
        </div>
    );
}

export default Cart;
