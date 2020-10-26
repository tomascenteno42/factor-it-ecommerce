import React from "react";

import { useHistory } from "react-router-dom";

import { Col, Card, Button } from "react-bootstrap";

import { connect } from "react-redux";

import { setUserId } from "../utils";

export const User = ({ ownProps }) => {
  const history = useHistory();

  const _handleLogin = () => {
    setUserId(ownProps.user.id);
    history.go(0);
  };

  return (
    <Col lg={3} className="mb-4">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex">{ownProps.user.name}</Card.Title>
          <Button
            variant="dark"
            name="deleteButton"
            size="sm"
            className="m-0 mt-1"
            onClick={_handleLogin}
          >
            Login
          </Button>{" "}
        </Card.Body>
      </Card>
    </Col>
  );
};
const mapStateToProps = (ownProps) => ({
  ownProps,
});

export default connect(mapStateToProps)(User);
