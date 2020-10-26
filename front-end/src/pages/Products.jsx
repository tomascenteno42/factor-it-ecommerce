import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../redux/actions/index";

import Product from "../components/Product.jsx";
import { CustomPagination } from "../components/CustomPagination.jsx";

const Products = ({ getProducts, products, pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getProducts(currentPage);
  }, [getProducts, currentPage]);

  const _handlePagination = async (e) => {
    if (currentPage < pages) {
      if (e.target.name === "p" && currentPage !== 0) {
        setCurrentPage(currentPage - 1);
      } else if (e.target.name === "n") {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  if (!products) {
    return <div>LOADING...</div>;
  } else {
    return (
      <>
        <Row className="mx-4">
          <h1>Our products:</h1>
          <Col lg={12} className="mt-4">
            <Row>
              {products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </Row>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <CustomPagination
            currentPage={currentPage}
            pages={pages}
            handlePagination={_handlePagination}
          />
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  products: state.products.data,
  pages: state.products.pages,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: bindActionCreators(fetchProducts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
