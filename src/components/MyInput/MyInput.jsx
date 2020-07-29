import React from "react";
import { Form } from "react-bootstrap";

const Input = props => (
    <Form.Group controlId={props.controlId}>
      {props.label && <Form.Label>{props.label}</Form.Label>}
      {props.type && props.label && <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        size="m"
        id={props.id}
        onChange={props.changed}
        maxLength={props.maxLength ? props.maxLength : null}
      />}
      {props.error && <Form.Text className="text-muted">{props.error}</Form.Text>}
    </Form.Group>
);

export default Input;
