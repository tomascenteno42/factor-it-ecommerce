import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers } from "../redux/actions";

import { CustomPagination } from "../components/CustomPagination.jsx";
import User from "../components/User.jsx";

const Users = ({ getUsers, users, pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getUsers(currentPage);
  }, [getUsers, currentPage]);

  const _handlePagination = async (e) => {
    if (currentPage < pages) {
      if (e.target.name === "p" && currentPage !== 0) {
        setCurrentPage(currentPage - 1);
      } else if (e.target.name === "n") {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  if (!users) {
    return <div>LOADING...</div>;
  } else {
    return (
      <>
        <Row className="mx-4">
          <Col lg={12} className="mt-4">
            <Row>
              {users.map((user) => (
                <User user={user} key={user.id} />
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
  users: state.users.data,
  pages: state.users.pages,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: bindActionCreators(fetchUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
