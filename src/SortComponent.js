import React from "react";
import { Form, Row } from 'react-bootstrap';
import "./styles.css";
export default function SortComponent(props) {
  return (
        <Row>Sort by score
            { 
                props.options.map((option, i) =>{
                    return <Form.Check name='sortByScore' type='radio' inline
                                onChange={props.onChange}
                                checked = {props.value === option.value}
                                key = {`sortByScore_${i}`}
                                value={option.value} label ={option.label} />
                })
            }
        </Row>
  );
}
