import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import "./styles.css";
export default function UserCard(props) {
  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.login}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Following: {props.following}</Modal.Body>
      <Modal.Body>Followers: {props.followers}</Modal.Body>
      <Modal.Body>Public Repos: {props.public_repos}</Modal.Body>
      <Modal.Body>Admin: {props.site_admin ? "Yes" : "No"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
