import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useState } from 'react';

function Head({cart,search}) {
  const[searchedProduct,setSearchedProduct] = useState("")
  
  search(searchedProduct)

  const totalQuantity = cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  const handleSearch = (e) =>{
    setSearchedProduct(e.target.value)
    console.log(searchedProduct)
  }

  return (
    <div className='head'>
          <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img src="https://cdn4.iconfinder.com/data/icons/social-media-2069/130/_F-64.png" alt="logo" className='logo' />
          <i>FlipMart</i>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                    <Form inline>
                        <Row className='row'>
                          <Col xs="auto">
                            <Form.Control 
                              style={{width:"500px"}}
                              type="text"
                              placeholder="Search"
                              className="search"
                              value={searchedProduct}
                              onChange={(e)=>handleSearch(e)}
                              // onChange={handleSearch}
                            />
                          </Col>
                        </Row>
                    </Form>
                    <div className='nav'>
        
                      <Nav.Link> <img src="https://cdn2.iconfinder.com/data/icons/user-interface-169/32/about-64.png" alt="profile" className='profile-img' /> </Nav.Link>
                      <Link to="/cart">
                        <Nav><Badge><img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/shopping-cart-512.png" alt="cart" className='profile-img' />{totalQuantity}</Badge></Nav>
                      </Link>
                    </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Head
