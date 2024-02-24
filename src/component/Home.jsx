import axios from 'axios'
import React, { useEffect, useState ,CSSProperties} from 'react'
import { BounceLoader } from 'react-spinners';
import Head from './Head';
import { useNavigate } from 'react-router';

function Home({addToCart,cart,searchedProduct}) {
    const navigate = useNavigate()

    const [products,setProducts] = useState([])

    const[searchedP,setSearchedP] = useState("")

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "blue",
        color:"red",
        position : 'relative',
        top : '25vh'
      };

    const apiProducts = async () => {
        try{
            const res = await axios.get("https://fakestoreapi.com/products")
            console.log(res.data)
            setProducts(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleAddToCart = (product) => {
       const foundInCart =  cart.find(item => item.id ===  product.id)
        if(foundInCart){
            // console.log("present:"+product.id)
            navigate('/cart'); // Navigate to cart page
        }
        else{
            addToCart(product); // Add product to cart
            // navigate('/cart'); // Navigate to cart page
        }
    };

    const search = (product) =>{
        setSearchedP(product)
    }

    useEffect(()=>{
        setTimeout(apiProducts,4000)
    },[])

  return (
    <div>
        <Head cart={cart} search={search}/>
        <hr/>
        {
        products.length == 0 ? <div>
                                    <BounceLoader
                                            cssOverride={override}
                                            color='blue'
                                            size={150}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                </div> 
        :
        <div className='products'>
            {
                products.filter((product)=>{
                    return(
                        searchedP.toLowerCase() == "" ? product : product.title.toLowerCase().includes(searchedP.toLowerCase())
                    )
                }).map((product)=>{
                    return(
                    <div className='product' key={product.id}>
                        <div className='image'>
                            <div className='price-rating'>
                                    <span> <img className='star' src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/star-48.png" alt="star" /> {product.rating.rate} <i>({product.rating.count})</i></span>
                                    <span><img className='inr' src="https://cdn3.iconfinder.com/data/icons/indian-rupee-symbol/128/Indian_Rupee_symbol.png" alt="ruppees" />{product.price}</span>    
                            </div>
                            <img src={product.image} alt="product"/>
                        </div>
                        <div>
                            <h6>{product.title}</h6>   
                            {/* <p>{product.description}</p> */}
                        </div>
                        <div className='cards_overlay'>
                            <div className='addToCart'>
                                <img src="https://cdn4.iconfinder.com/data/icons/e-commerce-and-shopping-3/500/add-buy-plus-shopping-cart-64.png" onClick={()=>handleAddToCart(product)} alt="addToCart" />
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        }
    </div>
  )
}

export default Home