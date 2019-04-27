import React from "react";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import "./styles.css";
export default function UserCard(props) {
  return (
    <Card style={{ width: "300px" }}>
      <a
        className="card-block stretched-link text-decoration-none"
        href="#"
        onClick={props.onSelect.bind(null, props.data)}
      />
      <Card.Img variant="top" src={props.data.avatar_url} />
      <Card.Body>
        <Card.Title>{props.data.login}</Card.Title>
        <Card.Text>Score : {props.data.score}</Card.Text>
      </Card.Body>
    </Card>
  );
}
