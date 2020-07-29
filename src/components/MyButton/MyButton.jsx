import React from "react";
import { Button } from "react-bootstrap";

const MyButton = props => (
  <Button
    variant="danger"
    size="lg"
    block
    disabled={props.disabled}
    type="submit"
    id={props.id}
    className="button login-form-submit"
    onClick={props.clicked}
  >
    Valider
  </Button>
);

export default MyButton;