import React from "react";
import {Navbar, Form} from 'react-bootstrap';
import "./styles.css";
export default function SearchBar(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#">Git Hub User Directory</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <div  style={{width:'60%'}}>
            <Form.Control type="text" placeholder="User search " onKeyUp={props.onSearch} />
    </div>
</Navbar>
  );
}

