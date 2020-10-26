import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { useToasts } from "react-toast-notifications";

import { Col, Card, Button } from "react-bootstrap";

import { MDBIcon } from "mdbreact";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProductToCart, createCart } from "../redux/actions";

import {
  cartCreated,
  getCartId,
  getUserId,
  isPromotionalByDate,
} from "../utils";

const Product = ({ ownProps, addProductToCart, createCart }) => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);

  const { addToast } = useToasts();

  const _handleSubmit = async () => {
    if (cartCreated()) {
      await addProductToCart(getCartId(), ownProps.product.id, quantity);
      addToast(`${ownProps.product.name} added to cart`, {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      if (isPromotionalByDate()) {
        await createCart({ type: "SPECIAL_DATED", ownerId: getUserId() });
      } else {
        await createCart({ type: "COMMON", ownerId: getUserId() });
      }
      await addProductToCart(getCartId(), ownProps.product.id, quantity);
      alert("No cart was created. Creating a cart inmediately...");
      addToast(`${ownProps.product.name} added to cart`, {
        appearance: "success",
        autoDismiss: true,
      });
      setTimeout(function () {
        history.go(0);
      }, 1500);
    }
  };

  const _handleQuantity = (e) => {
    if (e.target.name === "minusButton" && quantity !== 1) {
      setQuantity(quantity - 1);
    } else if (e.target.name === "plusButton") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <Col lg={3} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex">
            {ownProps.product.name}
            <span className="text-right font-weight-bold ml-auto">
              {ownProps.product.price} $
            </span>
          </Card.Title>

          <div className="d-flex align-items-center">
            <Card.Text className="d-flex mt-4">
              <Card.Link className="ml-auto" onClick={_handleSubmit}>
                <MDBIcon icon="cart-plus" size="lg" />
              </Card.Link>
            </Card.Text>

            <h4 className="ml-auto">{quantity}</h4>

            <div className="d-flex flex-column">
              <Button
                name="plusButton"
                className="ml-1 mr-1 mt-0 mb-0"
                size="sm"
                variant="dark"
                onClick={(e) => _handleQuantity(e, ownProps.product.id)}
              >
                +
              </Button>
              <Button
                name="minusButton"
                className="mt-1 mb-0 mr-1 ml-1"
                size="sm"
                variant="dark"
                onClick={(e) => _handleQuantity(e, ownProps.product.id)}
              >
                -
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
  cart_id: state.cart.cart_id,
});

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: bindActionCreators(addProductToCart, dispatch),
  createCart: bindActionCreators(createCart, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);
