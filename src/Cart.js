import React, { useContext, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StoreContext from "./storeContext";

const Cart = () => {
  const [show, setShow] = useState(false);
  const cartCtx = useContext(StoreContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeItem = (id) => {
    cartCtx.removeCartItem(id);
  };

  const overallTotal = cartCtx.cartItems.reduce((total, item) => {
    const totalAmount = item.price * item.quantity;
    return total + totalAmount;
  }, 0);

  return (
    <div className="container mb-5">
      <Button variant="primary" onClick={handleShow}>
        Cart {cartCtx.cartItems.length}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header onClick={handleClose}>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="fw-bolder">
            <Col>Title</Col>
            <Col>Price</Col>
            <Col>Quantity</Col>
            <Col>Action </Col>
          </Row>
          <hr />
          {cartCtx.cartItems.map((item) => (
            <div key={item._id}>
              <Row key={item._id}>
                <Col>{item.name}</Col>
                <Col>{item.price}</Col>
                <Col>{item.quantity}</Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => {
                      removeItem(item._id);
                    }}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
              <hr />
            </div>
          ))}
          <b>Total Amount: ₹ {overallTotal}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
