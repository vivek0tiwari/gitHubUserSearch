import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import UserCard from "./Card";
import CardColumns from "react-bootstrap/CardColumns";
export default function CardGrid(props) {
  function renderCards() {
    console.log(props);
    if (props.users && props.users.length) {
      return props.users.map((user, i) => {
        return (
          <UserCard
            data={{ ...user }}
            onSelect={props.onCardSelect.bind(null)}
            key={`card_${i}`}
          />
        );
      });
    } else {
      return (
        <div className="alert alert-secondary" role="alert">
          No result Found
        </div>
      );
    }
  }
  return <CardColumns>{renderCards()}</CardColumns>;
}
