import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import UserCard from "./Card";
import { Row, Col } from "react-bootstrap";
export default function CardGrid(props) {
  function renderCards() {
    console.log(props);
    if (props.users && props.users.length) {
      return props.users.map((user, i) => {
        return (
          <Col ms={4} key={`col_${i}`}>
          <UserCard
            data={{ ...user }}
            onSelect={props.onCardSelect.bind(null)}
            key={`card_${i}`}
          /></Col>
        );
      });
    } else {
      return ;
    }
  }
  return <Row>{renderCards()}</Row>;
}
