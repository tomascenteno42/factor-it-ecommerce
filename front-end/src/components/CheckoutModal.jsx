import React from "react";

import { Modal, Button } from "react-bootstrap";

export const CheckoutModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.products.map((data) => {
          return (
            <p key={data.product.id}>
              {data.product.name}:{" "}
              <b className="font-weight-bold">
                {data.product.price * data.quantity} $
              </b>{" "}
              | {data.quantity} unidades.
            </p>
          );
        })}
        {props.totalMoney.discount !== 0 ? (
          <p>
            Descuentos:{" "}
            <b className="font-weight-bold">{props.totalMoney.discount} $</b>
          </p>
        ) : null}
        {props.totalMoney.totalWithoutDiscount !== 0 ? (
          <p>
            Total:{" "}
            <b className="font-weight-bold">
              {props.totalMoney.totalWithoutDiscount} $
            </b>
          </p>
        ) : null}
        {props.totalMoney.totalWithDiscount !== 0 ? (
          <p>
            Total with discounts:{" "}
            <b className="font-weight-bold">
              {props.totalMoney.totalWithDiscount} $
            </b>
          </p>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.destroy}>
          Destroy order?
        </Button>
        <Button variant="success" onClick={props.checkout}>
          Proceed to ckeckout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
