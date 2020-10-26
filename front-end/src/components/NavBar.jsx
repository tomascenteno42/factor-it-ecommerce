import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import { Navbar as Navegation, Nav, Button } from "react-bootstrap";

import { useToasts } from "react-toast-notifications";

import { bindActionCreators } from "redux";
import { createCart, deleteCart } from "../redux/actions";
import { connect } from "react-redux";

import { MDBIcon } from "mdbreact";

import {
  cartCreated,
  deleteCartId,
  deleteUserId,
  getCartId,
  getUserId,
  isLoggedIn,
  isPromotionalByDate,
} from "../utils";

const NavBar = ({ createCart, deleteCart }) => {
  const { addToast } = useToasts();

  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    isLoggedIn();
  });

  const _toggleModal = () => setShowModal(!showModal);

  const _handleSubmit = async () => {
    if (isPromotionalByDate()) {
      await createCart({ type: "SPECIAL_DATED", ownerId: getUserId() });
    } else {
      await createCart({ type: "COMMON", ownerId: getUserId() });
    }
    _toggleModal();
    addToast(`Cart created successfully`, {
      appearance: "success",
      autoDismiss: true,
    });
    history.go(0);
  };
  const _handleLogOut = () => {
    deleteUserId();
    if (cartCreated()) {
      deleteCart(getCartId());
      deleteCartId();
    }
    history.go(0);
  };

  return (
    <>
      <Navegation bg="dark" variant="dark">
        <Navegation.Brand href="/">Factor It</Navegation.Brand>
        <Nav className="w-100 align-items-center">
          {isLoggedIn() && (
            <>
              <Nav.Item>
                <Link
                  to="/products"
                  style={{ color: "white", marginLeft: "10px" }}
                >
                  Products
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  onClick={_handleLogOut}
                  to="/users"
                  style={{ color: "white", marginLeft: "10px" }}
                >
                  Log out
                </Link>
              </Nav.Item>

              {cartCreated() ? (
                <Nav.Item className="ml-auto">
                  <Link
                    style={{ color: "white", marginLeft: "10px" }}
                    to="/cart"
                  >
                    <MDBIcon icon="shopping-cart" size="lg" />
                  </Link>
                </Nav.Item>
              ) : (
                <Nav.Item className="ml-auto ">
                  <Button
                    variant="dark"
                    onClick={_handleSubmit}
                    className="m-0"
                  >
                    New Cart
                  </Button>
                </Nav.Item>
              )}
            </>
          )}
        </Nav>
      </Navegation>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createCart: bindActionCreators(createCart, dispatch),
  deleteCart: bindActionCreators(deleteCart, dispatch),
});

export default connect(null, mapDispatchToProps)(NavBar);
