import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { Card, Button, Row, Col } from "react-bootstrap";

import { useToasts } from "react-toast-notifications";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createOrder,
  deleteCart,
  deleteProductFromCart,
  fetchCartProducts,
  getCartById,
  updateProductFromCart,
} from "../redux/actions";

import { CheckoutModal } from "../components/CheckoutModal.jsx";

import { deleteCartId, getCartId } from "../utils/index";

const Cart = ({
  getCartById,
  fetchCartProducts,
  deleteCart,
  deleteProduct,
  updateProduct,
  products,
  cart,
  placeOrder,
  isVip,
}) => {
  const { addToast } = useToasts();

  const history = useHistory();
  const cart_id = getCartId();

  const [showModal, setShowModal] = useState(false);
  const _toggleModal = () => setShowModal(!showModal);

  const [totalMoney, setTotalMoney] = useState({
    discount: 0,
    totalWithDiscount: 0,
    totalWithoutDiscount: 0,
  });

  useEffect(() => {
    getCartById(cart_id);
    fetchCartProducts(cart_id);
  }, []);

  const _handleDeleteProduct = async (product_id) => {
    await deleteProduct(cart_id, product_id);
    addToast(`Product removed from cart`, {
      appearance: "warning",
      autoDismiss: true,
    });
  };

  const _handleQuantity = async (e, product_id) => {
    const product = products.filter((x) => x.product.id === product_id)[0];
    if (e.target.name === "minusButton" && product.quantity !== 1) {
      product.quantity -= 1;
      await updateProduct(cart_id, product_id, product.quantity);
    } else if (e.target.name === "plusButton") {
      product.quantity += 1;
      await updateProduct(cart_id, product_id, product.quantity);
    }
  };

  const _handleOrder = async () => {
    if (totalMoney.totalWithDiscount !== 0) {
      await placeOrder(cart_id, totalMoney.totalWithDiscount);
    } else {
      await placeOrder(cart_id, totalMoney.totalWithoutDiscount);
    }
    _toggleModal();

    addToast(`Order placed correctly!`, {
      appearance: "success",
      autoDismiss: true,
    });

    deleteCartId(cart_id);

    setTimeout(function () {
      history.push("/products");
    }, 1000);
  };

  const _handleCheckout = async () => {
    let totalMoney = 0;
    let discount = 0;
    let amountOfProducts = 0;

    products.forEach((data) => {
      if (data.quantity === 4) {
        discount += data.product.price;
      }
      amountOfProducts += data.quantity;
      totalMoney += data.product.price * data.quantity;
    });

    if (amountOfProducts >= 10) {
      if (cart.type === "COMMON") {
        discount += 100;
      } else {
        discount += 500;
      }
    }

    if (isVip && totalMoney >= 5000) {
      discount += 2000;
    }

    if (discount !== 0) {
      setTotalMoney({
        discount,
        totalWithoutDiscount: totalMoney,
        totalWithDiscount: totalMoney - discount,
      });
    } else {
      setTotalMoney({
        totalWithoutDiscount: totalMoney,
        totalWithDiscount: 0,
        discount,
      });
    }
  };

  const _handleCheckoutModal = () => {
    _handleCheckout();
    _toggleModal();
  };
  const _handleDeleteCart = async () => {
    await deleteCart(cart_id);

    addToast(`Cart deleted successfully`, {
      appearance: "success",
      autoDismiss: true,
    });

    history.push("/products");
  };

  if (products.length === 0 || !products.map) {
    return (
      <div style={{ height: "80vh" }}>
        <Row className="align-items-center justify-content-center h-100 w-100">
          <Card>
            <Card.Title className="m-1">
              You don't have products in your cart yet.
            </Card.Title>
            <Button
              variant="success"
              onClick={() => {
                history.push("/products");
              }}
            >
              Add products
            </Button>
          </Card>
        </Row>
      </div>
    );
  } else {
    return (
      <>
        <div className="d-flex">
          <Button
            variant="danger"
            className="ml-auto"
            onClick={_handleDeleteCart}
          >
            Delete cart
          </Button>
          <Button variant="success" onClick={_handleCheckoutModal}>
            Checkout
          </Button>
        </div>
        <Row
          className="mx-5"
          style={{ position: "relative", minHeight: "100px" }}
        >
          <Col lg={12} className="my-4 pr-0 ">
            <Row className="mr-0">
              {products.map((data) => (
                <Col lg={4} key={data.product.id}>
                  <Card className="mb-4" key={data.product.id}>
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <Card.Title className="m-0">
                          {data.product.name}{" "}
                        </Card.Title>
                        <span className="ml-auto font-weight-bold">
                          {data.product.price}$
                        </span>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <div className="d-flex flex-column mr-auto">
                          <Button
                            variant="danger"
                            name="deleteButton"
                            size="sm"
                            className="m-0 mt-1"
                            onClick={() =>
                              _handleDeleteProduct(data.product.id)
                            }
                          >
                            Remove
                          </Button>
                        </div>
                        <h4>{data.quantity}</h4>

                        <div className="d-flex flex-column">
                          <Button
                            name="plusButton"
                            className="ml-1 mr-1 mt-0 mb-0"
                            size="sm"
                            variant="dark"
                            onClick={(e) => _handleQuantity(e, data.product.id)}
                          >
                            +
                          </Button>
                          <Button
                            name="minusButton"
                            className="mt-1 mb-0 mr-1 ml-1"
                            size="sm"
                            variant="dark"
                            onClick={(e) => _handleQuantity(e, data.product.id)}
                          >
                            -
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <CheckoutModal
          products={products}
          totalMoney={totalMoney}
          show={showModal}
          destroy={_handleDeleteCart}
          toggle={_toggleModal}
          checkout={_handleOrder}
        />
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  products: state.cartProducts.data,
  cart: state.cart.data,
  isVip: state.users.data.vip,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCartProducts: bindActionCreators(fetchCartProducts, dispatch),
  deleteCart: bindActionCreators(deleteCart, dispatch),
  deleteProduct: bindActionCreators(deleteProductFromCart, dispatch),
  updateProduct: bindActionCreators(updateProductFromCart, dispatch),
  getCartById: bindActionCreators(getCartById, dispatch),
  placeOrder: bindActionCreators(createOrder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
